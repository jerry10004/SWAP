package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.Service.ProgramService;


@Service
public class ProgramServiceImpl implements ProgramService{
	
	@Autowired
	ProgramDAO programDAO;
	
	@Override
	public String read() throws JsonProcessingException{
		List<ProgramDTO> programDATA = programDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}
}
