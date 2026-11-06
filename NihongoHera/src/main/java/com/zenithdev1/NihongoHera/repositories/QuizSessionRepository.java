package com.zenithdev1.NihongoHera.repositories;


import com.zenithdev1.NihongoHera.entity.QuizSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizSessionRepository extends JpaRepository<QuizSession, Long> {
    List<QuizSession> findTop10ByUserIdOrderByCompletedAtDesc(Long userId);
}
