package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.AdminDTO;

public interface AdminService {
	
	public int add(AdminDTO admin);
	
	public String read() throws JsonProcessingException;
}
