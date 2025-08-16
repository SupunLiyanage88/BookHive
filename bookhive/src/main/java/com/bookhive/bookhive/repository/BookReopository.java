package com.bookhive.bookhive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookhive.bookhive.entity.BookEntity;

public interface BookReopository extends JpaRepository<BookEntity, Long> {
    
}
