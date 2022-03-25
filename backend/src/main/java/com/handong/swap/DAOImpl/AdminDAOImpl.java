package com.handong.swap.DAOImpl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DTO.AdminDTO;


@Repository
public class AdminDAOImpl implements AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	private String namespace = "Admin";
	
	@Override
	public void add(AdminDTO admin) {
		sqlSession.insert(namespace+".insertAdministrator", admin);
	}

}
