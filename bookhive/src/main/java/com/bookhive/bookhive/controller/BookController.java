package com.bookhive.bookhive.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookhive.bookhive.dto.Book.BookRequestDTO;
import com.bookhive.bookhive.dto.Book.BookResponseDTO;
import com.bookhive.bookhive.entity.BookEntity;
import com.bookhive.bookhive.service.BookService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    // Endpoint to get all books
    @GetMapping("/all")
    public List<BookEntity> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Endpoint to get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookEntity> getBookById(@PathVariable("id") Long bookId) {
        try {
            BookEntity book = bookService.getBookById(bookId);
            return ResponseEntity.ok(book);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to add a new book
    @PostMapping("/add")
    public ResponseEntity<BookResponseDTO> addBook(@RequestBody BookRequestDTO bookRequestDTO) {
        BookResponseDTO response = bookService.addBook(bookRequestDTO);
        
        if (response.getError() != null) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    // Endpoint to update an existing book
     @PutMapping("/{id}")
    public ResponseEntity<BookResponseDTO> updateBook(
            @PathVariable("id") Long bookId,
            @RequestBody BookRequestDTO bookRequest) {

        BookResponseDTO response = bookService.updateBook(bookRequest, bookId);

        if (response.getError() != null) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    // Endpoint to delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<BookResponseDTO> deleteBook(@PathVariable("id") Long bookId) {
        BookResponseDTO response = bookService.deleteBook(bookId);

        if (response.getError() != null) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
    
}
