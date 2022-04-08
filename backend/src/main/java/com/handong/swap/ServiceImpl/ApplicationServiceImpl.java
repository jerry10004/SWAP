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
import com.handong.swap.Service.AdminService;
import com.handong.swap.Service.ApplicationService;


@Service
public class ApplicationServiceImpl implements ApplicationService{
	
	@Autowired
	ApplicationDAO applicationDAO;

	
	@Override
	public String readJson(int id) throws JsonProcessingException{
		List<ApplicationDTO> applicationDATA = applicationDAO.readJson(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(applicationDATA);
		return jsonString;
	}

	
}
