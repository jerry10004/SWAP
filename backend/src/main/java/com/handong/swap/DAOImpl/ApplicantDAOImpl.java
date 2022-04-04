package com.handong.swap.DAOImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	@Override
	public String updateApplicantStatus(int id,int status) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
	    param.put("status", status);
		int result = sqlSession.update("Applicant.updateApplicantStatus",param);
		if (result==1){
			return "success";
		}
		return  "error";
	} 


}
