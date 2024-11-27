package com.example.ERP.Repository;

import com.example.ERP.Entity.CourseEntity;
import com.example.ERP.Entity.CoursePreRequisiteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICoursePreRequisitesRepo extends JpaRepository<CoursePreRequisiteEntity, Long> {
    void deleteByCourse(CourseEntity course);
    void deleteByprerequisite(CourseEntity course);
}
