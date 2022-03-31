

package com.handong.swap.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.handong.swap.DTO.ProgramDTO;

public interface ProgramService {
	

	public String read() throws JsonProcessingException;

	public int add(ProgramDTO program);
	
	public String readProgramInformationByProgramId(int id) throws JsonProcessingException;
	public void delete(int id);

}
