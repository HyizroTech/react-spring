package com.example.demo.Repositories;

import com.example.demo.model.profile.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userProfile extends JpaRepository<UserProfile,Long> {
}
