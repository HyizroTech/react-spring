package com.example.springrelation.model.comtracking;
import com.example.springrelation.model.base.Employee;
import com.example.springrelation.model.timetracking.Project;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Data
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float amount;
    private ZonedDateTime endDate;
    private boolean fixedPrice;
    private String name;
    private ZonedDateTime startDate;

    @ManyToOne(targetEntity = Project.class,fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @JsonIgnore
    private Project project;

    //need to fix implementation
    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name = "Rate_Employees", joinColumns = {@JoinColumn(name = "rate_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "employee_id",referencedColumnName = "id")})
    private Set<Employee> employees;


}

