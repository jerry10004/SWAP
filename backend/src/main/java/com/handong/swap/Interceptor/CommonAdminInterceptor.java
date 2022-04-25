package com.handong.swap.Interceptor;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.LoginDAO;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.LoginDTO;
import com.handong.swap.DTO.UserDTO;


public class CommonAdminInterceptor  extends HandlerInterceptorAdapter{
	
	@Autowired
	LoginDAO loginDAO;
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		if(request.getMethod() == "POST") {
			
			String token = request.getParameter("token");
			System.out.println(token);
			int id= 0;
			
			try{
				id = Integer.parseInt(request.getParameter("manageID"));
			}catch (Exception e){
			    return false;
			}
			
			RestTemplate restTemplate = new RestTemplate();
			String requestUrl;
			try{
				requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo")
						.queryParam("id_token", token).build().toUriString();
			}catch (Exception e){
			    return false;
			}
			
			String resultJson = restTemplate.getForObject(requestUrl, String.class);
			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,String> userInfo = mapper.readValue(resultJson, new TypeReference<Map<String, String>>(){});
			LoginDTO user = loginDAO.getUserByEmail(userInfo.get("email"));
			if(id != user.getId() || user.getStatus() != 2) {
				return false;
			}
		}
		
		return super.preHandle(request, response, handler);
	}
}
