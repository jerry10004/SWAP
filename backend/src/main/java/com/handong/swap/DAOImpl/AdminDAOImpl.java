package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DTO.AdminDTO;

@Repository
public class AdminDAOImpl implements AdminDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public int add(AdminDTO admin) {
		int result = sqlSession.insert("Admin.insertAdmin", admin);
		return result;
	}
	
	@Override
	public List<AdminDTO> read(){
//		Map<String, Object> param = new HashMap<String, Object>();
		return sqlSession.selectList("Admin.readAdmin");
	}

}
