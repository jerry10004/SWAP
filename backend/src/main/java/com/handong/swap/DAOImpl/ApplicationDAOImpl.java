package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.ApplicationDAO;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.DTO.ApplicationNameDTO;

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
		int result = sqlSession.insert("Application.insertApplication", application);
		return result;
	}


	@Override
	public List<ApplicationNameDTO> readName() {
		return sqlSession.selectList("Application.readName");
	}
	
	@Override
	public List<ApplicationDTO> readApplicationFormByProgramId(int id) {
		return sqlSession.selectList("Application.readApplicationForm", id);
	}

}
