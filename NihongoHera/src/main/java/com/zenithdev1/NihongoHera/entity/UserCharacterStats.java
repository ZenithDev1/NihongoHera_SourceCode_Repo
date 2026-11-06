package com.zenithdev1.NihongoHera.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_character_stats", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "kana_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCharacterStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "kana_id", nullable = false)
    private KanaCharacter kana;

    @Builder.Default
    private Integer correctCount = 0;

    @Builder.Default
    private Integer wrongCount = 0;

    @Builder.Default
    private Integer masteryScore = 0; // 0 to 100 (>= 75 is Dark Green Mastered)

    @Builder.Default
    private LocalDateTime nextReviewAt = LocalDateTime.now();

    private LocalDateTime lastPracticedAt;
}
