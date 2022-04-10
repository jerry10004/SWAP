package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.ApplicationDTO;

public interface ApplicationService {
	public String readJson(int id) throws JsonProcessingException;
	
	public int add(ApplicationDTO application);
	
	public String readName() throws JsonProcessingException;
	
	public String readApplicationFormByProgramId(int id) throws JsonProcessingException;

}
