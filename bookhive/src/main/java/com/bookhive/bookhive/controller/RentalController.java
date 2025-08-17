package com.bookhive.bookhive.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookhive.bookhive.dto.rental.RentalRequestDTO;
import com.bookhive.bookhive.dto.rental.RentalResponseDTO;
import com.bookhive.bookhive.entity.RentalEntity;
import com.bookhive.bookhive.service.RentalService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/rentals")
@AllArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    // Get all rented books
    @GetMapping("/all")
    public ResponseEntity<List<RentalEntity>> getAllRentals() {
        List<RentalEntity> rentals = rentalService.getAllRentBooks();
        return ResponseEntity.ok(rentals);
    }

    // Get rented book by ID
    @GetMapping("/{id}")
    public ResponseEntity<RentalEntity> getRentalById(@PathVariable("id") Long id) {
        RentalEntity rental = rentalService.getRentBookById(id);
        return ResponseEntity.ok(rental);
    }

    // Add a new rental
    @PostMapping("/add")
    public ResponseEntity<RentalResponseDTO> addRental(@RequestBody RentalRequestDTO request) {
        RentalResponseDTO response = rentalService.addRental(request);
        return ResponseEntity.ok(response);
    }

    // Update an existing rental
    @PutMapping("/update/{id}")
    public ResponseEntity<RentalResponseDTO> updateRental(
            @PathVariable("id") Long id,
            @RequestBody RentalRequestDTO request) {
        RentalResponseDTO response = rentalService.updateRental(request, id);
        return ResponseEntity.ok(response);
    }

}
