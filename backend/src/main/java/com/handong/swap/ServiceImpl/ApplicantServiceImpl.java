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
	
	

	
}