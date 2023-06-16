package com.example.demo.model.projects;

import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startDate;
    private String endDate;
    private String projectTitle;
    private String projectPosition;
    private String technologies;

    @OneToMany(targetEntity = Description.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private List<Description> descriptions;

}
