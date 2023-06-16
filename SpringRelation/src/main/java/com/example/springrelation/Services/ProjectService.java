package com.example.springrelation.Services;
import com.example.springrelation.model.timetracking.Project;
import com.example.springrelation.Repositories.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Transactional
    public ResponseEntity<Object> createProject(Project project) {

        Project project1 = new Project();
        project1.setActive(project.isActive());
        project1.setBillable(project.isBillable());
        project1.setBudget(project.getBudget());
        project1.setContractId(project.getContractId());
        project1.setCurrency(project.getCurrency());
        project1.setDiscount(project.getDiscount());
        project1.setEndDate(project.getEndDate());
        project1.setFinished(project.isFinished());
        project1.setFixedPrice(project.isFixedPrice());
        project1.setName(project.getName());
        project1.setRecruiterId(project.getRecruiterId());
        project1.setRemoteContractId(project.getRemoteContractId());
        project1.setRemoteId(project.getRemoteId());
        project1.setStartDate(project.getStartDate());
        project1.setTimeBudget(project.getTimeBudget());
        project1.setCustomers(project.getCustomers());

        Project savedProject = projectRepo.save(project1);

        if (projectRepo.findById(savedProject.getId()).isPresent())

            return ResponseEntity.ok().body("Project created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the Project specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateProject(Long id, Project project) {

        if (projectRepo.findById(id).isPresent()) {

            Project project1 = projectRepo.findById(id).get();
            project1.setActive(project.isActive());
            project1.setBillable(project.isBillable());
            project1.setBudget(project.getBudget());
            project1.setContractId(project.getContractId());
            project1.setCurrency(project.getCurrency());
            project1.setDiscount(project.getDiscount());
            project1.setEndDate(project.getEndDate());
            project1.setFinished(project.isFinished());
            project1.setFixedPrice(project.isFixedPrice());
            project1.setName(project.getName());
            project1.setRecruiterId(project.getRecruiterId());
            project1.setRemoteContractId(project.getRemoteContractId());
            project1.setRemoteId(project.getRemoteId());
            project1.setStartDate(project.getStartDate());
            project1.setTimeBudget(project.getTimeBudget());

            Project savedProject = projectRepo.save(project1);

            if(projectRepo.findById(savedProject.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated Project");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified Project");

        } else return ResponseEntity.unprocessableEntity().body("The specified Project is not found");

    }

}