package com.handong.swap.Controller;


import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.handong.swap.Service.ApplicantService;
import com.handong.swap.Service.ProgramService;
import com.mysql.cj.xdevapi.JsonArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramFileDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

@Controller
@RequestMapping("/program")

public class ProgramController {

	
	@Autowired
	ProgramService programService;
	@Autowired
	ApplicantService applicantService;
	String applyStartDate;
	String applyEndDate;
	String startDate;
	String endDate;
	String status;
	String apply_status;
	String programId;
	String program_status;
	String applicant_status;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogram(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String result = programService.read();
		
		LocalDateTime now = LocalDateTime.now();
		String currentDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss (EE)",Locale.KOREA));
		String currentApplyDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss (EE)",Locale.KOREA));
		
		JSONParser parser = new JSONParser();
		Object obj;
		try {
			obj = parser.parse(result);
			JSONArray jsonArr = (JSONArray) obj;

			if(jsonArr.size()>0) {
				for(int i=0; i<jsonArr.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArr.get(i);
					
					startDate = (String)jsonObj.get("start_date");
					endDate = (String)jsonObj.get("end_date");
					applyStartDate = (String)jsonObj.get("applystart_date");
					applyEndDate = (String)jsonObj.get("applyend_date");
					apply_status = jsonObj.get("apply_status").toString();
					status =  jsonObj.get("status").toString();
					programId = jsonObj.get("id").toString();
					
		
			            
			            if(currentDate.compareTo(startDate)<0) {//대기 
			            	if(status.equals("0") == false) {
			            		programService.updateStatus(Integer.parseInt(programId), 0);
			            	}
			            }
			            else if(currentDate.compareTo(startDate)>0 && currentDate.compareTo(endDate)<0) {//진행
							if(status.equals("1") == false) {
								programService.updateStatus(Integer.parseInt(programId), 1);
								applicantService.updateOngoingStatus(Integer.parseInt(programId), 3);
								// 상태변경
							}
			            }
			            else if(currentDate.compareTo(endDate)>0) {//종료
							if(status.equals("2") == false) {
								programService.updateStatus(Integer.parseInt(programId), 2);
							}		            	
			            }
			            
			            if(currentApplyDate.compareTo(applyStartDate) < 0) {//접수대기
			            	if(apply_status.equals("0") == false) {
			            		programService.updateApplyStatus(Integer.parseInt(programId), 0);
			            	}
			            }
			            else if(currentApplyDate.compareTo(applyStartDate)>0 && currentApplyDate.compareTo(applyEndDate)<0) {//접수진행
							if(apply_status.equals("1") == false) {
								programService.updateApplyStatus(Integer.parseInt(programId), 1);
							}
			            }
			            else if(currentApplyDate.compareTo(applyEndDate)>0) {//접수종료
							if(apply_status.equals("2") == false) {
								programService.updateApplyStatus(Integer.parseInt(programId), 2);
							}		            	
			            }
					
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		 result = programService.read();
   
	    return result;
	}
	
	
	@RequestMapping(value = "/read/category", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogramByCategory(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer category_id = Integer.parseInt(httpServletRequest.getParameter("category_id"));
		String result = programService.readByCategory(category_id);	
	    return result;
	}
	
	@RequestMapping(value = "/read/status", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogramByStatusByUser(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer user_id = Integer.parseInt(httpServletRequest.getParameter("user_id"));
		Integer status = Integer.parseInt(httpServletRequest.getParameter("status"));
		
		//프로그램이 진행이고 applicant 상태가 3이 아니면 바꿔라.
		
		
		String applicant_result = programService.readByStatusByUser(status, user_id);		
		
		LocalDateTime now = LocalDateTime.now();
		String currentDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss (EE)",Locale.KOREA));
		
		JSONParser parser = new JSONParser();
		Object obj;
		try {
			obj = parser.parse(applicant_result);
			JSONArray jsonArr = (JSONArray) obj;

			if(jsonArr.size()>0) {
				for(int i=0; i<jsonArr.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArr.get(i);
					
					startDate = (String)jsonObj.get("start_date");
					endDate = (String)jsonObj.get("end_date");
					program_status =  jsonObj.get("program_Status").toString();
					programId = jsonObj.get("program_id").toString();
					applicant_status = jsonObj.get("status").toString();
					 
			             if(currentDate.compareTo(startDate)>0 && currentDate.compareTo(endDate)<0) {//진행
							if(applicant_status.equals("3") == false) {
								applicantService.updateOngoingStatus(Integer.parseInt(programId), 3);
								// 상태변경
							}
			             }  
					
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		String result = programService.readByStatusByUser(status, user_id);		
	    return result;
	}
	
	@RequestMapping(value = "/information/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
		String result = programService.readProgramInformationByProgramId(id);
		return result;
	}
	
//	@RequestMapping(value = "/programFile/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
//	@ResponseBody
//	public String readProgramFileByProgramId(@PathVariable int id) throws IOException, ParseException {
//		String result = programService.readProgramFileByProgramId(id);
//		return result;
//	}
	
	@RequestMapping(value = "/name", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramName(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer id = Integer.parseInt(httpServletRequest.getParameter("id"));
		String result = programService.readProgramName(id);
		return result;
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int addProgram(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
				
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date start_date = (Date) formatter.parse(httpServletRequest.getParameter("start_date"));
		Date end_date = (Date) formatter.parse(httpServletRequest.getParameter("end_date"));
		Date Applystart_date = (Date) formatter.parse(httpServletRequest.getParameter("Applystart_date"));
		Date Applyend_date = (Date) formatter.parse(httpServletRequest.getParameter("Applyend_date"));
		
		program.setAdmin_id(Integer.parseInt(httpServletRequest.getParameter("admin_id")));
		program.setCategory_id(Integer.parseInt(httpServletRequest.getParameter("category_id")));
		program.setApplication_form(Integer.parseInt(httpServletRequest.getParameter("application_form")));
		program.setQuota(Integer.parseInt(httpServletRequest.getParameter("program_quota")));
		program.setProgram_name(httpServletRequest.getParameter("program_name"));
		program.setInformation(httpServletRequest.getParameter("information"));
		program.setStart_date(start_date);
		program.setEnd_date(end_date);
		program.setManager_name(httpServletRequest.getParameter("manager_name"));
		program.setManager_contact(httpServletRequest.getParameter("manager_contact"));
		program.setApplystart_date(Applystart_date);
		program.setApplyend_date(Applyend_date);
		
		int result = programService.add(program);
		return result;
		
	}
	
	@RequestMapping(value = "addPoster", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String addPoster(HttpServletRequest httpServletRequest, MultipartHttpServletRequest multi) {
		ProgramFileDTO programPoster = new ProgramFileDTO();
		MultipartFile file = multi.getFile("img");
		String posterName = file.getOriginalFilename();
		
		Calendar calendar = Calendar.getInstance();
		String path = "";
		String filePath = httpServletRequest.getSession().getServletContext().getRealPath("/") + "resources/upload/"+calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"; //파일 저장 경로, 설정파일로 따로 관리한다.
	    if(file != null) {
	    	File dir = new File(filePath); //파일 저장 경로 확인, 없으면 만든다.
		    if (!dir.exists()) {
		        dir.mkdirs();
		    }
		    try {
	    		int count = 1;
	    		File newFile = new File(filePath+posterName);
	    		path = calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"+posterName;
	    		while(newFile.exists()) {
	    			newFile = new File(filePath+posterName+"("+count+")");
	    			path = calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"+posterName+"("+count+")";
	    			count++;
	    		}
	    		if (!newFile.exists()) {
	    			newFile.mkdirs();
	    	    }
				file.transferTo(newFile);
			} catch (Exception e) {
				int count = 1;
	            e.printStackTrace();
			}
	    }
	    
	    
	    programPoster.setProgram_id(Integer.parseInt(httpServletRequest.getParameter("program_id")));
	    programPoster.setFile_name(path);
	    // 0: 파일, 1: 이미지
	    programPoster.setFile_type(1);
	    
	    int result = programService.insertPoster(programPoster);
	    
		return "uploadEnd";
	}
	

	@RequestMapping(value = "addFiles", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String addFiles(HttpServletRequest httpServletRequest, MultipartHttpServletRequest multi) {
		ProgramFileDTO programFiles = new ProgramFileDTO();
		MultipartFile files = multi.getFile("attach_file");
		String fileName = files.getOriginalFilename();
		
		Calendar calendar = Calendar.getInstance();
		String path = "";
		
		String filePath = httpServletRequest.getSession().getServletContext().getRealPath("/") + "resources/upload/"+calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"; //파일 저장 경로, 설정파일로 따로 관리한다.
	    if(files != null) {
	    	File dir = new File(filePath); //파일 저장 경로 확인, 없으면 만든다.
		    if (!dir.exists()) {
		        dir.mkdirs();
		    }
		    try {
	    		int count = 1;
	    		File newFile = new File(filePath+fileName);
	    		path = calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"+fileName;
	    		while(newFile.exists()) {
	    			newFile = new File(filePath+fileName+"("+count+")");
	    			path = calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"+fileName+"("+count+")";
	    			count++;
	    		}
	    		if (!newFile.exists()) {
	    			newFile.mkdirs();
	    	    }
	    		files.transferTo(newFile);
			} catch (Exception e) {
				int count = 1;
	            e.printStackTrace();
			}
	    }
	    
	    
	    programFiles.setProgram_id(Integer.parseInt(httpServletRequest.getParameter("program_id")));
	    programFiles.setFile_name(path);
	    // 0: 파일, 1: 이미지
	    programFiles.setFile_type(1);
	    
	    int result = programService.insertFile(programFiles);
	    
	    
		return "uploadEnd";
	}
	
	@RequestMapping(value = "deleteConfirm", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int deleteConfirmProgram(HttpServletRequest httpServletRequest)throws IOException, ParseException  {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		int result = 1;
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			result = programService.deleteConfirm(Integer.parseInt(ids[i]));
			if(result == 0) return result;
		}
		if(result==1) return result;
		else return result;
	}
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteProgram(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			programService.delete(Integer.parseInt(ids[i]));
		}
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void editProgram(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date start_date = (Date) formatter.parse(httpServletRequest.getParameter("start_date"));
		Date end_date = (Date) formatter.parse(httpServletRequest.getParameter("end_date"));
		Date Applystart_date = (Date) formatter.parse(httpServletRequest.getParameter("Applystart_date"));
		Date Applyend_date = (Date) formatter.parse(httpServletRequest.getParameter("Applyend_date"));
		
		program.setId(Integer.parseInt(httpServletRequest.getParameter("id")));
		program.setProgram_name(httpServletRequest.getParameter("program_name"));
		program.setInformation(httpServletRequest.getParameter("information"));
		program.setStart_date(start_date);
		program.setEnd_date(end_date);
		program.setApplystart_date(Applystart_date);
		program.setApplyend_date(Applyend_date);
		program.setManager_name(httpServletRequest.getParameter("manager_name"));
		program.setManager_contact(httpServletRequest.getParameter("manager_contact"));
		program.setQuota(Integer.parseInt(httpServletRequest.getParameter("quota")));
		
//		String category = httpServletRequest.getParameter("category_name");
//		int category_id;
//		
//		if(category=="대회") category_id = 1;
//		else if(category=="봉사") category_id=2;
//		else if(category=="캠프") category_id=3;
//		else if(category=="동아리") category_id=4;
//		else if(category=="행사") category_id=5;
//		else category_id=6;
//		
		program.setCategory_id(Integer.parseInt(httpServletRequest.getParameter("category_id")));
	

		programService.edit(program);
		
	}
	
	@RequestMapping(value = "/read/bookmark", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readLikedPrograms(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer user_id = Integer.parseInt(httpServletRequest.getParameter("user_id"));
		String result = programService.readLikedPrograms(user_id);	
		System.out.println(result);
	    return result;
	}
}
