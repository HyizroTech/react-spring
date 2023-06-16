package com.example.springrelation.Controllers;

import com.example.springrelation.Services.UserRockService;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.role.UserRock;
import com.example.springrelation.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserRockController {

    @Autowired
    private UserRockService userRockService;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/user/create")
    public ResponseEntity<Object> createUser(@RequestBody UserRock userRock) {

        return userRockService.createUser(userRock);

    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {

        return userRepo.findById(id).map(userRock -> {
            userRepo.delete(userRock);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("User id" + id + "not found"));

    }

    @GetMapping("/user/get/{id}")
    public UserRock getUser(@PathVariable Long id) {

        if(userRepo.findById(id).isPresent())

            return userRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/user/get")
    public List<UserRock> getUsers() {

        return userRepo.findAll();

    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody UserRock userRock) {

        return userRockService.updateUser(id, userRock);

    }

}
