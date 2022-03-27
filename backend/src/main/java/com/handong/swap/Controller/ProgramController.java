package com.handong.swap.Controller;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.ProgramService;
import com.handong.swap.DTO.ProgramDTO;

@Controller
@RequestMapping("/program")
public class ProgramController{
	
	@Autowired
	ProgramService programService;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
		
		SimpleDateFormat formatter = new SimpleDateFormat("dd mm:ss");
		Date start_date = (Date) formatter.parse(httpServletRequest.getParameter("start_date"));
		Date end_date = (Date) formatter.parse(httpServletRequest.getParameter("end_date"));
		
		program.setCategory_id(Integer.parseInt(httpServletRequest.getParameter("category_id")));
		program.setProgram_name(httpServletRequest.getParameter("program_name"));
		program.setInformation(httpServletRequest.getParameter("information"));
		program.setStart_date(start_date);
		program.setEnd_date(end_date);
		
		int result = programService.add(program);
		
		if(result ==0 ) {
			System.out.println("프로그램 추가 실패");
		}
		else {
			System.out.println("프로그램 추가 성공");
		}
		
	}	
}
