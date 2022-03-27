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
}
	