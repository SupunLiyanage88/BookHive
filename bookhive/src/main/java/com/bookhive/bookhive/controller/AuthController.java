package com.bookhive.bookhive.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookhive.bookhive.dto.user.LoginRequestDTO;
import com.bookhive.bookhive.dto.user.LoginResponseDTO;
import com.bookhive.bookhive.dto.user.RegisterRequestDTO;
import com.bookhive.bookhive.dto.user.RegisterResponseDTO;
import com.bookhive.bookhive.entity.UserEntity;
import com.bookhive.bookhive.service.AuthService;
import com.bookhive.bookhive.service.JWTService;
import com.bookhive.bookhive.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final JWTService jwtService;

    @GetMapping("/all")
    public List<UserEntity> getAllusers() {
        return userService.getAllUsers();
    }

    // Get All Users
    @GetMapping("/user")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");        
        }
        String jwt_key = authorization.split(" ")[1];
        UserEntity user = authService.getAuthUserDetails(jwt_key);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
        return ResponseEntity.ok(user);
    }

    // Register User
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO req) {

        RegisterResponseDTO res = authService.register(req);
        if (res.getError() != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        return ResponseEntity.status(HttpStatus.OK).body(res);

    }

    //login
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginData, HttpServletResponse response) {
        LoginResponseDTO res = authService.login(loginData);
        if (res.getError()!= null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }



}
