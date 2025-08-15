package com.bookhive.bookhive.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long Id;

    private String name;
    private String email;

    // public UserEntity(String name, String email){
    //     this.name = name;
    //     this.email = email;
    // }
    
}
