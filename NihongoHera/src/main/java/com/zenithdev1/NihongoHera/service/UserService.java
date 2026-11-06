package com.zenithdev1.NihongoHera.service;

import com.zenithdev1.NihongoHera.config.JwtService;
import com.zenithdev1.NihongoHera.dto.AuthDtos.*;
import com.zenithdev1.NihongoHera.entity.User;
import com.zenithdev1.NihongoHera.exception.ResourceNotFoundException;
import com.zenithdev1.NihongoHera.exception.UserAlreadyExistsException;
import com.zenithdev1.NihongoHera.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(SignupRequest req) {
        if (userRepository.existsByEmail(req.email().toLowerCase())) {
            throw new UserAlreadyExistsException("An account with this email already exists.");
        }
        if (userRepository.existsByUsername(req.username())) {
            throw new UserAlreadyExistsException("This username is already taken.");
        }

        User user = User.builder()
                .username(req.username().trim())
                .email(req.email().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(req.password()))
                .preferDevanagari(req.preferDevanagari() != null ? req.preferDevanagari() : true)
                .currentStreak(1)
                .maxStreak(1)
                .lastPracticeDate(LocalDate.now())
                .build();

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getEmail(), saved.getId());
        return toAuthResponse(saved, token);
    }

    public AuthResponse login(LoginRequest req) {
        String identifier = req.emailOrUsername().trim();
        User user = userRepository.findByEmail(identifier.toLowerCase())
                .or(() -> userRepository.findByUsername(identifier))
                .orElseThrow(() -> new BadCredentialsException("Invalid username/email or password."));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username/email or password.");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getId());
        return toAuthResponse(user, token);
    }

    @Transactional
    public void resetPassword(ForgotPasswordRequest req) {
        User user = userRepository.findByEmail(req.email().toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("No user registered with email: " + req.email()));
        user.setPasswordHash(passwordEncoder.encode(req.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void updateDailyStreak(User user) {
        LocalDate today = LocalDate.now();
        if (user.getLastPracticeDate() == null) {
            user.setCurrentStreak(1);
            user.setMaxStreak(1);
        } else if (user.getLastPracticeDate().isEqual(today.minusDays(1))) {
            user.setCurrentStreak(user.getCurrentStreak() + 1);
            if (user.getCurrentStreak() > user.getMaxStreak()) {
                user.setMaxStreak(user.getCurrentStreak());
            }
        } else if (user.getLastPracticeDate().isBefore(today.minusDays(1))) {
            user.setCurrentStreak(1);
        }
        user.setLastPracticeDate(today);
        userRepository.save(user);
    }

    private AuthResponse toAuthResponse(User user, String token) {
        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCurrentStreak(),
                user.getMaxStreak(),
                user.getPreferDevanagari()
        );
    }
}
