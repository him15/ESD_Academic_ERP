package com.example.ERP.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class CoursePreRequisiteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference //
    private CourseEntity course;

    @ManyToOne
    @JoinColumn(name = "prerequisite_id", nullable = false)
    private CourseEntity prerequisite;

    private String description;
}
