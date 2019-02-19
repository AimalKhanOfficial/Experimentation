package springmongodemo.demo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Student {

    @Id
    public String studentId;

    public String studentName;

    public List<Course> correntCourses;

}
