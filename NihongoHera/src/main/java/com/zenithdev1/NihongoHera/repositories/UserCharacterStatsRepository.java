package com.zenithdev1.NihongoHera.repositories;

import com.zenithdev1.NihongoHera.entity.UserCharacterStats;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserCharacterStatsRepository extends JpaRepository<UserCharacterStats, Long> {
    List<UserCharacterStats> findByUserId(Long userId);
    Optional<UserCharacterStats> findByUserIdAndKanaId(Long userId, Long kanaId);
}
