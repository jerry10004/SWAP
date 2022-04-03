package com.handong.swap.Controller;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.ProgramService;
import com.mysql.cj.xdevapi.JsonArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DTO.ProgramDTO;

@Controller
@RequestMapping("/program")

public class ProgramController {

	
	@Autowired
	ProgramService programService;
	String startDate;
	String endDate;
	String status;
	String programId;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogram(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("읽기 시도");
		String result = programService.read();
		
		LocalDateTime now = LocalDateTime.now();
		String currentDate = now.format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm (EE)",Locale.KOREA));
		
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
							}
			            }
			            else if(currentDate.compareTo(endDate)>0) {//종료
							if(status.equals("2") == false) {
								programService.updateStatus(Integer.parseInt(programId), 2);
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
	
	@RequestMapping(value = "/information/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
		System.out.println("프로그램 별 프로그램 정보 읽기");
		System.out.println(id);

		String result = programService.readProgramInformationByProgramId(id);
		System.out.println("result is "+result);
		return result;
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date start_date = (Date) formatter.parse(httpServletRequest.getParameter("start_date"));
		Date end_date = (Date) formatter.parse(httpServletRequest.getParameter("end_date"));
		
		program.setAdmin_id(Integer.parseInt(httpServletRequest.getParameter("admin_id")));
		program.setCategory_id(Integer.parseInt(httpServletRequest.getParameter("category_id")));
		program.setApplication_form(Integer.parseInt(httpServletRequest.getParameter("application_form")));
		program.setQuota(Integer.parseInt(httpServletRequest.getParameter("program_quota")));
		program.setProgram_name(httpServletRequest.getParameter("program_name"));
		program.setInformation(httpServletRequest.getParameter("information"));
		program.setStart_date(start_date);
		program.setEnd_date(end_date);
		
		
		int result = programService.add(program);
		
		if(result ==0 ) {
			System.out.println("프로그램 추가 실패");
		}
		else {
			System.out.println("프로그램 추가 성공");
		}
		
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteUser(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			System.out.println("삭제 시도");
			System.out.println("삭제 하려는 아이디 번호: "+ids[i]);
			programService.delete(Integer.parseInt(ids[i]));
		}
	}
}
