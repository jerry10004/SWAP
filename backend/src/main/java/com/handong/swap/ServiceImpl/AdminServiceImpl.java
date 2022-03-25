package com.handong.swap.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DTO.AdminDTO;

import com.handong.swap.Service.AdminService;

@Service
public class AdminServiceImpl  implements AdminService{
	
	@Autowired
	AdminDAO adminDAO;
	
	@Override
	public String add(AdminDTO admin) {
		System.out.println("admin is "+admin);
		adminDAO.add(admin);
		System.out.println("service success!");
		return("관리자가 추가되었습니다.");
	}

}
