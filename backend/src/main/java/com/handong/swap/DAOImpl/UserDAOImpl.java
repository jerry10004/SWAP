//package com.handong.swap.DAOImpl;
//
//import org.apache.ibatis.session.SqlSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import com.handong.swap.DAO.UserDAO;
//import com.handong.swap.DTO.UserDTO;
//
//@Repository
//public class UserDAOImpl implements UserDAO{
//	@Autowired
//	SqlSession sqlSession;
//	
//	public int insertUser(UserDTO dto) {
//		int result = sqlSession.insert("User.insertUser",dto);
//		return result;
//	}
//}
