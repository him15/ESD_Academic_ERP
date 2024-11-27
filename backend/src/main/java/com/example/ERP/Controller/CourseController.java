package com.example.ERP.Controller;

import com.example.ERP.Entity.CourseEntity;
import com.example.ERP.Entity.CoursePreRequisiteEntity;
import com.example.ERP.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    // Get course by ID
    @GetMapping("/get-course/{id}")
    public ResponseEntity<CourseEntity> getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("add-course")
    public ResponseEntity<?> addCourse(@RequestBody CoursePreRequisiteEntity coursePre) {
        return courseService.addCourse(coursePre);
    }

    // Update course
    @PutMapping("/update-course/{id}")
    public ResponseEntity<CourseEntity> updateCourse(@PathVariable Long id, @RequestBody CourseEntity updatedCourse) {
        try {
            CourseEntity course = courseService.updateCourse(id, updatedCourse);
            return ResponseEntity.ok(course);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete course
    @DeleteMapping("/delete-course/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteCourse(id);
            return new ResponseEntity<>("deleted",HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
