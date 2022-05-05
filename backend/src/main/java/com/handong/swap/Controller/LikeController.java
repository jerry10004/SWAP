package com.handong.swap.Controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.handong.swap.DTO.LikeDTO;
import com.handong.swap.DTO.ProgramDTO;
import com.handong.swap.Service.LikeService;

@Controller
@RequestMapping("/like")
public class LikeController {
	@Autowired
	LikeService likeService;
	
	
	@RequestMapping(value = "/read", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String read(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("Bookmark 읽어오");
		Integer user_id = Integer.parseInt(httpServletRequest.getParameter("user_id"));
		Integer program_id = Integer.parseInt(httpServletRequest.getParameter("program_id"));
		System.out.println("**"+user_id);
		System.out.println("**"+program_id);
		String result = likeService.read(user_id,program_id);
		System.out.println("Bookmark: "+ result);
		return result;
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public int add(HttpServletRequest httpServletRequest) throws ParseException {
		LikeDTO like = new LikeDTO();
		
		like.setUser_id(Integer.parseInt(httpServletRequest.getParameter("user_id")));
		like.setProgram_id(Integer.parseInt(httpServletRequest.getParameter("program_id")));
				
		int result = likeService.add(like);
		return result;
		
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteProgram(HttpServletRequest httpServletRequest) {
		int user_id = Integer.parseInt(httpServletRequest.getParameter("user_id"));
		int program_id = Integer.parseInt(httpServletRequest.getParameter("program_id"));
		likeService.delete(user_id, program_id);
	}
	
	@RequestMapping(value = "/readAllLike", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readAllLike(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		Integer user_id = Integer.parseInt(httpServletRequest.getParameter("user_id"));
		String result = likeService.readAllLike(user_id);
		return result;
	}
	
	
}
