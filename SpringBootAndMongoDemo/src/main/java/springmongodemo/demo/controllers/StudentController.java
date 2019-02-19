package springmongodemo.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springmongodemo.demo.domain.Course;
import springmongodemo.demo.domain.Student;
import springmongodemo.demo.service.StudentService;

import java.util.ArrayList;

@RestController
@RequestMapping("/student/")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/get")
    public ResponseEntity<?> GetStudent(){
        try {
            Student s = new Student();
            s.studentName = "Aimal";
            s.studentId = "1";
            Course c = new Course();
            c.courseId = "1";
            c.courseName = "SA";
            s.correntCourses = new ArrayList<>();
            s.correntCourses.add(c);
            studentService.AddStudent(s);
            return new ResponseEntity<>("Hello World", HttpStatus.OK);
        }catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
