
package com.studenttaskmanager.backend.controller;

import com.studenttaskmanager.backend.model.User;
import com.studenttaskmanager.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return Map.of("message", "Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return Map.of("message", "Registration successful");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User loginUser) {

        Optional<User> userOptional =
                userRepository.findByEmail(loginUser.getEmail());

        if (userOptional.isEmpty()) {
            return Map.of("message", "Invalid email or password");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(
                loginUser.getPassword(), user.getPassword())) {
            return Map.of("message", "Invalid email or password");
        }

        return Map.of("message", "Login successful");
    }
}
