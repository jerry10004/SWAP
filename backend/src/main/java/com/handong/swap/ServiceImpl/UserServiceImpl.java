package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.UserDTO;
import com.handong.swap.Service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserDAO userDAO;
	
	@Override
	public String read() throws JsonProcessingException{
		List<UserDTO> userDATA = userDAO.read();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(userDATA);
		return jsonString;
	}

	@Override
	public void delete(int id) {
		userDAO.updateDelDate(id);
	}
}
	
