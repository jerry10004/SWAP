package com.handong.swap.Controller;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;


import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.ProgramService;
import com.handong.swap.DTO.ProgramDTO;

@Controller
@RequestMapping("/program")

public class ProgramController {

	
	@Autowired
	ProgramService programService;
	
	@RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readprogram(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		System.out.println("읽기 시도");
		String result = programService.read();
		System.out.println(result);
	    return result;
	}
	
	@RequestMapping(value = "/information/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readProgramInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
		System.out.println("프로그램 별 프로그램 정보 읽기");
		System.out.println(id);

		return programService.readProgramInformationByProgramId(id);
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void addAdministrator(HttpServletRequest httpServletRequest) throws ParseException {
		ProgramDTO program = new ProgramDTO();
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date start_date = (Date) formatter.parse(httpServletRequest.getParameter("start_date"));
		Date end_date = (Date) formatter.parse(httpServletRequest.getParameter("end_date"));
		
		program.setAdmin_id(Integer.parseInt(httpServletRequest.getParameter("admin_id")));
		program.setCategory_id(Integer.parseInt(httpServletRequest.getParameter("category_id")));
		program.setApplication_form(Integer.parseInt(httpServletRequest.getParameter("application_form")));
		program.setQuota(Integer.parseInt(httpServletRequest.getParameter("program_quota")));
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
