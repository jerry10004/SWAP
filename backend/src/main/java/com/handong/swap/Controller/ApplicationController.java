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

	
	@RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readJson(HttpServletRequest httpServletRequest) throws IOException, ParseException, org.json.simple.parser.ParseException {
		Integer id = Integer.parseInt(httpServletRequest.getParameter("category_id"));
		System.out.println("Json 읽기 시도, category_id is "+id);
		String result = applicationService.readJson(id);
//		String result_parse = result.substring(1, result.length()-1);
//		System.out.println(result_parse);
		
//		
//		JSONParser parser = new JSONParser();
//		JSONObject jsonObject = (JSONObject) parser.parse(result_parse);
//		
//		System.out.println("=======json====");
//		System.out.println(jsonObject);
//		System.out.println(jsonObject.get("id"));

		

	    return result;
	}

}
