package com.zenithdev1.NihongoHera.controller;

import com.zenithdev1.NihongoHera.dto.QuizDtos.DashboardSummaryDto;
import com.zenithdev1.NihongoHera.entity.User;
import com.zenithdev1.NihongoHera.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final QuizService quizService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryDto> getDashboard(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(quizService.getDashboardSummary(user));
    }
}
