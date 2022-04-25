package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.DTO.ApplicationDeleteConfirmDTO;
import com.handong.swap.DTO.ApplicationNameDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

public interface ApplicationDAO {

	List<ApplicationDTO> readJson(int id);
	public int add(ApplicationDTO application);
	List<ApplicationNameDTO> readName();
	List<ApplicationDTO> read();
	public void delete(int id);
	public int deleteConfirm(int id);
	List<ApplicationDTO> readApplicationById(int id);
	List<String> readProgramName(int id);
	
	List<ApplicationDTO> readApplicationFormByProgramId(int id);
}
