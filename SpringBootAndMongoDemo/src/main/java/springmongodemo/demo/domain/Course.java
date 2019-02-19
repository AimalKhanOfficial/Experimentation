package springmongodemo.demo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Course {
    @Id
    public String courseId;

    public String courseName;
}
