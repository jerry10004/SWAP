package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.Service.AdminService;


@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	AdminDAO adminDAO;
	@Autowired
	UserDAO userDAO;
	
	@Override
	public void add(int user_id) {
		adminDAO.add(user_id);
		userDAO.updateAdmin(user_id);
	}
	
	@Override
	public String read() throws JsonProcessingException{
		List<AdminDTO> adminDATA = adminDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(adminDATA);
		return jsonString;
	}

	@Override
	public void delete(int id) {
		adminDAO.delete(id);
		userDAO.updateUser(id);
	}
	
}
