package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.AdminDTO;

public interface AdminService {
	
	public void add(int user_id);
	public String read() throws JsonProcessingException;
	public String readWaitAdmin() throws JsonProcessingException;
	public void delete(int id);
	public void update(AdminDTO admin);
}
