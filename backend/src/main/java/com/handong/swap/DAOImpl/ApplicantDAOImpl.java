package com.handong.swap.DAOImpl;

import java.util.List;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.handong.swap.DAO.ApplicantDAO;
import com.handong.swap.DTO.ApplicantReadDTO;

@Repository
public class ApplicantDAOImpl implements ApplicantDAO {
	
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<ApplicantReadDTO> readApplicantInformationByProgramId(int id) {
		return sqlSession.selectList("Applicant.readApplicantInformationByProgramId",id);
	}


}
