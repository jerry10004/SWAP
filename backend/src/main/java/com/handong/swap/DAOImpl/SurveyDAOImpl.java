package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.SurveyDAO;
import com.handong.swap.DTO.SurveyDTO;
import com.handong.swap.DTO.SurveyDeleteConfirmDTO;
import com.handong.swap.DTO.SurveyNameDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

@Repository
public class SurveyDAOImpl implements SurveyDAO {
	
	@Autowired
	SqlSession sqlSession;
	

	@Override
	public List<SurveyDTO> readJson(int id) {
		return sqlSession.selectList("Survey.readJson", id);
	}


	@Override
	public int add(SurveyDTO survey) {
		int result;
		int exist = sqlSession.selectOne("Survey.insertConfirmSurvey",survey);
		
		if(exist == 0) result = sqlSession.insert("Survey.insertSurvey", survey);
		else result = -2;
		System.out.println("=======");
		System.out.println(exist);
		System.out.println(result);
		return result;
	}


	@Override
	public List<SurveyNameDTO> readName() {
		return sqlSession.selectList("Survey.readName");
	}


	@Override
	public List<SurveyDTO> read() {
		return sqlSession.selectList("Survey.read");
	}


	@Override
	public void delete(int id) {
	    sqlSession.delete("Survey.delete", id);
	}


	@Override
	public int deleteConfirm(int id) {
	    return sqlSession.selectOne("Survey.deleteConfirm", id);
	}


	@Override
	public List<SurveyDTO> readSurveyById(int id) {
		return sqlSession.selectList("Survey.readSurveyById",id);
	}
	
	@Override
	public List<ProgramDTO> readSurveyFormByProgramId(int id) {
		return sqlSession.selectList("Survey.readSurveyForm", id);
	}


	@Override
	public List<String> readProgramName(int id) {
		return sqlSession.selectList("Survey.readProgramName", id);
	}

}
