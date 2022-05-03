package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.LikeDAO;
import com.handong.swap.DTO.LikeDTO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.Service.LikeService;


@Service
public class LikeServiceImpl implements LikeService {
	
	@Autowired
	LikeDAO likeDAO;

	@Override
	public String read(int user_id, int program_id) throws JsonProcessingException {
		List<LikeDTO> likeDATA = likeDAO.read(user_id, program_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(likeDATA);
		System.out.println("Bookmark Data" + jsonString);
		return jsonString;
	}

	@Override
	public int add(LikeDTO like) {
		return likeDAO.add(like);
	}

	@Override
	public void delete(int user_id, int program_id) {
		likeDAO.delete(user_id, program_id);
		
	}
	
	@Override
	public String readAllLike(int user_id) throws JsonProcessingException {
		List<LikeDTO> likeDATA = likeDAO.readAllLike(user_id);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(likeDATA);
		return jsonString;
	}

}
