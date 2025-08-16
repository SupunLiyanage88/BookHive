package com.bookhive.bookhive.service;

import org.springframework.stereotype.Service;

import com.bookhive.bookhive.dto.Book.BookRequestDTO;
import com.bookhive.bookhive.dto.Book.BookResponseDTO;
import com.bookhive.bookhive.entity.BookEntity;
import com.bookhive.bookhive.repository.BookReopository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService {

    private final BookReopository bookRepository;

    public BookResponseDTO addBook(BookRequestDTO req) {

        BookEntity book = new BookEntity();
        book.setTitle(req.getTitle());
        book.setAuthor(req.getAuthor());
        book.setGenre(req.getGenre());
        book.setStatus(req.getStatus());

        BookEntity savedBook = bookRepository.save(book);

        if (savedBook.getBookId() == null) {
            return new BookResponseDTO(null, "Failed to add book");
        }
        return new BookResponseDTO("Book Added Successfully", null);
        
    }
    
}
