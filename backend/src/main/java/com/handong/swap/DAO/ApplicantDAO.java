package com.handong.swap.DAO;

import java.util.List;


import com.handong.swap.DTO.ApplicantReadDTO;


public interface ApplicantDAO {
	
	List<ApplicantReadDTO> readApplicantInformationByProgramId(int id);
	String updateApplicantStatus(int id,int status);

}
