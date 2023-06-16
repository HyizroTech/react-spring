package com.example.springrelation.Services;

import com.example.springrelation.Repositories.GroupRepo;
import com.example.springrelation.model.base.GroupRock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class GroupService {

    @Autowired
    private GroupRepo groupRepo;

    @Transactional
    public ResponseEntity<Object> createGroup(GroupRock groupRock) {

        GroupRock groupRock1 = new GroupRock();
        groupRock1.setUser(groupRock.isUser());
        groupRock1.setName(groupRock.getName());
        groupRock1.setGroups(groupRock.isGroups());

        GroupRock savedGroupRock = groupRepo.save(groupRock1);

        if (groupRepo.findById(savedGroupRock.getId()).isPresent())

            return ResponseEntity.ok().body("Group created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the Group specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateGroup(Long id, GroupRock groupRock) {

        if (groupRepo.findById(id).isPresent()) {

            GroupRock groupRock1 = groupRepo.findById(id).get();
            groupRock1.setUser(groupRock.isUser());
            groupRock1.setName(groupRock.getName());
            groupRock1.setGroups(groupRock.isGroups());

            GroupRock savedGroupRock = groupRepo.save(groupRock1);

            if(groupRepo.findById(savedGroupRock.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated Group");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified Group");

        } else return ResponseEntity.unprocessableEntity().body("The specified Group is not found");

    }
}
