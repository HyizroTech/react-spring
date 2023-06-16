package com.example.springrelation.Controllers;

import com.example.springrelation.Services.GroupService;

import com.example.springrelation.exceptions.ResourceNotFoundException;


import com.example.springrelation.Repositories.GroupRepo;

import com.example.springrelation.model.base.GroupRock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class GroupController {

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private GroupService groupService;

    @PostMapping("/group/create")
    public ResponseEntity<Object> createGroup(@RequestBody GroupRock groupRock) {

        return groupService.createGroup(groupRock);

    }

    @DeleteMapping("/group/delete/{id}")
    public ResponseEntity<Object> deleteGroup(@PathVariable Long id) {

        return groupRepo.findById(id).map(groupRock -> {
            groupRepo.delete(groupRock);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("Group id" + id + "not found"));

    }

    @GetMapping("/group/get/{id}")
    public GroupRock getGroup(@PathVariable Long id) {

        if(groupRepo.findById(id).isPresent())

            return groupRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/group/get")
    public List<GroupRock> getGroups() {

        return groupRepo.findAll();

    }

    @PutMapping("/group/update/{id}")
    public ResponseEntity<Object> updateGroup(@PathVariable Long id, @RequestBody GroupRock groupRock) {

        return groupService.updateGroup(id, groupRock);

    }
}

