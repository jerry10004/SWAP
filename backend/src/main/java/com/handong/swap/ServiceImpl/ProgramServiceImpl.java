package com.handong.swap.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.Service.ProgramService;

@Service
public class ProgramServiceImpl implements ProgramService{
	
	@Autowired
	ProgramDAO programDAO;
	
	@Override
	public int add(ProgramDTO program) {
		return programDAO.add(program);
	}
}
