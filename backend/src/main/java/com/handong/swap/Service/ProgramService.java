

package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramFileDTO;

public interface ProgramService {
	

	public String read() throws JsonProcessingException;

	public int add(ProgramDTO program);
	
	public int insertPoster(ProgramFileDTO program);
	
	public int insertFile(ProgramFileDTO program);
	
	public String readByCategory(int category_id) throws JsonProcessingException;
	
	public String readByStatusByUser(int status, int user_id) throws JsonProcessingException;
	
	public String readProgramInformationByProgramId(int id) throws JsonProcessingException;
		
	public String readProgramName(int id) throws JsonProcessingException;
	
	public void delete(int id);
	
	public void deleteFiles(int id);
	
	public void deleteOnlyFile(int program_id);
	
	public int deleteConfirm(int id) throws JsonProcessingException;
	
	public void updateStatus(int program_id, int status);
	
	public void updateApplyStatus(int program_id, int apply_status);

	public void edit(ProgramDTO program);
	
	public void editPoster(ProgramFileDTO programPoster);
	
	public void updateApplicantNum(int program_id);
	
	public void decreaseApplicantNum(int program_id);

	public String readLikedPrograms(int user_id) throws JsonProcessingException;


}
