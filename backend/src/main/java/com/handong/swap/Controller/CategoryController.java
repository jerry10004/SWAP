package com.handong.swap.Controller;

import java.io.IOException;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.handong.swap.Service.CategoryService;

@Controller
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	CategoryService categoryService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readCategory() throws IOException, ParseException {
		System.out.println("읽기 시도");
		String result = categoryService.readCategory();
		System.out.println(result);
	    return result;
	}

}
