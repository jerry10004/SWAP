package com.handong.swap.DTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class SurveyReadDTO {
	int id;
	int category_id;
	String name;
	String admin;
	String regdate;
	String category_name;
	
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getCategory_id() {
		return category_id;
	}


	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getCategory_name() {
		return category_name;
	}


	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getAdmin() {
		return admin;
	}


	public void setAdmin(String admin) {
		this.admin = admin;
	}


	public String getRegdate() {
		return regdate;
	}


	public void setRegdate(String regdate) {
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm",Locale.KOREA);
	    Date date = null;
		try {
			date = inputFormat.parse(regdate);
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		SimpleDateFormat outputFormat = new SimpleDateFormat("yy-MM-dd HH:mm (EE)", Locale.KOREA);
		String result = outputFormat.format(date);

		this.regdate = result;
	}

}
