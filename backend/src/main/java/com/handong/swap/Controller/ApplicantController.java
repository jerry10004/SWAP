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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.reflect.TypeToken;
import com.handong.swap.DTO.ApplicantDTO;
import com.handong.swap.DTO.ApplicationDTO;
import com.handong.swap.Service.ApplicantService;
import com.handong.swap.Service.ProgramService;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


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
		String result = applicantService.readApplicantInformationByProgramId(id);
		return result;
	}
	
	@RequestMapping(value = "/applicants/survey/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String readSubmitterInformationByProgramId(@PathVariable int id) throws IOException, ParseException {
		String result = applicantService.readSubmitterInformationByProgramId(id);
		System.out.println("result is "+result);
		return result;
	}
	
	@RequestMapping(value = "/applicants/survey/data/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public ArrayList<ArrayList<String>> readSubmitterDataByProgramId(@PathVariable int id) throws IOException, ParseException, org.json.simple.parser.ParseException {
		ArrayList<String> response = applicantService.readSubmitterDataByProgramId(id);
		String result = "";
		ArrayList<ArrayList<String>> datas = new ArrayList<ArrayList<String>>();
		
		for(int i = 0; i < response.size(); i++) {
			
		
			JSONParser jsonParse = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParse.parse(response.get(i));
			
			String survey_form = (String)jsonObj.get("survey_form"); // 각 사람의 survey_form
			JSONParser jsonParse_sub = new JSONParser();
			Object obj_sub= jsonParse_sub.parse(survey_form);
			JSONArray jsonArr = (JSONArray)obj_sub;
			
			if (jsonArr.size() > 0){
				if(i == 0) {
		    		for(int a = 0; a < jsonArr.size(); a++) {
		    			datas.add(new ArrayList<String>());
		    		}
		    	}
			
			    for(int j = 0; j < jsonArr.size(); j++){
			        JSONObject jsonObj_sub = (JSONObject)jsonArr.get(j); //한 사람의 각 문제.
			        JSONArray jsonAnswer = (JSONArray)jsonObj_sub.get("userData");  // 한 사람의 각 문제의 응답한 내용
			        String answer="";
			        for(int k = 0; k < jsonAnswer.size(); k++) {
			        	if(k == jsonAnswer.size()-1)
			        		answer = answer + (String) jsonAnswer.get(k);
			        	else answer = answer +  (String) jsonAnswer.get(k)+",";
			        }
			        datas.get(j).add(answer);
			    }
			}		
		}
	
		return datas;
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
	
	@RequestMapping(value = "/survey", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public void applySurvey(HttpServletRequest httpServletRequest) throws ParseException {
		ApplicantDTO applicant = new ApplicantDTO();
		
		applicant.setProgram_id(Integer.parseInt(httpServletRequest.getParameter("program_id")));
		applicant.setUser_id(Integer.parseInt(httpServletRequest.getParameter("user_id")));	
		applicant.setSurvey_form(httpServletRequest.getParameter("content"));
		
		
		int result = applicantService.applySurvey(applicant);
	
		
	}
	
	@RequestMapping(value = "/confirm/survey", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String confirmSurvey(HttpServletRequest httpServletRequest) throws ParseException, JsonProcessingException {
		ApplicantDTO applicant = new ApplicantDTO();
		
		applicant.setUser_id(Integer.parseInt(httpServletRequest.getParameter("user_id")));			
		
		String result = applicantService.confirmSurvey(applicant);
		return result;
		
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
