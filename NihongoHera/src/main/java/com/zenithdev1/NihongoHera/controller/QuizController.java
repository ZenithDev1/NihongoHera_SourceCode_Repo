package com.zenithdev1.NihongoHera.controller;

import com.zenithdev1.NihongoHera.dto.QuizDtos.*;
import com.zenithdev1.NihongoHera.entity.KanaCharacter;
import com.zenithdev1.NihongoHera.entity.User;
import com.zenithdev1.NihongoHera.repositories.KanaCharacterRepository;
import com.zenithdev1.NihongoHera.service.QuizService;
import com.zenithdev1.NihongoHera.service.SpacedRepetitionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final SpacedRepetitionService srsService;
    private final QuizService quizService;
    private final KanaCharacterRepository kanaRepository;

    @GetMapping("/guest-deck")
    public ResponseEntity<List<KanaCharacter>> getGuestDeck() {
        return ResponseEntity.ok(kanaRepository.findAll());
    }

    @GetMapping("/srs-deck")
    public ResponseEntity<List<KanaCharacter>> getDailySrsDeck(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "15") int size) {
        return ResponseEntity.ok(srsService.generateDailySrsDeck(user.getId(), size));
    }

    @PostMapping("/submit")
    public ResponseEntity<DashboardSummaryDto> submitSession(
            @AuthenticationPrincipal User user,
            @RequestBody QuizSubmissionRequest request) {
        return ResponseEntity.ok(quizService.submitQuizAndSync(user, request));
    }
}