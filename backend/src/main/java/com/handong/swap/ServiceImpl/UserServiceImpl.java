package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadDTO;
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

	@Override
	public String readStudents() throws JsonProcessingException {
		List<UserDTO> userDATA = userDAO.readStudents();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(userDATA);
		return jsonString;
	}

	@Override
	public String readDeletedUsers() throws JsonProcessingException {
		List<UserDTO> userDATA = userDAO.readDeletedUsers();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(userDATA);
		return jsonString;
	}

	@Override
	public void restore(int id) {
		userDAO.restore(id);
	}
	
	@Override
	public String readLoggedInUserById(int id) throws JsonProcessingException{
		List<UserDTO> userDATA = userDAO.readLoggedInUserById(id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(userDATA);
		return jsonString;
	}
	
	@Override
	public void updateUserInfo(UserDTO user) {
		userDAO.updateUserInfo(user);
	}
}
	
