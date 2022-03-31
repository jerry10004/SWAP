package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadDTO;
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

	@Override
	public String readProgramInformationByProgramId(int id) throws JsonProcessingException{
		List<ProgramReadDTO> programDATA = programDAO.readProgramInformationByProgramId(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
	
	@Override
	public void delete(int id) {
		programDAO.updateDelDate(id);
	}

}
