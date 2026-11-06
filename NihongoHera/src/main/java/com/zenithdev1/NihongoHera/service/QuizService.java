package com.zenithdev1.NihongoHera.service;

import com.zenithdev1.NihongoHera.dto.QuizDtos.*;
import com.zenithdev1.NihongoHera.entity.KanaCharacter;
import com.zenithdev1.NihongoHera.entity.QuizSession;
import com.zenithdev1.NihongoHera.entity.User;
import com.zenithdev1.NihongoHera.entity.UserCharacterStats;
import com.zenithdev1.NihongoHera.repositories.KanaCharacterRepository;
import com.zenithdev1.NihongoHera.repositories.QuizSessionRepository;
import com.zenithdev1.NihongoHera.repositories.UserCharacterStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final KanaCharacterRepository kanaRepository;
    private final UserCharacterStatsRepository statsRepository;
    private final QuizSessionRepository quizSessionRepository;
    private final SpacedRepetitionService srsService;
    private final UserService userService;

    @Transactional
    public DashboardSummaryDto submitQuizAndSync(User user, QuizSubmissionRequest request) {
        int correctTotal = 0;
        long totalMs = 0;

        for (AttemptItem item : request.attempts()) {
            if (item.correct()) correctTotal++;
            totalMs += item.responseTimeMs();

            kanaRepository.findByCharacterSymbol(item.characterSymbol())
                    .ifPresent(kana -> srsService.recordAttempt(user, kana, item.correct(), item.responseTimeMs()));
        }

        long avgMs = request.attempts().isEmpty() ? 0 : totalMs / request.attempts().size();

        QuizSession session = QuizSession.builder()
                .user(user)
                .mode(request.mode() != null ? request.mode() : "SRS_DAILY")
                .totalQuestions(request.attempts().size())
                .correctAnswers(correctTotal)
                .averageResponseMs(avgMs)
                .build();
        quizSessionRepository.save(session);

        userService.updateDailyStreak(user);
        return getDashboardSummary(user);
    }

    public DashboardSummaryDto getDashboardSummary(User user) {
        List<KanaCharacter> allKana = kanaRepository.findAll();
        Map<Long, UserCharacterStats> userStats = statsRepository.findByUserId(user.getId()).stream()
                .collect(Collectors.toMap(s -> s.getKana().getId(), s -> s));

        int masteredCount = 0;
        int weakCount = 0;

        List<CharacterStatDto> heatmap = new java.util.ArrayList<>();
        for (KanaCharacter kana : allKana) {
            UserCharacterStats st = userStats.get(kana.getId());
            int score = st != null ? st.getMasteryScore() : 0;
            int correct = st != null ? st.getCorrectCount() : 0;
            int wrong = st != null ? st.getWrongCount() : 0;

            String bucket = "UNSEEN";
            if (st != null) {
                if (score >= 75) {
                    bucket = "MASTERED";
                    masteredCount++;
                } else if (score < 45 || wrong > correct) {
                    bucket = "WEAK";
                    weakCount++;
                } else {
                    bucket = "LEARNING";
                }
            }

            heatmap.add(new CharacterStatDto(
                    kana.getId(),
                    kana.getCharacterSymbol(),
                    kana.getRomaji(),
                    kana.getScriptType(),
                    kana.getRowGroup(),
                    kana.getVariationType(),
                    kana.getDevanagariHint(),
                    kana.getMnemonicWord(),
                    correct,
                    wrong,
                    score,
                    bucket
            ));
        }

        return new DashboardSummaryDto(
                user.getCurrentStreak(),
                user.getMaxStreak(),
                masteredCount,
                weakCount,
                heatmap
        );
    }
}
