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
		int program_id = sqlSession.selectOne("Program.readProgramLastId", program);
		return program_id;
	}
	
	@Override
	public void updateDelDate(int id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
	    sqlSession.update("Program.updateDelDate", param);
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
	public List<ProgramReadNameDTO> readProgramName(int id) {
		return sqlSession.selectList("Program.readProgramName",id);
	}

	@Override
	public void edit(ProgramDTO program) {
	    sqlSession.update("Program.edit", program);
	}


	@Override
	public List<ProgramReadDTO> readByCategory(int category_id) {
		return sqlSession.selectList("Program.readByCategory",category_id);
	}

	
	@Override
	public void updateApplicantNum(int program_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("program_id", program_id);
	    sqlSession.update("Program.updateApplicantNum", param);
	}

}
