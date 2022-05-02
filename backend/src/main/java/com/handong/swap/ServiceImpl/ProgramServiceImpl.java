package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramFileDTO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;
import com.handong.swap.Service.ProgramService;

@Service
public class ProgramServiceImpl implements ProgramService{
	
	@Autowired
	ProgramDAO programDAO;
	
	@Override

	public String read() throws JsonProcessingException{
		List<ProgramReadDTO> programDATA = programDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	public int add(ProgramDTO program) {
		return programDAO.add(program);

	}
	
	public int insertPoster(ProgramFileDTO program) {
		return programDAO.insertPoster(program);
	}

	@Override
	public String readProgramInformationByProgramId(int id) throws JsonProcessingException{
		List<ProgramReadDTO> programDATA = programDAO.readProgramInformationByProgramId(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
	@Override
	public String readProgramName(int id) throws JsonProcessingException{
		List<ProgramReadNameDTO> programDATA = programDAO.readProgramName(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
	
	@Override
	public void delete(int id) {
		programDAO.updateDelDate(id);
	}
	
	@Override
	public int deleteConfirm(int id) throws JsonProcessingException {
		int programDATA = programDAO.deleteConfirm(id);
		return programDATA;
	}
	
	@Override
	public void updateStatus(int program_id, int status) {
		programDAO.updateStatus(program_id, status);
	}
	
	@Override
	public void updateApplyStatus(int program_id, int apply_status) {
		programDAO.updateApplyStatus(program_id, apply_status);
	}



	@Override
	public void edit(ProgramDTO program) {
		programDAO.edit(program);
	}

	@Override
	public String readByCategory(int category_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readByCategory(category_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	
	@Override
	public void updateApplicantNum(int program_id) {
		programDAO.updateApplicantNum(program_id);
	}

	@Override
	public String readByStatusByUser(int status, int user_id) throws JsonProcessingException {
		List<ProgramReadDTO> programDATA = programDAO.readByStatusByUser(status, user_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	

}
