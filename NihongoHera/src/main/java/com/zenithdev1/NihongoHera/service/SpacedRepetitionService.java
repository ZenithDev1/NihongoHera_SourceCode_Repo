package com.zenithdev1.NihongoHera.service;

import com.zenithdev1.NihongoHera.entity.KanaCharacter;
import com.zenithdev1.NihongoHera.entity.User;
import com.zenithdev1.NihongoHera.entity.UserCharacterStats;
import com.zenithdev1.NihongoHera.repositories.KanaCharacterRepository;
import com.zenithdev1.NihongoHera.repositories.UserCharacterStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpacedRepetitionService {

    private final KanaCharacterRepository kanaRepository;
    private final UserCharacterStatsRepository statsRepository;

    /**
     * Core 70/30 Spaced Repetition Deck Builder:
     * - 70% of session cards come from Weak / Frequently Missed / Unseen characters (masteryScore < 75)
     * - 30% of session cards come from Mastered characters (masteryScore >= 75) for active maintenance
     */
    public List<KanaCharacter> generateDailySrsDeck(Long userId, int deckSize) {
        List<KanaCharacter> allKana = kanaRepository.findAll();
        Map<Long, UserCharacterStats> statsByKanaId = statsRepository.findByUserId(userId).stream()
                .collect(Collectors.toMap(s -> s.getKana().getId(), s -> s));

        List<KanaCharacter> weakOrUnseenPool = new ArrayList<>();
        List<KanaCharacter> masteredPool = new ArrayList<>();

        for (KanaCharacter kana : allKana) {
            UserCharacterStats stat = statsByKanaId.get(kana.getId());
            if (stat == null || stat.getMasteryScore() < 75 || stat.getWrongCount() > stat.getCorrectCount()) {
                weakOrUnseenPool.add(kana);
            } else {
                masteredPool.add(kana);
            }
        }

        // Sort weak pool so the highest error rate characters appear first
        weakOrUnseenPool.sort((a, b) -> {
            UserCharacterStats sa = statsByKanaId.get(a.getId());
            UserCharacterStats sb = statsByKanaId.get(b.getId());
            int scoreA = sa == null ? 25 : sa.getMasteryScore() - (sa.getWrongCount() * 10);
            int scoreB = sb == null ? 25 : sb.getMasteryScore() - (sb.getWrongCount() * 10);
            return Integer.compare(scoreA, scoreB);
        });

        Collections.shuffle(masteredPool);

        int targetWeakCount = (int) Math.round(deckSize * 0.70);
        int targetMasteredCount = deckSize - targetWeakCount;

        List<KanaCharacter> sessionDeck = new ArrayList<>();

        for (int i = 0; i < Math.min(targetWeakCount, weakOrUnseenPool.size()); i++) {
            sessionDeck.add(weakOrUnseenPool.get(i));
        }
        for (int i = 0; i < Math.min(targetMasteredCount, masteredPool.size()); i++) {
            sessionDeck.add(masteredPool.get(i));
        }

        // Backfill if either bucket had fewer items than requested
        for (KanaCharacter kana : allKana) {
            if (sessionDeck.size() >= deckSize) break;
            if (!sessionDeck.contains(kana)) {
                sessionDeck.add(kana);
            }
        }

        Collections.shuffle(sessionDeck);
        return sessionDeck;
    }

    @Transactional
    public void recordAttempt(User user, KanaCharacter kana, boolean correct, long responseTimeMs) {
        UserCharacterStats stats = statsRepository.findByUserIdAndKanaId(user.getId(), kana.getId())
                .orElseGet(() -> UserCharacterStats.builder()
                        .user(user)
                        .kana(kana)
                        .correctCount(0)
                        .wrongCount(0)
                        .masteryScore(30)
                        .build());

        if (correct) {
            stats.setCorrectCount(stats.getCorrectCount() + 1);
            // Fast responses (< 1800ms) earn a higher mastery boost
            int speedBonus = responseTimeMs < 1800 ? 18 : 12;
            stats.setMasteryScore(Math.min(100, stats.getMasteryScore() + speedBonus));
            int hoursUntilNext = stats.getMasteryScore() >= 80 ? 48 : 12;
            stats.setNextReviewAt(LocalDateTime.now().plusHours(hoursUntilNext));
        } else {
            stats.setWrongCount(stats.getWrongCount() + 1);
            stats.setMasteryScore(Math.max(0, stats.getMasteryScore() - 25));
            stats.setNextReviewAt(LocalDateTime.now().plusMinutes(15));
        }

        stats.setLastPracticedAt(LocalDateTime.now());
        statsRepository.save(stats);
    }
}
