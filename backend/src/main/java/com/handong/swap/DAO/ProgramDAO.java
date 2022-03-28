package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.ProgramDTO;

public interface ProgramDAO {
	List<ProgramDTO> read();
	public int add(ProgramDTO program);
}
