package com.handong.swap.Service;

import java.sql.Date;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.LoginDTO;


public interface LoginService {
	
	public String setUserTokenJsonData(String name, String email, String token, Date expire_token) throws JsonProcessingException;
	public int insertUser(LoginDTO user);

}
