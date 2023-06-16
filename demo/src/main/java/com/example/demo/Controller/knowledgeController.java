package com.example.demo.Controller;

import com.example.demo.Repositories.KnowledgeRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.model.skills.Knowledge;
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
public class KnowledgeController {

    @Autowired
    private KnowledgeRepo knowledgeRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;


    @GetMapping("/user/{userId}/knowledges")
    public ResponseEntity<List<Knowledge>> getAllKnowledges(@PathVariable(value = "userId") Long userId) {

        UserProfile user = userProfileRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));
        List<Knowledge> knowledges = new ArrayList<Knowledge>();
        knowledges.addAll(user.getKnowledges());

        return new ResponseEntity<>(knowledges, HttpStatus.OK);
    }

    @GetMapping("/knowledge/{id}")
    public ResponseEntity<Knowledge> getKnowledge(@PathVariable(value = "id") Long id) {

        Knowledge knowledge = knowledgeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Knowledge with id = " + id));
        return new ResponseEntity<>(knowledge, HttpStatus.OK);
    }

    @PutMapping("/knowledge/{id}")
    public ResponseEntity<Knowledge> updateKnowledge(@PathVariable (value = "id") Long knowledgeId,
                                                     @Valid @RequestBody Knowledge knowledgeRequest) {

        Knowledge knowledge = knowledgeRepo.findById(knowledgeId)
                .orElseThrow(() -> new ResourceNotFoundException("KnowledgeId " + knowledgeId + "not found"));

        knowledge.setKnowledge(knowledgeRequest.getKnowledge());

        return new ResponseEntity<>(knowledgeRepo.save(knowledge), HttpStatus.OK);
    }

    @DeleteMapping("/knowledge/{id}")
    public ResponseEntity<Object> deleteKnowledge(@PathVariable (value = "id") Long id){
      return knowledgeRepo.findById(id).map(knowledge -> {
          knowledgeRepo.delete(knowledge);
          return ResponseEntity.ok().build();
      }).orElseThrow(()-> new ResourceNotFoundException("Knowledge id" + id + "not found"));

    }

}
