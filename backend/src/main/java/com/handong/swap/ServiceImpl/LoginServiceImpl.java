package com.handong.swap.ServiceImpl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DAO.LoginDAO;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.LoginDTO;
import com.handong.swap.DTO.UserDTO;
import com.handong.swap.Service.LoginService;


@Service
public class LoginServiceImpl implements LoginService{
	@Autowired
	LoginDAO loginDAO;
	
	@Autowired
	AdminDAO adminDAO;
	
	@Autowired
	UserDAO userDAO;
	
	@Override
	public String setUserTokenJsonData(String name, String email, String token, Date expire_token) throws JsonProcessingException {
		LoginDTO user = loginDAO.getUserByEmail(email);
		
		
		if(user == null) {
			user = new LoginDTO(0,name, email, 0, token, expire_token);
			loginDAO.insertUser(user);
			user.setId(loginDAO.getUserByEmail(email).getId());
		}
	    
		user.setExpire_token(expire_token);
	    user.setToken(token);
	    
	    loginDAO.updateUserByToken(user);
	    user = loginDAO.getUserByEmail(email);
	    
	    if(user.getStatus() == 1) {
	    	AdminDTO admin = adminDAO.readAdminByUserId(user.getId());
	    }else if(user.getStatus() == -1) {
	    	return "fail";
	    }
	    
	    ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(user);
		
		
		return jsonString;
	}
}
	
