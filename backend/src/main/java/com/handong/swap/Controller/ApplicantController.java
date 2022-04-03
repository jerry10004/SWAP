package com.handong.swap.Controller;

import java.io.IOException;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.handong.swap.Service.ApplicantService;


@RequestMapping("/applicant")
@Controller
public class ApplicantController {

	
	@Autowired
	ApplicantService applicantService;
	
	@RequestMapping(value = "/applicants/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readApplicantInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
		System.out.println("프로그램 별 신청자 정보 읽기");
		System.out.println(id);

		String result = applicantService.readApplicantInformationByProgramId(id);
		System.out.println("result is "+result);
		return result;
	}
	
	
}
