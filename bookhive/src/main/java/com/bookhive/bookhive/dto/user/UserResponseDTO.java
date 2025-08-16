package com.bookhive.bookhive.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserResponseDTO {
    private String email;
    private String username;
    private String name;
    
}
