package com.handong.swap.Controller;

import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.Service.LoginService;



@Controller
@RequestMapping("/login")
public class LoginController {
	@Autowired
	LoginService loginService;
	
	@RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String login(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		DateFormat df = new SimpleDateFormat("dd-MM-yy HH:mm:ss");
		
		String token = httpServletRequest.getParameter("token");
		String email = httpServletRequest.getParameter("email");
		String name = httpServletRequest.getParameter("name");
		Date expire_token = new Date(Long.parseLong((httpServletRequest.getParameter("expire"))));
		
		RestTemplate restTemplate = new RestTemplate();
		String requestUrl;
		System.out.println("token: "+token);
		System.out.println("email: "+email);
		System.out.println("name: "+name);
		
		try{
			requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo")
					.queryParam("id_token", token).build().toUriString();
			System.out.println("requestUrl: "+ requestUrl);
		}catch (Exception e){
		    return "fail";
		}
		
		String resultJson = restTemplate.getForObject(requestUrl, String.class);
		
		ObjectMapper mapper = new ObjectMapper();
		Map<String,String> userInfo = mapper.readValue(resultJson, new TypeReference<Map<String, String>>(){});
		
		if(email.equals(userInfo.get("email"))) {
			return loginService.setUserTokenJsonData(name, email, token, expire_token);
		}else {
			return "fail";
		}
		
	}
		
}

