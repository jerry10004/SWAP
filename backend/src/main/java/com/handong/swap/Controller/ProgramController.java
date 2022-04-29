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

import com.handong.swap.Service.ProgramService;
import com.mysql.cj.xdevapi.JsonArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramPosterDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

@Controller
@RequestMapping("/program")

public class ProgramController {

	
	@Autowired
	ProgramService programService;
	String applyStartDate;
	String applyEndDate;
	String startDate;
	String endDate;
	String status;
	String apply_status;
	String programId;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogram(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("읽기 시도");
		String result = programService.read();
		
		System.out.println("~~~~");
		System.out.println(result);
		
		LocalDateTime now = LocalDateTime.now();
		String currentDate = now.format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm (EE)",Locale.KOREA));
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
					
					System.out.println("now: "+currentApplyDate);
					System.out.println("apply 시작: "+applyStartDate);
					System.out.println("apply  종료: "+applyEndDate);
					
		
			            
			            if(currentDate.compareTo(startDate)<0) {//대기 
			            	if(status.equals("0") == false) {
			            		programService.updateStatus(Integer.parseInt(programId), 0);
			            	}
			            }
			            else if(currentDate.compareTo(startDate)>0 && currentDate.compareTo(endDate)<0) {//진행
							if(status.equals("1") == false) {
								programService.updateStatus(Integer.parseInt(programId), 1);
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
		System.out.println("카테고리 별 프로그램 읽기 시도");
		Integer category_id = Integer.parseInt(httpServletRequest.getParameter("category_id"));
		System.out.println("===========");
		System.out.println(category_id);
		String result = programService.readByCategory(category_id);		
		System.out.println(" result is "+result);
	    return result;
	}
	
	@RequestMapping(value = "/read/status", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogramByStatusByUser(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("사용자가 참여한 상태 별 프로그램 읽기 시도");
		Integer user_id = Integer.parseInt(httpServletRequest.getParameter("user_id"));
		Integer status = Integer.parseInt(httpServletRequest.getParameter("status"));
		System.out.println("===========");
		System.out.println(user_id);
		String result = programService.readByStatusByUser(status, user_id);		
		System.out.println(" result is "+result);
	    return result;
	}
	
	@RequestMapping(value = "/information/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
		System.out.println("프로그램 별 프로그램 정보 읽기");
		System.out.println(id);

		String result = programService.readProgramInformationByProgramId(id);
		System.out.println("result is "+result);
		return result;
	}
	
	@RequestMapping(value = "/name", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramName(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("프로그램 이름 읽기");
		Integer id = Integer.parseInt(httpServletRequest.getParameter("id"));
		String result = programService.readProgramName(id);
		System.out.println("result is "+result);
		return result;
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int addProgram(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
		
		System.out.println("프로그램 추가하기 -----"+httpServletRequest.getParameter("application_form"));
		
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
		
//		if(result ==0 ) {
//			System.out.println("프로그램 추가 실패");
//		}
//		else {
//			System.out.println("프로그램 추가 성공");
//		}
		
		return result;
		
	}
	
	
	@RequestMapping(value = "addPoster", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String addPoster(HttpServletRequest httpServletRequest, MultipartHttpServletRequest multi) {
		ProgramPosterDTO programPoster = new ProgramPosterDTO();
		MultipartFile file = multi.getFile("img");
		String posterName = file.getOriginalFilename();
		System.out.println(posterName);
		
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
//	    		path = calendar.get(calendar.YEAR)+"/"+(calendar.get(calendar.MONTH)+1)+"/"+calendar.getTimeInMillis();
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
	    
		return "uploadEnd";
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteProgram(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			System.out.println("삭제 시도");
			System.out.println("삭제 하려는 아이디 번호: "+ids[i]);
			programService.delete(Integer.parseInt(ids[i]));
		}
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void editProgram(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
		System.out.println("edit!!!!!!!!");
		
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
}
