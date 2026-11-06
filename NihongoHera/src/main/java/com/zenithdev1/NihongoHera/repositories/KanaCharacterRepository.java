package com.zenithdev1.NihongoHera.repositories;

import com.zenithdev1.NihongoHera.entity.KanaCharacter;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface KanaCharacterRepository extends JpaRepository<KanaCharacter, Long> {
    List<KanaCharacter> findByScriptType(String scriptType);
    List<KanaCharacter> findByVariationTypeIn(List<String> variationTypes);
    List<KanaCharacter> findByLookAlikeGroupIsNotNull();
    List<KanaCharacter> findByRowGroupIgnoreCase(String rowGroup);
    Optional<KanaCharacter> findByRomajiAndScriptTypeIgnoreCase(String romaji, String scriptType);
    Optional<KanaCharacter> findByCharacterSymbol(String characterSymbol);
}
