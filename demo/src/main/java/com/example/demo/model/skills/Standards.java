package com.example.demo.model.skills;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class Standards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String standard;

 ;
}
