package com.example.springrelation.model.role;

import com.example.springrelation.model.base.Employee;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Table(name = "userRock")
public class UserRock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isGroup;
    private boolean isUser;
    private String userName;

    @OneToOne(targetEntity = Employee.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private Employee employee;


    @JsonProperty("isGroup")
    public boolean getIsGroup(){
        return this.isGroup;
    }

    @JsonProperty("isUser")
    public boolean getIsUser(){
        return this.isUser;
    }
}

