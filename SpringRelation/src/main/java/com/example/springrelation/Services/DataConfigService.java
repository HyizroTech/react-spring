package com.example.springrelation.Services;



import com.example.springrelation.model.configData.DataConfig;
import com.example.springrelation.model.role.Language;
import com.example.springrelation.model.role.Tenant;
import com.example.springrelation.model.role.UserRock;
import com.example.springrelation.Repositories.DataConfigRepo;
import com.example.springrelation.Repositories.LanguageRepo;
import com.example.springrelation.Repositories.TenantRepo;
import com.example.springrelation.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class DataConfigService {

    @Autowired
    private DataConfigRepo dataConfigRepo;

    @Autowired
    private LanguageRepo languageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TenantRepo tenantRepo;

    @Transactional
    public ResponseEntity<Object> createDataConfig(DataConfig dataConfig) {

        DataConfig dataConfig1 = new DataConfig();
        dataConfig1.setLanguage(dataConfig.getLanguage());
        dataConfig1.setTenant(dataConfig.getTenant());
        dataConfig1.setUserRock(dataConfig.getUserRock());

        DataConfig savedDataConfig = dataConfigRepo.save(dataConfig1);

        if (dataConfigRepo.findById(savedDataConfig.getId()).isPresent())

            return ResponseEntity.ok().body("ConfigData created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the ConfigData specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateDataConfig(Long id, DataConfig dataConfig) {

        if (dataConfigRepo.findById(id).isPresent()) {

            DataConfig dataConfig1 = dataConfigRepo.findById(id).get();

            Language language = languageRepo.findById(dataConfig1.getLanguage().getId()).get();
            language.setIso(dataConfig.getLanguage().getIso());
            language.setLabel(dataConfig.getLanguage().getLabel());
            languageRepo.save(language);
            dataConfig1.setLanguage(language);

            Tenant tenant = tenantRepo.findById(dataConfig1.getTenant().getId()).get();
            tenant.setCompanyName(dataConfig.getTenant().getCompanyName());
            tenant.setLogoRef(dataConfig.getTenant().getLogoRef());
            tenantRepo.save(tenant);
            dataConfig1.setTenant(tenant);

            UserRock userRock = userRepo.findById(dataConfig1.getUserRock().getId()).get();
            userRock.setUser(dataConfig.getUserRock().getIsUser());
            userRock.setUserName(dataConfig.getUserRock().getUserName());
            userRock.setGroup(dataConfig.getUserRock().getIsGroup());
            userRepo.save(userRock);
            dataConfig1.setUserRock(userRock);

            DataConfig savedDataConfig = dataConfigRepo.save(dataConfig1);

            if(dataConfigRepo.findById(savedDataConfig.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated ConfigData");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified ConfigData");

        } else return ResponseEntity.unprocessableEntity().body("The specified ConfigData is not found");
    }
}
