package com.bookhive.bookhive.dto.rental;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class RentalRequestDTO {
    private Long bookId;
    private String username;
    private String rentalDate;
    private String returnDate;
    
}
