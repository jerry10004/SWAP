package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.ApplicationDTO;

public interface ApplicationDAO {

	List<ApplicationDTO> readJson(int id);
}
