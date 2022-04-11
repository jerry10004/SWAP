package com.handong.swap.DTO;

import java.security.Timestamp;
import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class LoginDTO {
	int id;
	int student_id;
	int student_class;
	int semester;
	int status;
	
	String name;
	String email;
	String major1;
	String major2;
	String token;
	String phone;
	String department;
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

	public int getStudent_id() {
		return student_id;
	}

	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}

	public int getStudent_class() {
		return student_class;
	}

	public void setStudent_class(int student_class) {
		this.student_class = student_class;
	}

	public int getSemester() {
		return semester;
	}

	public void setSemester(int semester) {
		this.semester = semester;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
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

	public String getMajor1() {
		return major1;
	}

	public void setMajor1(String major1) {
		this.major1 = major1;
	}

	public String getMajor2() {
		return major2;
	}

	public void setMajor2(String major2) {
		this.major2 = major2;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Date getExpire_token() {
		return expire_token;
	}

	public void setExpire_token(Date expire_token) {
		this.expire_token = expire_token;
	}

	public Date getRegdate() {
		return regdate;
	}

	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}

	
}
