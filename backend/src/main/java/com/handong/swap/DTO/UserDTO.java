package com.handong.swap.DTO;

import java.security.Timestamp;

import org.springframework.format.annotation.DateTimeFormat;

public class UserDTO {
	private int id;
	private String user_name;
	private String email;
	private int student_id;
	private String phone;
	private int student_class;
	private int semester;
	private String department;
	private String major1;
	private String major2;
	private Timestamp regdate;
	private int status;
	private Timestamp deldate;
	private String token;
	private DateTimeFormat expire_token;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
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
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
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
	public Timestamp getRegdate() {
		return regdate;
	}
	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Timestamp getDeldate() {
		return deldate;
	}
	public void setDeldate(Timestamp deldate) {
		this.deldate = deldate;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public DateTimeFormat getExpire_token() {
		return expire_token;
	}
	public void setExpire_token(DateTimeFormat expire_token) {
		this.expire_token = expire_token;
	}
	
	
}
