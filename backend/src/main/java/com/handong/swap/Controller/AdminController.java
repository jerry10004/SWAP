package com.handong.swap.Controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.AdminService;
import com.handong.swap.Service.UserService;
import com.handong.swap.DTO.AdminDTO;
import com.handong.swap.DTO.UserDTO;

@Controller
@RequestMapping("/admin")
public class AdminController{
	
	@Autowired
	AdminService adminService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readAdministrator(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("읽기 시도");
		String result = adminService.read();
		System.out.println(result);
	    return result;
	}
	
	
	@RequestMapping(value = "add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) {
		String[] param_ids = httpServletRequest.getParameterValues("adminId");
		
		String[] ids = param_ids[0].split(",");
		
		for (int i = 0; i < ids.length; i++) {
//			AdminDTO admin = new AdminDTO();
//			admin.setUser_id(Integer.parseInt(ids[i]));
//			int admin_result = adminService.add(admin);
			adminService.add(Integer.parseInt(ids[i]));
//			
//			UserDTO user = new UserDTO();
//			user.setId(Integer.parseInt(ids[i]));
//			int user_result = userService.updateStatus(user);
			
//			if(admin_result == 0) {
//				System.out.println("관리자 추가 실패");
//			}
//			else {
//				System.out.println("관리자 추가 성공");
//			}
		}
	}	
}
