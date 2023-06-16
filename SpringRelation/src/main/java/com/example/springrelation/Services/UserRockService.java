package com.example.springrelation.Services;

import com.example.springrelation.model.base.Employee;
import com.example.springrelation.model.role.UserRock;
import com.example.springrelation.Repositories.EmployeeRepo;
import com.example.springrelation.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserRockService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Transactional
    public ResponseEntity<Object> createUser(UserRock userRock) {

        UserRock userRock1 = new UserRock();
        userRock1.setUser(userRock.getIsUser());
        userRock1.setGroup(userRock.getIsGroup());
        userRock1.setUserName(userRock.getUserName());
        userRock1.setEmployee(userRock.getEmployee());

        UserRock savedUser = userRepo.save(userRock1);
        if (userRepo.findById(savedUser.getId()).isPresent())

            return ResponseEntity.ok().body("User created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the User specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateUser(Long id, UserRock userRock) {

        if (userRepo.findById(id).isPresent()) {

            UserRock userRock1 = userRepo.findById(id).get();
            userRock1.setUser(userRock.getIsUser());
            userRock1.setGroup(userRock.getIsGroup());
            userRock1.setUserName(userRock.getUserName());

            Employee employee = employeeRepo.findById(userRock1.getEmployee().getId()).get();
            employee.setExternal(userRock.getEmployee().isExternal());
            employee.setHrId(userRock.getEmployee().getHrId());
            employee.setIntern(userRock.getEmployee().isIntern());
            employee.setRemoteId(userRock.getEmployee().getRemoteId());

            employeeRepo.save(employee);
            userRock1.setEmployee(employee);

            UserRock savedUser = userRepo.save(userRock1);

            if(userRepo.findById(savedUser.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated User");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified User");

        } else return ResponseEntity.unprocessableEntity().body("The specified User is not found");
    }

}




