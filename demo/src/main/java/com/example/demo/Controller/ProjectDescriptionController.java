package com.example.demo.Controller;

import com.example.demo.Repositories.DescriptionRepo;
import com.example.demo.Repositories.ProjectRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.projects.Description;
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
public class ProjectDescriptionController {

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private DescriptionRepo descriptionRepo;

    @GetMapping("/project/{projectId}/descriptions")
    public ResponseEntity<List<Description>> getAllDescriptions(@PathVariable(value = "projectId") Long projectId) {

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Project with id = " + projectId));
        List<Description> descriptions = new ArrayList<Description>();
        descriptions.addAll(project.getDescriptions());

        return new ResponseEntity<>(descriptions, HttpStatus.OK);
    }

    @GetMapping("/description/{id}")
    public ResponseEntity<Description> getDescription(@PathVariable(value = "id") Long id) {

        Description description = descriptionRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Description with id = " + id));
        return new ResponseEntity<>(description, HttpStatus.OK);
    }

    @PutMapping("/description/{id}")
    public ResponseEntity<Description> updateDescription(@PathVariable (value = "id") Long descriptionId, @Valid @RequestBody Description descriptionRequest) {

        Description description = descriptionRepo.findById(descriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("DescriptionId " + descriptionId + "not found"));

        description.setProjectDescription(descriptionRequest.getProjectDescription());


        return new ResponseEntity<>(descriptionRepo.save(description), HttpStatus.OK);
    }

    @DeleteMapping("/description/{id}")
    public ResponseEntity<Object> deleteDescription(@PathVariable (value = "id") Long id){
        return descriptionRepo.findById(id).map(description -> {
            descriptionRepo.delete(description);
            return ResponseEntity.ok().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Description id" + id + "not found"));

    }


}
