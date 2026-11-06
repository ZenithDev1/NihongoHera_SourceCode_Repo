package com.zenithdev1.NihongoHera.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Builder.Default
    private Integer currentStreak = 0;

    @Builder.Default
    private Integer maxStreak = 0;

    private LocalDate lastPracticeDate;

    @Builder.Default
    private Boolean preferDevanagari = true;

    private String resetToken;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
