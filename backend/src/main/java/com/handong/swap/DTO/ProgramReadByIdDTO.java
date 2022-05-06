package com.handong.swap.DTO;

public class ProgramReadByIdDTO {
	int id;
	String program_name;
	String category_name;
	int quota;
	int category_id;
	int status;
	String information;
	String start_date;
	String end_date;
	String Applystart_date;
	String Applyend_date;
	String manager_name;
	String manager_contact;
	int applicants_num;
	int file_type;
	String file_name;
	
	
	
	
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public int getFile_type() {
		return file_type;
	}
	public void setFile_type(int file_type) {
		this.file_type = file_type;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setStatus(int status) {
		this.status = status;
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
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCategory_Id() {
		return category_id;
	}
	public void setCategory_Id(Integer category_id) {
		this.category_id = category_id;
	}
	public String getProgram_name() {
		return program_name;
	}
	public void setProgram_name(String program_name) {
		this.program_name = program_name;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public int getQuota() {
		return quota;
	}
	public void setQuota(int quota) {
		this.quota = quota;
	}
	public String getInformation() {
		return information;
	}
	public void setInformation(String information) {
		this.information = information;
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
	
	
}
