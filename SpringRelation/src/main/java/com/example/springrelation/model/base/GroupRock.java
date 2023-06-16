package com.example.springrelation.model.base;
import lombok.*;
import javax.persistence.*;

@Entity
@Data
public class GroupRock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean groups;
    private String name;
    private boolean user;
}
