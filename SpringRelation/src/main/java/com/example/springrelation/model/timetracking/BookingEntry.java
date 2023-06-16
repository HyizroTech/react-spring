package com.example.springrelation.model.timetracking;

import com.example.springrelation.model.base.Employee;
import com.example.springrelation.model.comtracking.Rate;
import lombok.*;
import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Data
public class BookingEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float altRate;
    private boolean approved;
    private boolean billable;
    private boolean billed;
    private ZonedDateTime billingDate;
    private ZonedDateTime created;
    private long duration;
    private ZonedDateTime endDate;
    private ZonedDateTime incomingPayment;
    private ZonedDateTime lastChange;
    private ZonedDateTime lastWTChange;
    private boolean locked;
    private ZonedDateTime lockingDate;
    private String remoteId;
    private ZonedDateTime startDate;

    @OneToOne(targetEntity = Project.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @OneToOne(targetEntity = Rate.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "rate_id", referencedColumnName = "id")
    private Rate rate;

    @OneToOne(targetEntity = ProjectRole.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "projectRole_id", referencedColumnName = "id")
    private ProjectRole projectRole;

    @OneToMany(targetEntity = Employee.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "BookingEntry_id", referencedColumnName = "id")
    private Set<Employee> employees;
}

