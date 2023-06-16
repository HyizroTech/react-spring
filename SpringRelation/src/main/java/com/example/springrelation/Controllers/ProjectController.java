package com.example.springrelation.Controllers;

import com.example.springrelation.Repositories.BookingEntryRepo;
import com.example.springrelation.Repositories.CustomerRepo;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.timetracking.Project;
import com.example.springrelation.Repositories.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ProjectRepo projectRepo;



    @PostMapping("/customer/{customerId}/project")
    public Project createProject(@PathVariable (value = "customerId") Long customerId,
                           @Valid @RequestBody Project project) {
        return customerRepo.findById(customerId).map(customer -> {
            project.setCustomer(customer);

            return projectRepo.save(project);
        }).orElseThrow(() -> new ResourceNotFoundException("CustomerId " + customerId + " not found"));
    }


    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<Object> deleteProject(@PathVariable(value = "projectId") Long projectId) {

        return projectRepo.findById(projectId).map(project -> {
            projectRepo.delete(project);
            return ResponseEntity.ok().build();

        }).orElseThrow(() -> new ResourceNotFoundException("Project id" + projectId + "not found"));
    }

    @GetMapping("/customer/{customerId}/projects")
    public List<Project> getAllProjects(@PathVariable (value = "customerId") Long customerId
    ) {
        return projectRepo.findAllByCustomerId(customerId);
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<Project> getProject(@PathVariable(value = "id") Long id) {
        Project project = projectRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Project with id = " + id));
        return new ResponseEntity<>(project, HttpStatus.OK);
    }


    @PutMapping("/project/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable (value = "projectId") Long projectId,
                           @Valid @RequestBody Project projectRequest) {

        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectId " + projectId + "not found"));

        project.setActive(projectRequest.isActive());
        project.setBillable(projectRequest.isBillable());
        project.setBudget(projectRequest.getBudget());
        project.setContractId(projectRequest.getContractId());
        project.setCurrency(projectRequest.getCurrency());
        project.setDiscount(projectRequest.getDiscount());
        project.setEndDate(projectRequest.getEndDate());
        project.setFinished(projectRequest.isFinished());
        project.setFixedPrice(projectRequest.isFixedPrice());
        project.setName(projectRequest.getName());
        project.setRecruiterId(projectRequest.getRecruiterId());
        project.setRemoteContractId(projectRequest.getRemoteContractId());
        project.setRemoteId(projectRequest.getRemoteId());
        project.setStartDate(projectRequest.getStartDate());
        project.setTimeBudget(projectRequest.getTimeBudget());

        return new ResponseEntity<>(projectRepo.save(project), HttpStatus.OK);
    }

}
