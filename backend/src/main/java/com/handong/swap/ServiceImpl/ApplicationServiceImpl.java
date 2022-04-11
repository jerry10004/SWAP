package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DAO.ApplicationDAO;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.DTO.ApplicationDeleteConfirmDTO;
import com.handong.swap.DTO.ApplicationNameDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;
import com.handong.swap.Service.AdminService;
import com.handong.swap.Service.ApplicationService;


@Service
public class ApplicationServiceImpl implements ApplicationService{
	
	@Autowired
	ApplicationDAO applicationDAO;
	
	@Override
	public String read() throws JsonProcessingException {
		List<ApplicationDTO> applicationDATA = applicationDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(applicationDATA);
		return jsonString;
	}

	
	@Override
	public String readJson(int id) throws JsonProcessingException{
		List<ApplicationDTO> applicationDATA = applicationDAO.readJson(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(applicationDATA);
		return jsonString;
	}


	@Override
	public int add(ApplicationDTO application) {
		return applicationDAO.add(application);
	}


	@Override
	public String readName() throws JsonProcessingException {
		List<ApplicationNameDTO> applicationDATA = applicationDAO.readName();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(applicationDATA);
		return jsonString;
	}
	
	@Override
	public void delete(int id) {
		applicationDAO.delete(id);
	}


	@Override
	public int deleteConfirm(int id) throws JsonProcessingException {
		int applicationDATA = applicationDAO.deleteConfirm(id);
		return applicationDATA;
	}


	@Override
	public String readApplicationById(int id) throws JsonProcessingException {
		List<ApplicationDTO> programDATA = applicationDAO.readApplicationById(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(programDATA);
		return jsonString;
	}

	
}
