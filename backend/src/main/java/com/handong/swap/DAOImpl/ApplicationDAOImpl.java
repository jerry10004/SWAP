package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.ApplicationDAO;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.DTO.ApplicationDeleteConfirmDTO;
import com.handong.swap.DTO.ApplicationNameDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.DTO.ProgramReadNameDTO;

@Repository
public class ApplicationDAOImpl implements ApplicationDAO {
	
	@Autowired
	SqlSession sqlSession;
	

	@Override
	public List<ApplicationDTO> readJson(int id) {
		return sqlSession.selectList("Application.readJson", id);
	}


	@Override
	public int add(ApplicationDTO application) {
		int result;
		int exist = sqlSession.selectOne("Application.insertConfirmApplication",application);
		
		if(exist == 0) result = sqlSession.insert("Application.insertApplication", application);
		else result = -2;
		System.out.println("=======");
		System.out.println(exist);
		System.out.println(result);
		return result;
	}


	@Override
	public List<ApplicationNameDTO> readName() {
		return sqlSession.selectList("Application.readName");
	}


	@Override
	public List<ApplicationDTO> read() {
		return sqlSession.selectList("Application.read");
	}


	@Override
	public void delete(int id) {
	    sqlSession.delete("Application.delete", id);
	}


	@Override
	public int deleteConfirm(int id) {
	    return sqlSession.selectOne("Application.deleteConfirm", id);
	}


	@Override
	public List<ApplicationDTO> readApplicationById(int id) {
		return sqlSession.selectList("Application.readApplicationById",id);
	}
	
	@Override
	public List<ProgramDTO> readApplicationFormByProgramId(int id) {
		return sqlSession.selectList("Application.readApplicationForm", id);
	}


	@Override
	public List<String> readProgramName(int id) {
		return sqlSession.selectList("Application.readProgramName", id);
	}

}
