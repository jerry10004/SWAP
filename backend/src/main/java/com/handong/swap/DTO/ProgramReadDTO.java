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
	int apply_status;
	int quota;
	String status_name;
	String start_date;
	String end_date;
	String Applystart_date;
	String Applyend_date;
	String manager_name;
	String manager_contact;
    int applicants_num;
    String file_name;
    int file_type;
    Date regdate;
    
    
	
    public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public int getQuota() {
		return quota;
	}
	public void setQuota(int quota) {
		this.quota = quota;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public int getFile_type() {
		return file_type;
	}
	public void setFile_type(int file_type) {
		this.file_type = file_type;
	}
	public int getApplicants_num() {
		return applicants_num;
	}
	public void setApplicants_num(int applicants_num) {
		this.applicants_num = applicants_num;
	}
	public String getApplystart_date() {
		return Applystart_date;
	}
	public void setApplystart_date(String applystart_date) {
		Applystart_date = applystart_date;
	}
	public String getApplyend_date() {
		return Applyend_date;
	}
	public void setApplyend_date(String applyend_date) {
		Applyend_date = applyend_date;
	}
	public String getManager_name() {
		return manager_name;
	}
	public void setManager_name(String manager_name) {
		this.manager_name = manager_name;
	}
	public String getManager_contact() {
		return manager_contact;
	}
	public void setManager_contact(String manager_contact) {
		this.manager_contact = manager_contact;
	}
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
	public int getApply_status() {
		return apply_status;
	}
	public void setApply_status(int apply_status) {
		this.apply_status = apply_status;
	}
	public String getStatus_name() {
		return status_name;
	}
	public void setStatus_name(String status_name) {
		this.status_name = status_name;
	}
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	
}