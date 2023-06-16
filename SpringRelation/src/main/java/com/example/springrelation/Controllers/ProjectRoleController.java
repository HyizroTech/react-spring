package com.example.springrelation.Controllers;

import com.example.springrelation.Repositories.ProjectRoleRepo;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.timetracking.ProjectRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProjectRoleController {

    @Autowired
    private ProjectRoleRepo projectRoleRepo;

    @PutMapping("/projectRole/{id}")
    public ResponseEntity<ProjectRole> updateProjectRole(@PathVariable("id") Long id,
                                                         @RequestBody ProjectRole projectRoleRequest) {

        ProjectRole projectRole=projectRoleRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectRoleId " + id + "not found"));

        projectRole.setRemoteId(projectRoleRequest.getRemoteId());
        projectRole.setName(projectRoleRequest.getName());
        projectRole.setDescription(projectRoleRequest.getDescription());
        return new ResponseEntity<>(projectRoleRepo.save(projectRole), HttpStatus.OK);
    }

    @DeleteMapping("/projectRole/{id}")
    public ResponseEntity<Object> deleteProjectRole(@PathVariable Long id) {

        return projectRoleRepo.findById(id).map(projectRole -> {
            projectRoleRepo.delete(projectRole);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("ProjectRole id" + id + "not found"));
    }

    @GetMapping("/projectRole/{id}")
    public ProjectRole getProjectRole(@PathVariable Long id) {

        if(projectRoleRepo.findById(id).isPresent())

            return projectRoleRepo.findById(id).get();

        else return null;

    }
}
