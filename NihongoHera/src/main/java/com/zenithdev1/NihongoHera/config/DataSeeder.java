package com.zenithdev1.NihongoHera.config;

import com.zenithdev1.NihongoHera.entity.KanaCharacter;
import com.zenithdev1.NihongoHera.repositories.KanaCharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final KanaCharacterRepository kanaRepository;

    @Override
    public void run(String... args) {
        if (kanaRepository.count() > 0) return;

        List<KanaCharacter> seedList = List.of(
                // A-Row Hiragana
                KanaCharacter.builder().characterSymbol("あ").romaji("a").scriptType("HIRAGANA").rowGroup("A")
                        .variationType("GOJUON").devanagariHint("अ (जैसे अनार)").mnemonicWord("[A]pple")
                        .mnemonicExplanation("Looks like an Apple hanging from a cross-branch: 'A' as in Apple.")
                        .microWordsJson("[{\"kana\":\"あい\",\"romaji\":\"ai\",\"meaning\":\"Love (प्यार)\"},{\"kana\":\"あおい\",\"romaji\":\"aoi\",\"meaning\":\"Blue (नीला)\"}]").build(),
                KanaCharacter.builder().characterSymbol("い").romaji("i").scriptType("HIRAGANA").rowGroup("A")
                        .variationType("GOJUON").devanagariHint("इ / ई (जैसे इमली)").mnemonicWord("[EE]l")
                        .mnemonicExplanation("Two vertical Eels swimming side by side: sounds like 'EE' in EEl.")
                        .microWordsJson("[{\"kana\":\"いいえ\",\"romaji\":\"iie\",\"meaning\":\"No (नहीं)\"}]").build(),
                KanaCharacter.builder().characterSymbol("う").romaji("u").scriptType("HIRAGANA").rowGroup("A")
                        .variationType("GOJUON").devanagariHint("उ (जैसे उल्लू)").mnemonicWord("[OO]ps")
                        .mnemonicExplanation("Someone getting kicked in the stomach bending over: '[OO]ps!'")
                        .microWordsJson("[{\"kana\":\"うえ\",\"romaji\":\"ue\",\"meaning\":\"Above (ऊपर)\"}]").build(),
                KanaCharacter.builder().characterSymbol("え").romaji("e").scriptType("HIRAGANA").rowGroup("A")
                        .variationType("GOJUON").devanagariHint("ए (जैसे एक)").mnemonicWord("[E]xotic bird")
                        .mnemonicExplanation("An Exotic bird with a crest on its head: sounds like 'E' in Exotic.")
                        .microWordsJson("[{\"kana\":\"えき\",\"romaji\":\"eki\",\"meaning\":\"Train Station (स्टेशन)\"}]").build(),
                KanaCharacter.builder().characterSymbol("お").romaji("o").scriptType("HIRAGANA").rowGroup("A")
                        .variationType("GOJUON").devanagariHint("ओ (जैसे ओस)").mnemonicWord("[O]lympic golf")
                        .mnemonicExplanation("A golf ball rolling into an '[O]'-shaped hole on the green.")
                        .microWordsJson("[{\"kana\":\"あおい\",\"romaji\":\"aoi\",\"meaning\":\"Blue (नीला)\"}]").build(),

                // KA-Row Hiragana
                KanaCharacter.builder().characterSymbol("か").romaji("ka").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("GOJUON").devanagariHint("का (जैसे कार)").mnemonicWord("[CA]r")
                        .mnemonicExplanation("A sharp blade cutting a stick: sounds like '[CA]' in CAr.")
                        .microWordsJson("[{\"kana\":\"あか\",\"romaji\":\"aka\",\"meaning\":\"Red (लाल)\"}]").build(),
                KanaCharacter.builder().characterSymbol("き").romaji("ki").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("GOJUON").devanagariHint("की (जैसे चाबी)").mnemonicWord("[KEY]")
                        .mnemonicExplanation("Two horizontal teeth at the top of an old metal '[KEY]'.")
                        .lookAlikeGroup("SA_KI")
                        .microWordsJson("[{\"kana\":\"えき\",\"romaji\":\"eki\",\"meaning\":\"Station (स्टेशन)\"},{\"kana\":\"あき\",\"romaji\":\"aki\",\"meaning\":\"Autumn (पतझड़)\"}]").build(),
                KanaCharacter.builder().characterSymbol("く").romaji("ku").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("GOJUON").devanagariHint("कु (जैसे कोयल)").mnemonicWord("[COO]kbook beak")
                        .mnemonicExplanation("Open beak of a cuckoo bird singing '[COO]'!")
                        .microWordsJson("[{\"kana\":\"きく\",\"romaji\":\"kiku\",\"meaning\":\"To listen (सुनना)\"}]").build(),
                KanaCharacter.builder().characterSymbol("け").romaji("ke").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("GOJUON").devanagariHint("के (जैसे केला)").mnemonicWord("[KE]g")
                        .mnemonicExplanation("Curved wooden staves of a '[KE]g' barrel.")
                        .microWordsJson("[{\"kana\":\"いけ\",\"romaji\":\"ike\",\"meaning\":\"Pond (तालाब)\"}]").build(),
                KanaCharacter.builder().characterSymbol("こ").romaji("ko").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("GOJUON").devanagariHint("को (जैसे कोट)").mnemonicWord("[COA]t")
                        .mnemonicExplanation("Two horizontal '[COA]t' worms resting parallel to each other.")
                        .microWordsJson("[{\"kana\":\"ここ\",\"romaji\":\"koko\",\"meaning\":\"Here (यहाँ)\"},{\"kana\":\"こえ\",\"romaji\":\"koe\",\"meaning\":\"Voice (आवाज़)\"}]").build(),

                // SA-Row & Look-Alikes + Special Indian Phonetics (TSU / RA)
                KanaCharacter.builder().characterSymbol("さ").romaji("sa").scriptType("HIRAGANA").rowGroup("SA")
                        .variationType("GOJUON").devanagariHint("सा (जैसे सात)").mnemonicWord("[SA]murai sword")
                        .mnemonicExplanation("Single crossbar hilt of a '[SA]murai' blade (unlike 'ki' which has two bars!).")
                        .lookAlikeGroup("SA_KI")
                        .microWordsJson("[{\"kana\":\"あさ\",\"romaji\":\"asa\",\"meaning\":\"Morning (सुबह)\"},{\"kana\":\"かさ\",\"romaji\":\"kasa\",\"meaning\":\"Umbrella (छाता)\"}]").build(),
                KanaCharacter.builder().characterSymbol("し").romaji("shi").scriptType("HIRAGANA").rowGroup("SA")
                        .variationType("GOJUON").devanagariHint("शी (जैसे शीशा)").mnemonicWord("[SHE]pherd hook")
                        .mnemonicExplanation("Curved like a '[SHE]pherd's' crook or a drinking straw.")
                        .microWordsJson("[{\"kana\":\"すし\",\"romaji\":\"sushi\",\"meaning\":\"Sushi (सुशी)\"}]").build(),
                KanaCharacter.builder().characterSymbol("す").romaji("su").scriptType("HIRAGANA").rowGroup("SA")
                        .variationType("GOJUON").devanagariHint("सु (जैसे सुई)").mnemonicWord("[SW]ing loop")
                        .mnemonicExplanation("A tire '[SW]ing' hanging and looping from a tree branch.")
                        .microWordsJson("[{\"kana\":\"すし\",\"romaji\":\"sushi\",\"meaning\":\"Sushi (सुशी)\"},{\"kana\":\"いす\",\"romaji\":\"isu\",\"meaning\":\"Chair (कुर्सी)\"}]").build(),
                KanaCharacter.builder().characterSymbol("つ").romaji("tsu").scriptType("HIRAGANA").rowGroup("TA")
                        .variationType("GOJUON").devanagariHint("त्सु (आधा 'त' + 'सु' एक साथ)").mnemonicWord("[TSU]nami wave")
                        .mnemonicExplanation("A giant curling '[TSU]nami' wave cresting over the ocean.")
                        .microWordsJson("[{\"kana\":\"つき\",\"romaji\":\"tsuki\",\"meaning\":\"Moon (चाँद)\"},{\"kana\":\"つくえ\",\"romaji\":\"tsukue\",\"meaning\":\"Desk (मेज़)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ら").romaji("ra").scriptType("HIRAGANA").rowGroup("RA")
                        .variationType("GOJUON").devanagariHint("रा / ड़ा (जीभ तालू से हल्की टकराए)").mnemonicWord("[RA]bbit")
                        .mnemonicExplanation("Curved ears and round belly of a jumping '[RA]bbit'.")
                        .microWordsJson("[{\"kana\":\"さくら\",\"romaji\":\"sakura\",\"meaning\":\"Cherry Blossom (सकुरा)\"}]").build(),
                KanaCharacter.builder().characterSymbol("る").romaji("ru").scriptType("HIRAGANA").rowGroup("RA")
                        .variationType("GOJUON").devanagariHint("रु (जैसे रुमाल)").mnemonicWord("[RU]by loop")
                        .mnemonicExplanation("Notice the little '[RU]by' ring loop at the tail end!")
                        .lookAlikeGroup("RU_RO")
                        .microWordsJson("[{\"kana\":\"よる\",\"romaji\":\"yoru\",\"meaning\":\"Night (रात)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ろ").romaji("ro").scriptType("HIRAGANA").rowGroup("RA")
                        .variationType("GOJUON").devanagariHint("रो (जैसे रोटी)").mnemonicWord("[RO]ad (plain)")
                        .mnemonicExplanation("A plain '[RO]ad' turn with NO ruby loop at the bottom.")
                        .lookAlikeGroup("RU_RO")
                        .microWordsJson("[{\"kana\":\"しろ\",\"romaji\":\"shiro\",\"meaning\":\"White / Castle (सफ़ेद / किला)\"}]").build(),
                KanaCharacter.builder().characterSymbol("わ").romaji("wa").scriptType("HIRAGANA").rowGroup("WA")
                        .variationType("GOJUON").devanagariHint("वा (जैसे वाह)").mnemonicWord("[WA]sp belly")
                        .mnemonicExplanation("Round, smooth '[WA]sp' abdomen on the right side.")
                        .lookAlikeGroup("WA_RE_NE")
                        .microWordsJson("[{\"kana\":\"わたし\",\"romaji\":\"watashi\",\"meaning\":\"I / Me (मैं)\"}]").build(),
                KanaCharacter.builder().characterSymbol("れ").romaji("re").scriptType("HIRAGANA").rowGroup("RA")
                        .variationType("GOJUON").devanagariHint("रे (जैसे रेल)").mnemonicWord("[RE]tired kick")
                        .mnemonicExplanation("Kicks outward at the bottom right like someone '[RE]tiring' and stretching out.")
                        .lookAlikeGroup("WA_RE_NE")
                        .microWordsJson("[{\"kana\":\"これ\",\"romaji\":\"kore\",\"meaning\":\"This (यह)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ね").romaji("ne").scriptType("HIRAGANA").rowGroup("NA")
                        .variationType("GOJUON").devanagariHint("ने (जैसे नेवला)").mnemonicWord("[NE]ko (Cat) tail")
                        .mnemonicExplanation("Curls into a loop at the bottom like a sleeping '[NE]ko' (cat) tail.")
                        .lookAlikeGroup("WA_RE_NE")
                        .microWordsJson("[{\"kana\":\"ねこ\",\"romaji\":\"neko\",\"meaning\":\"Cat (बिल्ली)\"}]").build(),

                // Dakuten & Handakuten Variations
                KanaCharacter.builder().characterSymbol("が").romaji("ga").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("DAKUTEN").devanagariHint("गा (जैसे गाना)").mnemonicWord("[GA]rden gate")
                        .mnemonicExplanation("Ka (か) + Tenten quotes softens 'K' into voiced '[GA]'.")
                        .microWordsJson("[{\"kana\":\"えいが\",\"romaji\":\"eiga\",\"meaning\":\"Movie (फ़िल्म)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ご").romaji("go").scriptType("HIRAGANA").rowGroup("KA")
                        .variationType("DAKUTEN").devanagariHint("गो (जैसे गोल)").mnemonicWord("[GO]alpost")
                        .mnemonicExplanation("Ko (こ) + Tenten quotes vibrates the throat into '[GO]'.")
                        .microWordsJson("[{\"kana\":\"りんご\",\"romaji\":\"ringo\",\"meaning\":\"Apple (सेब)\"}]").build(),
                KanaCharacter.builder().characterSymbol("は").romaji("ha").scriptType("HIRAGANA").rowGroup("HA")
                        .variationType("GOJUON").devanagariHint("हा (जैसे हाथ)").mnemonicWord("[HA]rpoon")
                        .mnemonicExplanation("Vertical pole + looped '[HA]rpoon' line.")
                        .microWordsJson("[{\"kana\":\"はな\",\"romaji\":\"hana\",\"meaning\":\"Flower (फूल)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ば").romaji("ba").scriptType("HIRAGANA").rowGroup("HA")
                        .variationType("DAKUTEN").devanagariHint("बा (जैसे बादल)").mnemonicWord("[BA]nana")
                        .mnemonicExplanation("Ha (は) + Tenten (〃) turns 'H' into voiced '[BA]'.")
                        .microWordsJson("[{\"kana\":\"かばん\",\"romaji\":\"kaban\",\"meaning\":\"Bag (बैग)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ぱ").romaji("pa").scriptType("HIRAGANA").rowGroup("HA")
                        .variationType("HANDAKUTEN").devanagariHint("पा (जैसे पानी)").mnemonicWord("[PA]rade bubble")
                        .mnemonicExplanation("Ha (は) + Maru circle (゜) pops like a '[PA]rade' bubble!")
                        .microWordsJson("[{\"kana\":\"きっぷ\",\"romaji\":\"kippu\",\"meaning\":\"Ticket (टिकट)\"}]").build(),

                // Katakana Confusing Pairs
                KanaCharacter.builder().characterSymbol("シ").romaji("shi").scriptType("KATAKANA").rowGroup("SA")
                        .variationType("GOJUON").devanagariHint("शी (कटाकाना)").mnemonicWord("[SHE] smiles sideways")
                        .mnemonicExplanation("Two horizontal eyes aligned left; stroke sweeps UP from bottom-left.")
                        .lookAlikeGroup("SHI_TSU")
                        .microWordsJson("[{\"kana\":\"シャツ\",\"romaji\":\"shatsu\",\"meaning\":\"Shirt (शर्ट)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ツ").romaji("tsu").scriptType("KATAKANA").rowGroup("TA")
                        .variationType("GOJUON").devanagariHint("त्सु (कटाकाना)").mnemonicWord("[TSU]nami drops down")
                        .mnemonicExplanation("Two vertical rain drops at the top; long stroke sweeps DOWN from top-right.")
                        .lookAlikeGroup("SHI_TSU")
                        .microWordsJson("[{\"kana\":\"ツアー\",\"romaji\":\"tsuaa\",\"meaning\":\"Tour (टूर)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ソ").romaji("so").scriptType("KATAKANA").rowGroup("SA")
                        .variationType("GOJUON").devanagariHint("सो (कटाकाना)").mnemonicWord("[SO]ftware needle down")
                        .mnemonicExplanation("Top tick points vertically down, long stroke sweeps DOWN from top.")
                        .lookAlikeGroup("SO_N")
                        .microWordsJson("[{\"kana\":\"ソース\",\"romaji\":\"soosu\",\"meaning\":\"Sauce (सॉस)\"}]").build(),
                KanaCharacter.builder().characterSymbol("ン").romaji("n").scriptType("KATAKANA").rowGroup("WA")
                        .variationType("GOJUON").devanagariHint("न् / अं (कटाकाना)").mnemonicWord("O[N]e-eyed wink up")
                        .mnemonicExplanation("Horizontal tick on left; main stroke sweeps UP from bottom-left.")
                        .lookAlikeGroup("SO_N")
                        .microWordsJson("[{\"kana\":\"パン\",\"romaji\":\"pan\",\"meaning\":\"Bread (ब्रेड)\"}]").build()
        );

        kanaRepository.saveAll(seedList);
    }
}