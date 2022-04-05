package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.ApplicationDAO;
import com.handong.swap.DTO.ApplicationDTO;

@Repository
public class ApplicationDAOImpl implements ApplicationDAO {
	
	@Autowired
	SqlSession sqlSession;
	

	@Override
	public List<ApplicationDTO> readJson(int id) {
		return sqlSession.selectList("Application.readJson", id);
	}
	

}
