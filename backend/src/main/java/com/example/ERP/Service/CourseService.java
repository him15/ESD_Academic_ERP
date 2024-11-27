package com.example.ERP.Service;

import com.example.ERP.Entity.CourseEntity;
import com.example.ERP.Entity.CoursePreRequisiteEntity;
import com.example.ERP.Repository.ICoursePreRequisitesRepo;
import com.example.ERP.Repository.ICourseRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private ICourseRepo courseRepository;

    @Autowired
    private ICoursePreRequisitesRepo coursePrerequisiteRepository;

    // Get course by ID
    public Optional<CourseEntity> getCourseById(Long courseId) {
        return courseRepository.findById(courseId);
    }

    // Update course details
    @Transactional
    public CourseEntity updateCourse(Long courseId, CourseEntity updatedCourse) {
        return courseRepository.findById(courseId).map(course -> {
            course.setCourseCode(updatedCourse.getCourseCode());
            course.setName(updatedCourse.getName());
            course.setDescription(updatedCourse.getDescription());
            course.setYear(updatedCourse.getYear());
            course.setTerm(updatedCourse.getTerm());
            course.setFaculty(updatedCourse.getFaculty());
            course.setCredits(updatedCourse.getCredits());
            course.setCapacity(updatedCourse.getCapacity());
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));
    }

    // Delete course with cascading prerequisites
    @Transactional
    public void deleteCourse(Long courseId) {
//        courseRepository.findById(courseId).ifPresent(course -> {
//            coursePrerequisiteRepository.deleteByCourse(course); // Delete prerequisites
//            courseRepository.delete(course); // Delete main course
//        });

        CourseEntity course=courseRepository.findById(courseId).get();

        //left_column
        coursePrerequisiteRepository.deleteByCourse(course);
        //right_column
        coursePrerequisiteRepository.deleteByprerequisite(course);

        //last me
        courseRepository.deleteById(courseId);

    }

    public ResponseEntity<?> addCourse(CoursePreRequisiteEntity course) {
        return new ResponseEntity<>(coursePrerequisiteRepository.save(course), HttpStatus.OK);
    }
}
