package com.handong.swap.DAOImpl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.CategoryDAO;
import com.handong.swap.DTO.CategoryDTO;

@Repository
public class CategoryDAOImpl implements CategoryDAO{
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<CategoryDTO> readCategory(){
		return sqlSession.selectList("Category.readCategory");
	}
	
	
}
