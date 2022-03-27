package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.AdminDTO;

public interface AdminDAO {

	public int add(AdminDTO admin);
	
	List<AdminDTO> read();
}
