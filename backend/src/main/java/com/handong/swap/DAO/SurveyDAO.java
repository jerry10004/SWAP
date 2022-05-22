package com.handong.swap.DAO;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.SurveyDTO;
import com.handong.swap.DTO.SurveyNameDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

public interface SurveyDAO {

	List<SurveyDTO> readJson(int id);
	public int add(SurveyDTO survey);
	List<SurveyNameDTO> readName();
	List<SurveyDTO> read();
	public void delete(int id);
	public int deleteConfirm(int id);
	List<SurveyDTO> readSurveyById(int id);
	List<String> readProgramName(int id);
	List<ProgramDTO> readSurveyFormByProgramId(int id);
}
