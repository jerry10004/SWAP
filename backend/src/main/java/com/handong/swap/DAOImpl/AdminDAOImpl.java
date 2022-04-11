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
	public void add(int user_id) {
		sqlSession.insert("Admin.insertAdmin", user_id);
	}
	
	@Override
	public List<AdminDTO> read(){
		return sqlSession.selectList("Admin.readAdmin");
	}

	@Override
	public void delete(int id) {
		sqlSession.delete("Admin.deleteAdmin", id);
	}
	
	@Override
	public AdminDTO readAdminByUserId(int user_id) {
		Map<String, Object> param = new HashMap<String, Object>();
	    param.put("user_id", user_id);

		return sqlSession.selectOne("Admin.readAdminByUserId", param);
	}

	@Override
	public List<AdminDTO> readWaitAdmin() {
		return sqlSession.selectList("Admin.readWaitAdmin");
	}

}
