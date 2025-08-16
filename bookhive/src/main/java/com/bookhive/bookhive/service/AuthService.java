package com.bookhive.bookhive.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookhive.bookhive.dto.user.LoginRequestDTO;
import com.bookhive.bookhive.dto.user.LoginResponseDTO;
import com.bookhive.bookhive.dto.user.RegisterRequestDTO;
import com.bookhive.bookhive.dto.user.RegisterResponseDTO;
import com.bookhive.bookhive.entity.UserEntity;
import com.bookhive.bookhive.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public List<UserEntity> getAllUsers(String userToken) {

        return userRepository.findAll();
    }

    // Create User
    public UserEntity createUser(RegisterRequestDTO userData) {
        UserEntity newUser = new UserEntity();
        newUser.setUsername(userData.getUsername());
        newUser.setEmail(userData.getEmail());
        newUser.setPassword(passwordEncoder.encode(userData.getPassword()));

        return userRepository.save(newUser);
    }

    // Register User
    public RegisterResponseDTO register(RegisterRequestDTO req) {
        if (isUserEnable(req.getUsername()))
            return new RegisterResponseDTO(null, "Username already exists");

        if (isUserEnableByEmail(req.getEmail()))
            return new RegisterResponseDTO(null, "Email already exists");

        var userData = this.createUser(req);
        if (userData.getId() == null)
            return new RegisterResponseDTO(null, "Error creating user");

        return new RegisterResponseDTO(String.format("User registered at %s", userData.getId()), null);

    }

    // Support function for Register
    private Boolean isUserEnable(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    private boolean isUserEnableByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Login
    public LoginResponseDTO login(LoginRequestDTO loginData) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.getUsername(),
                            loginData.getPassword()));
        } catch (Exception e) {
            return new LoginResponseDTO(
                    null,
                    LocalDateTime.now(),
                    "User not found",
                    "Token not generated");
        }

        var userOptonal = userRepository.findByUsername(loginData.getUsername());
        UserEntity user = userOptonal.get();

        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("email", user.getEmail());

        String token = jwtService.getJWTToken(loginData.getUsername(), claims);

        return new LoginResponseDTO(token, LocalDateTime.now(), null, "Token generated successfully");

    }

    // User response DTO
    public UserEntity getAuthUserDetails(String token) {
        String username = jwtService.getUsername(token);
        Optional<UserEntity> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return null;
        }
        UserEntity user = userOptional.get();
        return user;
    }

}
