package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.handong.swap.DAO.LikeDAO;
import com.handong.swap.DTO.LikeDTO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LikeDAOImpl implements LikeDAO{
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<LikeDTO> read(int user_id, int program_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("program_id", program_id);
		param.put("user_id", user_id);

		return sqlSession.selectList("Like.readLike", param);
	}
	
	@Override
	public List<LikeDTO> readAllLike(int user_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("user_id", user_id);

		return sqlSession.selectList("Like.readAllLike", param);
	}

	@Override
	public int add(LikeDTO like) {
	
		int result = sqlSession.insert("Like.insertLike", like);
		return result;
	}

	@Override
	public void delete(int user_id, int program_id) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("program_id", program_id);
		param.put("user_id", user_id);
		sqlSession.delete("Like.deleteLike", param);
		
	}
	

}
