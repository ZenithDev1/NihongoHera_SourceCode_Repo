package com.zenithdev1.NihongoHera.dto;

import java.util.List;

public class QuizDtos {
    public record AttemptItem(
            String characterSymbol,
            boolean correct,
            long responseTimeMs
    ) {}

    public record QuizSubmissionRequest(
            String mode,
            List<AttemptItem> attempts
    ) {}

    public record CharacterStatDto(
            Long kanaId,
            String characterSymbol,
            String romaji,
            String scriptType,
            String rowGroup,
            String variationType,
            String devanagariHint,
            String mnemonicWord,
            int correctCount,
            int wrongCount,
            int masteryScore,
            String statusBucket // MASTERED, LEARNING, WEAK, UNSEEN
    ) {}

    public record DashboardSummaryDto(
            int currentStreak,
            int maxStreak,
            int totalMasteredCount,
            int totalWeakCount,
            List<CharacterStatDto> heatmapStats
    ) {}
}