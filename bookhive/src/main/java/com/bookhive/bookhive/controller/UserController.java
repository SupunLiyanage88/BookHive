package com.bookhive.bookhive.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookhive.bookhive.entity.UserEntity;
import com.bookhive.bookhive.service.UserService;

import lombok.AllArgsConstructor;

import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    
    private final UserService userService;

    @GetMapping
    public List<UserEntity> getAllusers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserEntity createUser(@RequestBody UserEntity userEntity){
        return userService.createUser(userEntity);
    }
    
    

}
