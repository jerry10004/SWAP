package com.handong.swap.Service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ApplicantService {
	
	public String readApplicantInformationByProgramId(int id) throws JsonProcessingException;


}
