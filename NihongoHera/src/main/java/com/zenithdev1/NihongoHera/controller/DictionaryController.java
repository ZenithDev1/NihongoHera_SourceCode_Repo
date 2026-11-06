package com.zenithdev1.NihongoHera.controller;

import com.zenithdev1.NihongoHera.entity.KanaCharacter;
import com.zenithdev1.NihongoHera.exception.ResourceNotFoundException;
import com.zenithdev1.NihongoHera.repositories.KanaCharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dictionary")
@RequiredArgsConstructor
public class DictionaryController {

    private final KanaCharacterRepository kanaRepository;

    @GetMapping("/all")
    public ResponseEntity<List<KanaCharacter>> getAllCharacters() {
        return ResponseEntity.ok(kanaRepository.findAll());
    }

    @GetMapping("/seo/{scriptType}/{romaji}")
    public ResponseEntity<KanaCharacter> getSeoCharacterDetails(
            @PathVariable String scriptType,
            @PathVariable String romaji) {
        return ResponseEntity.ok(
                kanaRepository.findByRomajiAndScriptTypeIgnoreCase(romaji, scriptType)
                        .orElseThrow(() -> new ResourceNotFoundException("Kana not found for " + scriptType + " - " + romaji))
        );
    }

    @GetMapping("/row/{rowGroup}")
    public ResponseEntity<List<KanaCharacter>> getByRow(@PathVariable String rowGroup) {
        return ResponseEntity.ok(kanaRepository.findByRowGroupIgnoreCase(rowGroup));
    }
}
