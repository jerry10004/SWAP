package com.handong.swap.Controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.reflect.TypeToken;
import com.handong.swap.DTO.ApplicantDTO;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.Service.ApplicantService;
import com.handong.swap.Service.ProgramService;

import net.sf.json.JSONArray;


@RequestMapping("/applicant")
@Controller
public class ApplicantController {

	
	@Autowired
	ApplicantService applicantService;
	@Autowired
	ProgramService programService;
	
	@RequestMapping(value = "/applicants/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readApplicantInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
//		System.out.println("프로그램 별 신청자 정보 읽기");
//		System.out.println(id);

		String result = applicantService.readApplicantInformationByProgramId(id);
//		System.out.println("result is "+result);
		return result;
	}
	
	@RequestMapping(value = "/applicants/{id}/update", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void updateApplicantStatus(HttpServletRequest httpServletRequest) throws IOException, ParseException {
		String[] param_ids = httpServletRequest.getParameterValues("id");
		String[] ids = param_ids[0].split(",");
		String[] param_status = httpServletRequest.getParameterValues("status");
		String[] status = param_status[0].split(",");
		
		int program_id = Integer.parseInt(httpServletRequest.getParameter("program_id"));
		
		for (int i = 0; i < ids.length; i++) {
			applicantService.updateApplicantStatus(Integer.parseInt(ids[i]),Integer.parseInt(status[i]));
//			if(Integer.parseInt(status[i]) == 2) {
//				System.out.println("here! program id is "+program_id);
//				programService.decreaseApplicantNum(program_id);
//			}
			
		}
		programService.updateApplicantNum(program_id);
		
	}
	
	@RequestMapping(value = "/apply", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void applyApplication(HttpServletRequest httpServletRequest) throws ParseException {
		ApplicantDTO applicant = new ApplicantDTO();
		
		applicant.setProgram_id(Integer.parseInt(httpServletRequest.getParameter("program_id")));
		applicant.setUser_id(Integer.parseInt(httpServletRequest.getParameter("user_id")));	
		applicant.setApplication_form(httpServletRequest.getParameter("content"));
		
		
		int result = applicantService.applyApplication(applicant);
		
		
		if(result ==0 ) {
			System.out.println("신청서 추가 실패");
		}
		else {
			programService.updateApplicantNum(Integer.parseInt(httpServletRequest.getParameter("program_id")));
			System.out.println("신청서 추가 성공");
		}
		
	}
	
	@RequestMapping(value = "/{programID}/applicants/{userID}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readApplicantByUserId(@PathVariable int programID, @PathVariable int userID) throws IOException, ParseException {
		System.out.println("프로그램 별 신청자 정보 읽기");
		System.out.println(programID);
		System.out.println(userID);
		String result = applicantService.readApplicantByUserId(programID, userID);
		System.out.println("result is "+result);
		return result;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void deleteApplicant(HttpServletRequest httpServletRequest) throws ParseException {
		
		int program_id = Integer.parseInt(httpServletRequest.getParameter("program_id"));
		int applicant_id = Integer.parseInt(httpServletRequest.getParameter("applicant_id"));	
		
		applicantService.deleteApplicant(applicant_id);
		programService.updateApplicantNum(program_id);

		
	}
	
	
	
}
