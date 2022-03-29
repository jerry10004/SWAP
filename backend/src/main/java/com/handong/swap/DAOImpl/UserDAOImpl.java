package com.handong.swap.DAOImpl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.UserDTO;

@Repository
public class UserDAOImpl implements UserDAO{
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<UserDTO> read(){
		return sqlSession.selectList("User.readUser");
	}

	@Override
	public void updateAdmin(int id) {
		sqlSession.update("User.updateAdmin", id);
	}
}
