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

import com.handong.swap.Service.SurveyService;
import com.handong.swap.Service.ProgramService;
import com.mysql.cj.xdevapi.JsonArray;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DTO.SurveyDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

@Controller
@RequestMapping("survey")

public class SurveyController {

	
	@Autowired
	SurveyService surveyService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readAdministrator(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String result = surveyService.read();
	    return result;
	}

	
	@RequestMapping(value = "/json", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readJson(HttpServletRequest httpServletRequest) throws IOException, ParseException, org.json.simple.parser.ParseException {
		Integer id = Integer.parseInt(httpServletRequest.getParameter("category_id"));
		String result = surveyService.readJson(id);
	    return result;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int addSurvey(HttpServletRequest httpServletRequest) throws ParseException {
		SurveyDTO survey = new SurveyDTO();
		
		survey.setName(httpServletRequest.getParameter("name"));
		survey.setContent(httpServletRequest.getParameter("content"));		
		survey.setCategory_id(Integer.parseInt(httpServletRequest.getParameter("category_id")));		
		survey.setAdmin_id(Integer.parseInt(httpServletRequest.getParameter("admin_id")));		

		int result = surveyService.add(survey);
		
		return result;
		
	}
	
	@RequestMapping(value = "/name", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readSurveyName(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String result = surveyService.readName();
	    return result;
	}
	
	@RequestMapping(value = "/readSurveyById", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readSurveyById(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer id = Integer.parseInt(httpServletRequest.getParameter("id"));
		String result = surveyService.readSurveyById(id);
		return result;
	}
	
	@RequestMapping(value = "/readProgramName", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramName(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer id = Integer.parseInt(httpServletRequest.getParameter("id"));
		String result = surveyService.readProgramName(id);
		return result;
	}
		
		
	@RequestMapping(value = "/readSurveyForm/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readSurveyFormByProgramId(@PathVariable int id) throws IOException, ParseException, org.json.simple.parser.ParseException {
		String result = surveyService.readSurveyFormByProgramId(id);
		return result;
	}
	
	
	@RequestMapping(value = "deleteConfirm", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int deleteConfirmSurvey(HttpServletRequest httpServletRequest)throws IOException, ParseException  {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		int result = 1;
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
			result = surveyService.deleteConfirm(Integer.parseInt(ids[i]));
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
			surveyService.delete(Integer.parseInt(ids[i]));
		}
	}

}
