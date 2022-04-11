package com.handong.swap.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.handong.swap.DTO.UserDTO;

@Repository
public interface UserDAO {
	List<UserDTO> read();
	List<UserDTO> readStudents();
	List<UserDTO> readDeletedUsers();
	List<UserDTO> readLoggedInUserById(int id);
	public void updateAdmin(int id);
	public void updateUser(int id);
	public void updateDelDate(int id);
	public void restore(int id);
}
