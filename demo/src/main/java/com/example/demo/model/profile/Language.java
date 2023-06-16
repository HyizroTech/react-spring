package com.example.demo.model.profile;
import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String language;
    private String proficiency;


}
