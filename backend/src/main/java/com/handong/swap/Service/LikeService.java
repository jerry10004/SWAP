package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.LikeDTO;

public interface LikeService {
	
	public String read(int user_id, int program_id) throws JsonProcessingException;
	public int add(LikeDTO like);
	public void delete(int user_id, int program_id);
	public String readAllLike(int user_id) throws JsonProcessingException;

}
