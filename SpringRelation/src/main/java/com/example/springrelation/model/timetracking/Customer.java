package com.example.springrelation.model.timetracking;

import com.example.springrelation.model.base.Address;
import com.example.springrelation.model.base.Employee;
import com.example.springrelation.model.base.Person;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long remoteCustomerId;

    @OneToOne(targetEntity = Person.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    @OneToMany(targetEntity = Address.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Set<Address> addresses;

    @OneToMany(targetEntity = Employee.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Set<Employee> employees;
}
