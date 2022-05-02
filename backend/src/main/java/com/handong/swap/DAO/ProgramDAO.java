package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramFileDTO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

public interface ProgramDAO {
	List<ProgramReadDTO> read();
	public int add(ProgramDTO program);
	public int insertPoster(ProgramFileDTO program);
	List<ProgramReadDTO> readProgramInformationByProgramId(int id);
	public void updateDelDate(int id);
	public void updateStatus(int program_id, int status);
	public void updateApplyStatus(int program_id, int apply_status);
	List<ProgramReadNameDTO> readProgramName(int id);
	public void edit(ProgramDTO program);
	List<ProgramReadDTO> readByCategory(int category_id);
	List<ProgramReadDTO> readByStatusByUser(int status, int user_id);
	public void updateApplicantNum(int program_id);
	public int deleteConfirm(int id);
}
