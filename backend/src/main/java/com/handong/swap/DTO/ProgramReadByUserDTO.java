package com.handong.swap.DTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.google.protobuf.TextFormat.ParseException;

public class ProgramReadByUserDTO {
	int applicant_id;
	int program_id;
	int program_status;
	String program_name;
	String start_date;
	String end_date;
	String status_name;
	int status;
	public int getApplicant_id() {
		return applicant_id;
	}
	public void setApplicant_id(int applicant_id) {
		this.applicant_id = applicant_id;
	}
	public int getProgram_id() {
		return program_id;
	}
	public void setProgram_id(int program_id) {
		this.program_id = program_id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getProgram_Status() {
		return program_status;
	}
	public void setProgram_Status(int program_status) {
		this.program_status = program_status;
	}
	public String getProgram_name() {
		return program_name;
	}
	public void setProgram_name(String program_name) {
		this.program_name = program_name;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
//		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm",Locale.KOREA);
//	    Date date = null;
//		try {
//			date = inputFormat.parse(start_date);
//		} catch (java.text.ParseException e) {
//			e.printStackTrace();
//		}
//		SimpleDateFormat outputFormat = new SimpleDateFormat("yy-MM-dd HH:mm (EE)", Locale.KOREA);
//		String result = outputFormat.format(date);
//
//		this.start_date = result;
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
//		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm",Locale.KOREA);
//	    Date date = null;
//		try {
//			date = inputFormat.parse(end_date);
//		} catch (java.text.ParseException e) {
//			e.printStackTrace();
//		}
//		SimpleDateFormat outputFormat = new SimpleDateFormat("yy-MM-dd HH:mm (EE)", Locale.KOREA);
//		String result = outputFormat.format(date);
//
//		this.end_date = result;
		this.end_date = end_date;
	}
	public String getStatus_name() {
		return status_name;
	}
	public void setStatus_name(String status_name) {
		this.status_name = status_name;
	}
	
	
	
}