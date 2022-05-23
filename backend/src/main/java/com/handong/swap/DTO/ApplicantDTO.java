package com.handong.swap.DTO;

import java.util.Date;

public class ApplicantDTO {
	int id;
	int user_id;
	int program_id;
	Date regdate;
	int status;
	int completion;
	String application_form;
	String survey_form;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getProgram_id() {
		return program_id;
	}
	public void setProgram_id(int program_id) {
		this.program_id = program_id;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCompletion() {
		return completion;
	}
	public void setCompletion(int completion) {
		this.completion = completion;
	}
	public String getApplication_form() {
		return application_form;
	}
	public void setApplication_form(String application_form) {
		this.application_form = application_form;
	}
	public String getSurvey_form() {
		return survey_form;
	}
	public void setSurvey_form(String survey_form) {
		this.survey_form = survey_form;
	}
	
	
}
