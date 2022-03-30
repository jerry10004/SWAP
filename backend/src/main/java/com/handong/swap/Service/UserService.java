package com.handong.swap.Service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

@Service
public interface UserService {
	
	public String read() throws JsonProcessingException;
	public String readStudents() throws JsonProcessingException;
	public String readDeletedUsers() throws JsonProcessingException;
	public void delete(int id);
	public void restore(int id);
}
