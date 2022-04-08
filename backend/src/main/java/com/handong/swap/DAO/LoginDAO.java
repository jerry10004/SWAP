package com.handong.swap.DAO;

import java.util.List;


import com.handong.swap.DTO.LoginDTO;


public interface LoginDAO {
	public void insertUser(LoginDTO user);
//	public User insertUserForAdmin(User user);
//	
	public LoginDTO getUserByToken(String token);	
	public LoginDTO getUserByEmail(String email);
//	
//	public User getUserByID(int id);
	
	public void updateUserByToken(LoginDTO user);
//	public void deleteUserTokenByEmail(String email);
//
//	public int getLastId();
//
//	public List<User> readAllUser(String keyword);
//
//	public void updateUserStatus(int status, int id);
//	
//	public void deleteUser(String email);
//
//	public void updateDelDate(String email);
//
//	public void updateDelDateByUserId(int user_id);

}
