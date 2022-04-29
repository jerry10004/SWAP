package com.handong.swap.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.handong.swap.DTO.CategoryDTO;


public interface CategoryDAO {
	 List<CategoryDTO> readCategory();
}
