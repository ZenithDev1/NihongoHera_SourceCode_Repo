package com.zenithdev1.NihongoHera.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {

        Map<String, Object> response = Map.of(
                "status", "UP",
                "message", "NihongoHera application is running successfully",
                "timestamp", LocalDateTime.now().toString()
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
