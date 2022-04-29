package com.handong.swap.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.handong.swap.DAO.CategoryDAO;
import com.handong.swap.DTO.CategoryDTO;
import com.handong.swap.Service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryDAO categoryDAO;
	
	@Override
	public String readCategory() throws JsonProcessingException{
		List<CategoryDTO> categoryDATA = categoryDAO.readCategory();
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(categoryDATA);
		return jsonString;
	}
	

}
