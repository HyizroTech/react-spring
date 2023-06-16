package com.example.springrelation.model.base;
import com.example.springrelation.model.comtracking.Rate;
import lombok.*;
import javax.persistence.Entity;

@Entity
@Data
public class Employee extends Person{
    private boolean active;
    private boolean external;
    private String hrId;
    private boolean intern;
    private long remoteId;


}