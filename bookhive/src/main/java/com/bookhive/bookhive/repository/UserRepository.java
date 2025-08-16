package com.bookhive.bookhive.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookhive.bookhive.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteByUsername(String username);
}
