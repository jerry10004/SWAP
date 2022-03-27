package com.handong.swap.DAO;

import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.ProgramDTO;

@Repository
public interface ProgramDAO {

	public int add(ProgramDTO program);
}
