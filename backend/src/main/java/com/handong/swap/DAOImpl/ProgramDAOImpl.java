package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.handong.swap.DAO.ProgramDAO;
import com.handong.swap.DTO.ProgramReadDTO;
import com.handong.swap.DTO.ProgramDTO;

@Repository
public class ProgramDAOImpl implements ProgramDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<ProgramReadDTO> read(){
//		Map<String, Object> param = new HashMap<String, Object>();
		return sqlSession.selectList("Program.readProgram");
	}

	public int add(ProgramDTO program) {
		int result = sqlSession.insert("Program.insertProgram", program);
		return result;
	}

}
