package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.AdminDTO;

public interface ApplicationService {
	public String readJson(int id) throws JsonProcessingException;
}
