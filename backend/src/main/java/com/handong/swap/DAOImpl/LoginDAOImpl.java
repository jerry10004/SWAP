package com.handong.swap.DAOImpl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.LoginDAO;
import com.handong.swap.DAO.UserDAO;
import com.handong.swap.DTO.LoginDTO;
import com.handong.swap.DTO.UserDTO;


@Repository
public class LoginDAOImpl implements LoginDAO{
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public void insertUser(LoginDTO user) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("name", user.getName());
	    param.put("email", user.getEmail());
	    param.put("status", user.getStatus());
	    
		sqlSession.insert("insertUser", param);
	}
	
	@Override
	public LoginDTO getUserByToken(String token) {
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("token", token);
	    
		return sqlSession.selectOne("getUserDataByToken", param);
	}
	
	@Override
	public LoginDTO getUserByEmail(String email) {
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("email", email);
	    
		return sqlSession.selectOne("getUserDataByEmail", param);
	}
	
	@Override
	public void updateUserByToken(LoginDTO user) {
		DateFormat df = new SimpleDateFormat("dd:MM:yy HH:mm:ss");
		
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("id", user.getId());
	    param.put("token", user.getToken());
	    param.put("expire_token", df.format(user.getExpire_token()));
	    
	    sqlSession.update("updateUserToken", param);
	}
}
