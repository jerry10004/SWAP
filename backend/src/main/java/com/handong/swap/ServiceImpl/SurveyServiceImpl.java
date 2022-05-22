package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DAO.SurveyDAO;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.SurveyDTO;
import com.handong.swap.DTO.SurveyDeleteConfirmDTO;
import com.handong.swap.DTO.SurveyNameDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;
import com.handong.swap.Service.AdminService;
import com.handong.swap.Service.SurveyService;


@Service
public class SurveyServiceImpl implements SurveyService{
	
	@Autowired
	SurveyDAO surveyDAO;
	
	@Override
	public String read() throws JsonProcessingException {
		List<SurveyDTO> surveyDATA = surveyDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(surveyDATA);
		return jsonString;
	}

	
	@Override
	public String readJson(int id) throws JsonProcessingException{
		List<SurveyDTO> surveyDATA = surveyDAO.readJson(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(surveyDATA);
		return jsonString;
	}


	@Override
	public int add(SurveyDTO survey) {
		return surveyDAO.add(survey);
	}


	@Override
	public String readName() throws JsonProcessingException {
		List<SurveyNameDTO> surveyDATA = surveyDAO.readName();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(surveyDATA);
		return jsonString;
	}
	
	@Override
	public void delete(int id) {
		surveyDAO.delete(id);
	}


	@Override
	public int deleteConfirm(int id) throws JsonProcessingException {
		int surveyDATA = surveyDAO.deleteConfirm(id);
		return surveyDATA;
	}


	@Override
	public String readSurveyById(int id) throws JsonProcessingException {
		List<SurveyDTO> programDATA = surveyDAO.readSurveyById(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
	
	@Override
	public String readSurveyFormByProgramId(int id) throws JsonProcessingException{
		List<ProgramDTO> surveyDATA = surveyDAO.readSurveyFormByProgramId(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(surveyDATA);
		return jsonString;
	}


		@Override
		public String readProgramName(int id) throws JsonProcessingException {
			List<String> surveyDATA = surveyDAO.readProgramName(id);
			ObjectMapper mapper = new ObjectMapper();
			String jsonString = mapper.writeValueAsString(surveyDATA);
			return jsonString;
		}

	
}
