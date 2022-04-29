package com.handong.swap.Service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

@Service
public interface CategoryService {
	public String readCategory() throws JsonProcessingException;

}
