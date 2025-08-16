package com.bookhive.bookhive.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class RegisterResponseDTO {
    private String message;
    private String error;
}
