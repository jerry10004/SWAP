package com.handong.swap.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.handong.swap.Service.UserService;


@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value="add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public String addUser() {
		return userService.insertUser(dto);
	}
	
}
