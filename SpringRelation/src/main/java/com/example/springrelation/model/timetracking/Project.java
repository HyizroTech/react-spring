package com.example.springrelation.model.timetracking;

import com.example.springrelation.model.base.Address;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean active;
    private boolean billable;
    private float budget;
    private String contractId;
    private String currency;
    private float discount;
    private Date endDate;
    private boolean finished;
    private boolean fixedPrice;
    private String name;
    private String recruiterId;
    private String remoteContractId;
    private long remoteId;
    private Date startDate;
    private long timeBudget;

    @ManyToOne(targetEntity = Customer.class,fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    @JsonIgnore
    private Customer customer;
}
