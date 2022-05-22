package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.SurveyDTO;

public interface SurveyService {
	public String read() throws JsonProcessingException;
	
	public String readJson(int id) throws JsonProcessingException;
	
	public int add(SurveyDTO survey);
	
	public String readName() throws JsonProcessingException;
	
	public String readSurveyById(int id) throws JsonProcessingException;
	
	public void delete(int id);
	
	public int deleteConfirm(int id) throws JsonProcessingException;
	
	public String readSurveyFormByProgramId(int id) throws JsonProcessingException;
	
	public String readProgramName(int id) throws JsonProcessingException;

}
