package com.handong.swap.DAO;

import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.AdminDTO;

@Repository
public interface AdminDAO {

	public int add(AdminDTO admin);
}
