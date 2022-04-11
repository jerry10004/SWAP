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

import com.handong.swap.Service.ApplicationService;
import com.handong.swap.Service.ProgramService;
import com.mysql.cj.xdevapi.JsonArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;
//import org.json.simple.JSONObject;
//import org.json.simple.parser.JSONParser;
//import org.json.simple.parser.ParseException;

@Controller
@RequestMapping("/application")

public class ApplicationController {

	
	@Autowired
	ApplicationService applicationService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readAdministrator(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("신청서 읽기 시도");
		String result = applicationService.read();
		System.out.println(result);
	    return result;
	}

	
	@RequestMapping(value = "/json", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readJson(HttpServletRequest httpServletRequest) throws IOException, ParseException, org.json.simple.parser.ParseException {
		Integer id = Integer.parseInt(httpServletRequest.getParameter("category_id"));
		System.out.println("Json 읽기 시도, category_id is "+id);
		String result = applicationService.readJson(id);
	    return result;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addApplication(HttpServletRequest httpServletRequest) throws ParseException {
		ApplicationDTO application = new ApplicationDTO();
		
		application.setName(httpServletRequest.getParameter("name"));
		application.setContent(httpServletRequest.getParameter("content"));		
		
		int result = applicationService.add(application);
		
		if(result ==0 ) {
			System.out.println("신청서 추가 실패");
		}
		else {
			System.out.println("신청서 추가 성공");
		}
		
	}
	
	@RequestMapping(value = "/name", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readApplicationName(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("신청서 이름 읽기");
		String result = applicationService.readName();
		System.out.println(result);
	    return result;
	}
	
	@RequestMapping(value = "/readApplicationById", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readApplicationById(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("신청서 아이디 별 읽기");
		Integer id = Integer.parseInt(httpServletRequest.getParameter("id"));
		String result = applicationService.readApplicationById(id);
		System.out.println("result is "+result);
		return result;
	}
	
	
	@RequestMapping(value = "deleteConfirm", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int deleteConfirmApplication(HttpServletRequest httpServletRequest)throws IOException, ParseException  {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		int result = 1;
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			System.out.println("신청서 삭제 시도");
			System.out.println("삭제 하려는 아이디 번호: "+ids[i]);
			result = applicationService.deleteConfirm(Integer.parseInt(ids[i]));
			if(result == 0) return result;
		}
		if(result==1) return result;
		else return result;
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteApplication(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			System.out.println("신청서 삭제 시도");
			System.out.println("삭제 하려는 아이디 번호: "+ids[i]);
			applicationService.delete(Integer.parseInt(ids[i]));
		}
	}
	

}
