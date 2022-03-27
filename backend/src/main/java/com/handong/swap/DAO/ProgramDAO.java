package com.handong.swap.DAO;

<<<<<<< HEAD
import java.util.List;
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.ProgramDTO;

public interface ProgramDAO {
	List<ProgramDTO> read();
=======
import org.springframework.stereotype.Repository;
import com.handong.swap.DTO.ProgramDTO;

@Repository
public interface ProgramDAO {

	public int add(ProgramDTO program);
>>>>>>> f33c1bb71eec54e175018cec3130ec49f50f4a5d
}
