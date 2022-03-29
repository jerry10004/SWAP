package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.UserDAO;
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
	
	@Override
	public void updateUser(int id) {
		sqlSession.update("User.updateUser", id);
	}

	@Override
	public void updateDelDate(int id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
	    sqlSession.update("User.updateDelDate", param);
	}
}
