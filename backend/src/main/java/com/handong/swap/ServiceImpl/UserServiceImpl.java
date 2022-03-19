package com.handong.swap.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.UserDTO;
import com.handong.swap.Service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserDAO userDAO;
	
	@Override
	public int insertUser(String user_name, String email, int student_id, String phone, ) {
		return userDAO.insertUser(dto);
	}
}
