package com.handong.swap.Service;

import java.sql.Date;


import com.fasterxml.jackson.core.JsonProcessingException;


public interface LoginService {
	
	public String setUserTokenJsonData(String name, String email, String token, Date expire_token) throws JsonProcessingException;

}
