package springmongodemo.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import springmongodemo.demo.domain.Student;

@Repository
public interface StudentRepo extends MongoRepository<Student, String> {
}
