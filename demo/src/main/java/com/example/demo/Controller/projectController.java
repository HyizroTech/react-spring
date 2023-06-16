package com.example.demo.Controller;

import com.example.demo.Repositories.ProjectRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.model.projects.Project;
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
public class ProjectController {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;


    @GetMapping("/user/{userId}/projects")
    public ResponseEntity<List<Project>> getAllProjects(@PathVariable(value = "userId") Long userId) {

        UserProfile user = userProfileRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));
        List<Project> projects = new ArrayList<>();
        projects.addAll(user.getProjects());

        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<Project> getProject(@PathVariable(value = "id") Long id) {

        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Project with id = " + id));
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PutMapping("/project/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable (value = "id") Long projectId, @Valid @RequestBody Project projectRequest) {

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectId " + projectId + "not found"));

        project.setProjectTitle(projectRequest.getProjectTitle());
        project.setEndDate(projectRequest.getEndDate());
        project.setStartDate(projectRequest.getStartDate());
        project.setTechnologies(projectRequest.getTechnologies());
        project.setProjectPosition(projectRequest.getProjectPosition());

        return new ResponseEntity<>(projectRepo.save(project), HttpStatus.OK);
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<Object> deleteProject(@PathVariable (value = "id") Long id){
        return projectRepo.findById(id).map(project -> {
            projectRepo.delete(project);
            return ResponseEntity.ok().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Project id" + id + "not found"));

    }


}
