package com.example.demo.model.skills;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;


}
