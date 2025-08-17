package com.bookhive.bookhive.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookhive.bookhive.dto.rental.RentalRequestDTO;
import com.bookhive.bookhive.dto.rental.RentalResponseDTO;
import com.bookhive.bookhive.entity.RentalEntity;
import com.bookhive.bookhive.repository.RentalRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RentalService {
    private final RentalRepository rentalRepository;

    // Method to get all rented books
    public List<RentalEntity> getAllRentBooks(){
        return rentalRepository.findAll();
    }

    //Method to get rented book by id
    public RentalEntity getRentBookById(Long rentalId) {
        Optional<RentalEntity> rentOptional = rentalRepository.findById(rentalId);
        if (rentOptional.isPresent()) {
            return rentOptional.get();
        } else {
            throw new RuntimeException("Rented book not found with id: " + rentalId);
        }
    }

    // Method to add a new rental
    public RentalResponseDTO addRental(RentalRequestDTO req){

        RentalEntity rental = new RentalEntity();
        rental.setBookId(req.getBookId());
        rental.setUsername(req.getUsername());
        rental.setRentalDate(req.getRentalDate());
        rental.setReturnDate(req.getReturnDate());

        RentalEntity savedRental = rentalRepository.save(rental);

        if (savedRental.getRentalId() == null) {
            return new RentalResponseDTO(null, "Failed to add rental");
        }
        return new RentalResponseDTO("Rental Added Successfully", null);
    }

    // Method to update an existing rental
    public RentalResponseDTO updateRental(RentalRequestDTO req, Long rentId){
        Optional<RentalEntity> rentOptional = rentalRepository.findById(rentId);
        if (rentOptional.isEmpty()) {
            return new RentalResponseDTO(null, "Rental not found");
        }
        RentalEntity rental = rentOptional.get();
        rental.setBookId(req.getBookId());
        rental.setUsername(req.getUsername());
        rental.setRentalDate(req.getRentalDate());
        rental.setReturnDate(req.getReturnDate());

        rentalRepository.save(rental);
        return new RentalResponseDTO("Rental Updated Successfully", null);
    }

    
}
