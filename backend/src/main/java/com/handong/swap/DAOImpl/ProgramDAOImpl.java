package com.handong.swap.DAOImpl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramDTO;

@Repository
public class ProgramDAOImpl implements ProgramDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	public int add(ProgramDTO program) {
		int result = sqlSession.insert("Program.insertProgram", program);
		return result;
	}
}
