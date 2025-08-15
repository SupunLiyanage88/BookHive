package com.bookhive.bookhive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookhive.bookhive.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
}
