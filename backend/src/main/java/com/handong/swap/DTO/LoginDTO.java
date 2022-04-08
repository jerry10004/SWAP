package com.handong.swap.DTO;

import java.security.Timestamp;
import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class LoginDTO {
	int id;
	String name;
	String email;
	int status;
	String token;
	@JsonFormat(pattern = "yyyy-MM-dd")
	Date expire_token;
	@JsonFormat(pattern = "yyyy-MM-dd")
	Date regdate;
	
	
	public LoginDTO() {}
	
	public LoginDTO(String email, int status) {
		super();
		this.email = email;
		this.status = status;
	}
	
	public LoginDTO(int id, String name, String email, int status, String token, Date expire_token) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.status = status;
		this.token = token;
		this.expire_token = expire_token;
	}

	
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getExpire_token() {
		return expire_token;
	}

	public void setExpire_token(Date expire_token) {
		this.expire_token = expire_token;
	}

	public Date getReg_date() {
		return regdate;
	}

	public void setReg_date(Date regdate) {
		this.regdate = regdate;
	}
	
}
