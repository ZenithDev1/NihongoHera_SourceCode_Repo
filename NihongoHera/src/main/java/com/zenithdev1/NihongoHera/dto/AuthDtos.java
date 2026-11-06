package com.zenithdev1.NihongoHera.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {
    public record SignupRequest(
            @NotBlank @Size(min = 3, max = 40) String username,
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6, max = 64) String password,
            Boolean preferDevanagari
    ) {}

    public record LoginRequest(
            @NotBlank String emailOrUsername,
            @NotBlank String password
    ) {}

    public record ForgotPasswordRequest(
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6, max = 64) String newPassword
    ) {}

    public record AuthResponse(
            String token,
            Long userId,
            String username,
            String email,
            Integer currentStreak,
            Integer maxStreak,
            Boolean preferDevanagari
    ) {}
}
