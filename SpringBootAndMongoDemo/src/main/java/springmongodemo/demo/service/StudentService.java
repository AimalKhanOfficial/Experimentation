package springmongodemo.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import springmongodemo.demo.Repositories.StudentRepo;
import springmongodemo.demo.controllers.StudentController;
import springmongodemo.demo.domain.Student;

@Component
public class StudentService {

    @Autowired
    StudentRepo studentRepo;

    public int AddStudent(Student student) {
        try {
            studentRepo.save(student);
            return 1;
        }catch (Exception ex) {
            return 0;
        }
    }
}
