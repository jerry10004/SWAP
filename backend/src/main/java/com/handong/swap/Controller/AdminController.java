package com.handong.swap.Controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.AdminService;
import com.handong.swap.DTO.AdminDTO;

@Controller
@RequestMapping("/admin")
public class AdminController{
	
	@Autowired
	AdminService adminService;
	
	@RequestMapping(value = "add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) {
		AdminDTO admin = new AdminDTO();
//		admin.setUser_id(3);
		admin.setName(httpServletRequest.getParameter("name"));
		admin.setEmail(httpServletRequest.getParameter("email"));
		admin.setPhone(httpServletRequest.getParameter("phone"));
		int result = adminService.add(admin);
		if(result ==0 ) {
			System.out.println("관리자 추가 실패");
		}
		else {
			System.out.println("관리자 추가 성공");
		}
	}	
}
