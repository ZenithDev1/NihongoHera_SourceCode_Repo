package com.zenithdev1.NihongoHera.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 30)
    private String mode; // SRS_DAILY, TYPING_SPEED, DAKUTEN, LOOK_ALIKE

    private Integer totalQuestions;
    private Integer correctAnswers;
    private Long averageResponseMs;

    @Builder.Default
    private LocalDateTime completedAt = LocalDateTime.now();
}
