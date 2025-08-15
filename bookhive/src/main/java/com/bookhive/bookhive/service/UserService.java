package com.bookhive.bookhive.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookhive.bookhive.entity.UserEntity;
import com.bookhive.bookhive.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    public UserEntity createUser(UserEntity userEntity){
        return userRepository.save(userEntity);
    }

}
