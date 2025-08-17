package com.bookhive.bookhive.service;

import java.util.List;
import java.util.Optional;

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

    //book get
    public List<BookEntity> getAllBooks(){
        return bookRepository.findAll();
    }

    // book get by id
    public BookEntity getBookById(Long bookId) {
        Optional<BookEntity> bookOptional = bookRepository.findById(bookId);
        if (bookOptional.isPresent()) {
            return bookOptional.get();
        } else {
            throw new RuntimeException("Book not found with id: " + bookId);
        }
    }

    //Book add
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

    // book update
    public BookResponseDTO updateBook(BookRequestDTO req, Long bookId) {
        Optional<BookEntity> bookOptional = bookRepository.findById(bookId);
        if(bookOptional.isEmpty()){
            return new BookResponseDTO(null, "Book not found");
        }
        BookEntity book = bookOptional.get();
        book.setTitle(req.getTitle());
        book.setAuthor(req.getAuthor());
        book.setGenre(req.getGenre());
        book.setStatus(req.getStatus());

        bookRepository.save(book);
        return new BookResponseDTO("Book Updated Successfully", null);
    }

    // update only status
    public BookResponseDTO updateBookStatus(BookRequestDTO req, Long bookId) {
        Optional<BookEntity> bookOptional = bookRepository.findById(bookId);
        if(bookOptional.isEmpty()){
            return new BookResponseDTO(null, "Book not found");
        }
        BookEntity book = bookOptional.get();
        book.setStatus(req.getStatus());

        bookRepository.save(book);
        return new BookResponseDTO("Book Status Updated Successfully", null);
    }

    // book delete
    public BookResponseDTO deleteBook(Long bookId) {
        Optional<BookEntity> bookOptional = bookRepository.findById(bookId);
        if(bookOptional.isEmpty()){
            return new BookResponseDTO(null, "Book not found");
        }
        bookRepository.deleteById(bookId);

        return new BookResponseDTO("Book Deleted Successfully", null);
    
    }
    
}
