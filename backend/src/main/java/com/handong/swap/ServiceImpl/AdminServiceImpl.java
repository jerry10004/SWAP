package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.Service.AdminService;


@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	AdminDAO adminDAO;
	
	@Override
	public int add(AdminDTO admin) {
		return adminDAO.add(admin);
	}
	
	@Override
	public String read() throws JsonProcessingException{
		List<AdminDTO> adminDATA = adminDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(adminDATA);
		return jsonString;
	}
	
//	@Override
//	public void delete(int id, String email) {
//		userDAO.updateDelDate(email);
//		adminDAO.delete(id);
//	}
}
