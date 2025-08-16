package com.bookhive.bookhive.dto.Book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BookRequestDTO {
    private String title;
    private String author;
    private String genre;
    private String status;
}
