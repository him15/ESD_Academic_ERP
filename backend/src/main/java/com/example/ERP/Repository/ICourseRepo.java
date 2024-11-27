package com.example.ERP.Repository;

import com.example.ERP.Entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICourseRepo extends JpaRepository<CourseEntity, Long> {

}
