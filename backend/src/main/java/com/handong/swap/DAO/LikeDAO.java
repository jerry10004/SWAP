package com.handong.swap.DAO;

import java.util.List;

import com.handong.swap.DTO.LikeDTO;


public interface LikeDAO {
	
	List<LikeDTO> read(int user_id, int program_id);
	List<LikeDTO> readAllLike(int user_id);
	public int add(LikeDTO like);
	public void delete(int user_id, int program_id);

}
