package com.example.springrelation.model.configData;
import com.example.springrelation.model.role.Language;
import com.example.springrelation.model.role.Tenant;
import com.example.springrelation.model.role.UserRock;
import lombok.*;
import javax.persistence.*;

@Entity
@Data
@Table(name = "Data")
public class DataConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(targetEntity = UserRock.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "User_id", referencedColumnName = "id")
    private UserRock userRock;

    @OneToOne(targetEntity = Tenant.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "Tenant_id", referencedColumnName = "id")
    private Tenant tenant;

    @OneToOne(targetEntity = Language.class,fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "Language_id", referencedColumnName = "id")
    private Language language;
}
