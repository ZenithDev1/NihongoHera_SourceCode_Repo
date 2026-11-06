package com.zenithdev1.NihongoHera.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "kana_characters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KanaCharacter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "character_symbol", nullable = false, columnDefinition = "VARCHAR(10) COLLATE utf8mb4_bin")
    private String characterSymbol;

//    @Column(nullable = false, unique = true, length = 10)
//    private String characterSymbol; // e.g., こ

    @Column(nullable = false, length = 15)
    private String romaji; // e.g., ko

    @Column(nullable = false, length = 20)
    private String scriptType; // HIRAGANA, KATAKANA

    @Column(nullable = false, length = 20)
    private String rowGroup; // A, KA, SA, TA, NA, HA, MA, YA, RA, WA

    @Column(nullable = false, length = 20)
    private String variationType; // GOJUON, DAKUTEN, HANDAKUTEN

    @Column(nullable = false, length = 40)
    private String devanagariHint; // e.g., को (जैसे कोयल)

    @Column(nullable = false, length = 60)
    private String mnemonicWord; // e.g., [COA]t

    @Column(nullable = false, length = 250)
    private String mnemonicExplanation; // e.g., Two coa-t hangers stacked together sound like 'KO' in COAt.

    @Column(length = 40)
    private String lookAlikeGroup; // e.g., SA_KI, SHI_TSU, SO_N, WA_RE_NE, RU_RO

    @Column(length = 500)
    private String microWordsJson; // JSON array of row micro-reading words
}
