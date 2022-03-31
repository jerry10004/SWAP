package com.handong.swap.DTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import com.google.protobuf.TextFormat.ParseException;

public class ProgramReadDTO {
	int id;
	String name;
	String category_name;
	String program_name;
	int status;
	String start_date;
	String end_date;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public String getProgram_name() {
		return program_name;
	}
	public void setProgram_name(String program_name) {
		this.program_name = program_name;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.US);
	    Date date = null;
		try {
			date = inputFormat.parse(start_date);
		} catch (java.text.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		SimpleDateFormat outputFormat = new SimpleDateFormat("yy-MM-dd (EE)", Locale.KOREA);
		String result = outputFormat.format(date);

		this.start_date = result;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.US);
	    Date date = null;
		try {
			date = inputFormat.parse(end_date);
		} catch (java.text.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		SimpleDateFormat outputFormat = new SimpleDateFormat("yy-MM-dd (EE)", Locale.KOREA);
		String result = outputFormat.format(date);

		this.end_date = result;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	
}