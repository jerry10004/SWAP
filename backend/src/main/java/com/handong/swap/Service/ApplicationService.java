package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.ApplicationDTO;

public interface ApplicationService {
	public String read() throws JsonProcessingException;
	
	public String readJson(int id) throws JsonProcessingException;
	
	public int add(ApplicationDTO application);
	
	public String readName() throws JsonProcessingException;
	
	public String readApplicationById(int id) throws JsonProcessingException;
	
	public void delete(int id);
	
	public int deleteConfirm(int id) throws JsonProcessingException;
	

}
