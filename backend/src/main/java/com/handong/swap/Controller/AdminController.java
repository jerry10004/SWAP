package com.handong.swap.Controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
		AdminDTO admin = new AdminDTO();
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
	
//	@RequestMapping(value = "delete/{id}", method = RequestMethod.PUT, produces = "application/json; charset=utf8")
//	@ResponseBody
//	public void deleteAdministrator(@RequestBody Map<String,Object> param, @PathVariable int id) {
//		String email = param.get("email").toString();
//		adminService.delete(id, email);
//	}
}
