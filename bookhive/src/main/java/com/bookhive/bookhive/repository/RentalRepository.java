package com.bookhive.bookhive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookhive.bookhive.entity.RentalEntity;

public interface RentalRepository extends JpaRepository<RentalEntity, Long> {
    
}
