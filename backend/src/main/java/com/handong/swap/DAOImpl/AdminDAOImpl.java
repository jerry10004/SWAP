package com.handong.swap.DAOImpl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DTO.AdminDTO;


@Repository
public class AdminDAOImpl implements AdminDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	public int add(AdminDTO admin) {
		System.out.println("now here is AdminDAOImpl");
		int result = sqlSession.insert("Admin.insertAdministrator", admin);
		System.out.println("wow!!! DAOImpl ");
		return result;
	}

}
