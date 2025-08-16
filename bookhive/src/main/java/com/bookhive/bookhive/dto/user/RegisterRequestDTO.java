package com.bookhive.bookhive.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String username;
    private String name;
}
