package com.handong.swap.DTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ApplicationReadDTO {
	int id;
	String name;
	String admin;
	String regdate;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
