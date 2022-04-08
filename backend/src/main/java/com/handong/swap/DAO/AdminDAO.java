package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.AdminDTO;

public interface AdminDAO {

	public void add(int user_id);
	List<AdminDTO> read();
	public void delete(int id);
	AdminDTO readAdminByUserId(int user_id);

}
