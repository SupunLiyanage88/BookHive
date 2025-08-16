package com.bookhive.bookhive.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Getter
@Setter
@Table(name = "rentals")
public class RentalEntity {

    private Long rentalId;
    private Long bookId;
    private String username;
    private String rentalDate;
    private String returnDate;
}
