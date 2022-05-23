package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramReadNameDTO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramFileDTO;

@Repository
public class ProgramDAOImpl implements ProgramDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<ProgramReadDTO> read(){
//		Map<String, Object> param = new HashMap<String, Object>();
		return sqlSession.selectList("Program.readProgram");
	}

	public int add(ProgramDTO program) {
		int result = sqlSession.insert("Program.insertProgram", program);
		System.out.println("in daoimpl!!");
		System.out.println(program.getApplystart_date());
		System.out.println(program.getStart_date());
		int program_id = sqlSession.selectOne("Program.readProgramLastId", program);
		return program_id;
	}
	
	public int insertPoster(ProgramFileDTO program) {
		int result = sqlSession.insert("Program.insertPoster", program);
		return result;
	}
	
	public int insertFile(ProgramFileDTO program) {
		int result = sqlSession.insert("Program.insertFile", program);
		return result;
	}
	
	@Override
	public void updateDelDate(int id) {
	    sqlSession.update("Program.updateDelDate", id);
	}

	@Override
	public List<ProgramReadDTO> readProgramInformationByProgramId(int id) {
		return sqlSession.selectList("Program.readProgramInformationByProgramId",id);
	}

	
	@Override
	public void updateStatus(int program_id, int status) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("program_id", program_id);
		param.put("status", status);
	    sqlSession.update("Program.updateStatus", param);
	}
	
	@Override
	public void updateApplyStatus(int program_id, int apply_status) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("program_id", program_id);
		param.put("apply_status", apply_status);
	    sqlSession.update("Program.updateApplyStatus", param);
	}

	@Override
	public List<ProgramReadNameDTO> readProgramName(int id) {
		return sqlSession.selectList("Program.readProgramName",id);
	}

	@Override
	public void edit(ProgramDTO program) {
	    sqlSession.update("Program.edit", program);
	}
	
	@Override
	public void editPoster(ProgramFileDTO programPoster) {
	    sqlSession.update("Program.editPoster", programPoster);
	}

	@Override
	public List<ProgramReadDTO> readByCategory(int category_id) {
		return sqlSession.selectList("Program.readByCategory",category_id);
	}

	
	@Override
	public void updateApplicantNum(int program_id) {
		System.out.println("변경~~~");
	    sqlSession.update("Program.updateApplicantNum", program_id);
	}

	@Override
	public List<ProgramReadDTO> readByStatusByUser(int status, int user_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("user_id", user_id);
		param.put("status", status);
		return sqlSession.selectList("Program.readByStatusByUser",param);
	}
	
	@Override
	public int deleteConfirm(int id) {
		int ongoing = sqlSession.selectOne("Program.selectConfirmOngoing", id);
		if(ongoing==1) return 0;
		else {
			int apply = sqlSession.selectOne("Program.selectConfirmApply", id);
			if(apply == 1) return 2;
		}
	    sqlSession.selectOne("Program.updateDelDate", id);
	    return 1;
	}
	
//	@Override
//	public void decreaseApplicantNum(int program_id) {
//		 sqlSession.update("Program.decreaseApplicantNum",program_id);
//	}

	public List<ProgramReadDTO> readLikedPrograms(int user_id){
		return sqlSession.selectList("Program.readLikedPrograms", user_id);
	}
	
	@Override
	public void deleteFiles(int program_id) {
		 sqlSession.delete("Program.deleteFiles",program_id);
	}
	
	@Override
	public void deleteOnlyFile(int program_id) {
		 sqlSession.delete("Program.deleteOnlyFile",program_id);
	}

	@Override
	public List<ProgramReadDTO> readApplicationByProgram(int program_id) {
		return sqlSession.selectList("Program.readApplicationByProgram",program_id);
	}
	
	@Override
	public List<ProgramReadDTO> readSurveyByProgram(int program_id) {
		return sqlSession.selectList("Program.readSurveyByProgram",program_id);
	}

	@Override
	public void updateApplicationByProgram(int program_id, String application_form) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("program_id", program_id);
		param.put("application_form", application_form);
		sqlSession.update("Program.updateApplicationByProgram", param);
	}

}
