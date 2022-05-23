package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.ApplicantDAO;
import com.handong.swap.DTO.ApplicantDTO;
import com.handong.swap.DTO.ApplicantReadDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.Service.ApplicantService;

@Service
public class ApplicantServiceImpl implements ApplicantService{
	
	@Autowired
	ApplicantDAO applicantDAO;
	
	@Override
	public String readApplicantInformationByProgramId(int id) throws JsonProcessingException{
		List<ApplicantReadDTO> applicantDATA = applicantDAO.readApplicantInformationByProgramId(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(applicantDATA);
		return jsonString;
	}
	
	@Override
	public String updateApplicantStatus(int id, int status) {
		String result = applicantDAO.updateApplicantStatus(id, status);
		return result;
	}
	
	public int applyApplication(ApplicantDTO applicant) {
		return applicantDAO.applyApplication(applicant);

	}
	
	@Override
	public String readApplicantByUserId(int programID, int userID) throws JsonProcessingException{
		List<ApplicantReadDTO> applicantDATA = applicantDAO.readApplicantByUserId(programID, userID);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(applicantDATA);
		return jsonString;
	}

	@Override
	public void updateOngoingStatus(int program_id, int status) {
		applicantDAO.updateOngoingStatus(program_id, status);
	}

	@Override
	public void deleteApplicant(int id) {
		applicantDAO.deleteApplicant(id);
	}

	@Override
	public int applySurvey(ApplicantDTO applicant) {
		return applicantDAO.applySurvey(applicant);
	}

	@Override
	public int confirmSurvey(ApplicantDTO applicant) {
		return applicantDAO.confirmSurvey(applicant);
	}
	

	
}