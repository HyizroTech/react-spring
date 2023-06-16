package com.example.demo.Controller;

import com.example.demo.Repositories.ProgrammingRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.model.skills.Programming;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProgrammingController {

    @Autowired
    private ProgrammingRepo programmingRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;


    @GetMapping("/user/{userId}/programmings")
    public ResponseEntity<List<Programming>> getAllProgrammings(@PathVariable(value = "userId") Long userId) {

        UserProfile user = userProfileRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));
        List<Programming> programmings = new ArrayList<Programming>();
        programmings.addAll(user.getProgrammings());

        return new ResponseEntity<>(programmings, HttpStatus.OK);
    }

    @GetMapping("/programming/{id}")
    public ResponseEntity<Programming> getProgramming(@PathVariable(value = "id") Long id) {

        Programming programming = programmingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Programming with id = " + id));
        return new ResponseEntity<>(programming, HttpStatus.OK);
    }

    @PutMapping("/programming/{id}")
    public ResponseEntity<Programming> updateProgramming(@PathVariable (value = "id") Long programmingId,
                                                         @Valid @RequestBody Programming programmingRequest) {

        Programming programming = programmingRepo.findById(programmingId)
                .orElseThrow(() -> new ResourceNotFoundException("ProgrammingId " + programmingId + "not found"));


        programming.setLanguageName(programmingRequest.getLanguageName());

        return new ResponseEntity<>(programmingRepo.save(programming), HttpStatus.OK);
    }

    @DeleteMapping("/programming/{id}")
    public ResponseEntity<Object> deleteProgramming(@PathVariable (value = "id") Long id){
        return programmingRepo.findById(id).map(programming -> {
            programmingRepo.delete(programming);
            return ResponseEntity.ok().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Programming id" + id + "not found"));

    }


}
