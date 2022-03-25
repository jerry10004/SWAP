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
import com.handong.swap.DAO.AdminDAO;
import com.handong.swap.DTO.AdminDTO;
//import edu.handong.walab.model.dto.Administrator;
//import edu.handong.walab.service.AdminService;
import com.handong.swap.Service.*;
@Controller
@RequestMapping("/administrator")
public class AdminController{
	@Autowired
	AdminService adminService;

	
//	@Autowired
//	AdminService adminService;
	
//	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
//	@ResponseBody
//	public String readData(HttpServletRequest httpServletRequest) throws IOException, ParseException {
//		
//		String keyword = null;
//		try {
//			if(httpServletRequest.getParameter("keyword") != null) {
//				keyword = URLDecoder.decode(httpServletRequest.getParameter("keyword"), "UTF-8");
//			}
//		} catch (UnsupportedEncodingException e1) {
//			e1.printStackTrace();
//		}
//		
//	    return adminService.readAdminByKeyword(keyword);
//	}
//	
//	@RequestMapping(value = "user/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
//	@ResponseBody
//	public String readDataByUserId(HttpServletRequest httpServletRequest, @PathVariable int id) throws IOException, ParseException {
//		return adminService.readAdminByUserId(id);
//	}
//	
//	@RequestMapping(value = "{id}", method = RequestMethod.PUT, produces = "application/json; charset=utf8")
//	@ResponseBody
//	public String patchEmailYN(@PathVariable int id, @RequestBody Map<String,Object> param) throws IOException, ParseException {
//		int editValue = Integer.parseInt(param.get("editValue").toString());
//		adminService.patchEmailYN(id, editValue);
//		return "success";
//	}
//	
//	@RequestMapping(value = "del_date/{id}", method = RequestMethod.PUT, produces = "application/json; charset=utf8")
//	@ResponseBody
//	public void deleteAdministrator(@RequestBody Map<String,Object> param, @PathVariable int id) {
//		String email = param.get("email").toString();
//		adminService.delete(id, email);
//	}
	
	@RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) {
		System.out.println("============");
		System.out.println(httpServletRequest.getParameter("email"));
		AdminDTO admin = new AdminDTO();
		admin.setUser_id(1);
		admin.setEmail(httpServletRequest.getParameter("email"));
		admin.setPhone(httpServletRequest.getParameter("phone"));
		System.out.println("dto success");
//		admin.setEmailYN(Integer.parseInt(httpServletRequest.getParameter("email_yn")));
		int result = adminService.add(admin);
		if(result ==0 ) {
			System.out.println("데이터 추가 실패");
		}
		else {
			System.out.println("데이터 추가 성");
		}
		System.out.println("yaho");
		System.out.println(result);
//		String r="dd";
//		return r;
	}
	
}
