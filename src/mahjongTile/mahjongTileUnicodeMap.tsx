import { Tile, EAST_WIND, SOUTH_WIND, WEST_WIND, NORTH_WIND,
    RED_DRAGON, GREEN_DRAGON, WHITE_DRAGON, 
    ONE_CHARACTER, TWO_CHARACTER, THREE_CHARACTER,
    FOUR_CHARACTER, FIVE_CHARACTER, SIX_CHARACTER,
    SEVEN_CHARACTER, EIGHT_CHARACTER, NINE_CHARACTER,
    ONE_BAMBOO, TWO_BAMBOO, THREE_BAMBOO,
    FOUR_BAMBOO, FIVE_BAMBOO, SIX_BAMBOO,
    SEVEN_BAMBOO, EIGHT_BAMBOO, NINE_BAMBOO,
    ONE_CIRCLE, TWO_CIRCLE, THREE_CIRCLE,
    FOUR_CIRCLE, FIVE_CIRCLE, SIX_CIRCLE,
    SEVEN_CIRCLE, EIGHT_CIRCLE, NINE_CIRCLE,
    PLUM_GENTLEMAN, ORCHID_GENTLEMAN, BAMBOO_GENTLEMAN, CHRYSANTHEMUM_GENTLEMAN,
    SPRING_SEASON, SUMMER_SEASON, AUTUMN_SEASON, WINTER_SEASON} from 'mjqt-scoring'
  
const mahjongTileToUnicodeMap: Map<Tile, string> = new Map();

/* https://unicode.org/charts/nameslist/n_1F000.html */
mahjongTileToUnicodeMap.set(EAST_WIND, "\uD83C\uDC00"); // = \u1F000
mahjongTileToUnicodeMap.set(SOUTH_WIND, "\uD83C\uDC01");
mahjongTileToUnicodeMap.set(WEST_WIND, "\uD83C\uDC02");
mahjongTileToUnicodeMap.set(NORTH_WIND, "\uD83C\uDC03");
  
mahjongTileToUnicodeMap.set(RED_DRAGON, "\uD83C\uDC04\uFE0E"); // \uFE0E denotes the plain text ver (not emoji)
mahjongTileToUnicodeMap.set(GREEN_DRAGON, "\uD83C\uDC05");
mahjongTileToUnicodeMap.set(WHITE_DRAGON, "\uD83C\uDC06");

mahjongTileToUnicodeMap.set(ONE_CHARACTER, "\uD83C\uDC07");
mahjongTileToUnicodeMap.set(TWO_CHARACTER, "\uD83C\uDC08");
mahjongTileToUnicodeMap.set(THREE_CHARACTER, "\uD83C\uDC09");
mahjongTileToUnicodeMap.set(FOUR_CHARACTER, "\uD83C\uDC0A");
mahjongTileToUnicodeMap.set(FIVE_CHARACTER, "\uD83C\uDC0B");
mahjongTileToUnicodeMap.set(SIX_CHARACTER, "\uD83C\uDC0C");
mahjongTileToUnicodeMap.set(SEVEN_CHARACTER, "\uD83C\uDC0D");
mahjongTileToUnicodeMap.set(EIGHT_CHARACTER, "\uD83C\uDC0E");
mahjongTileToUnicodeMap.set(NINE_CHARACTER, "\uD83C\uDC0F");

mahjongTileToUnicodeMap.set(ONE_BAMBOO, "\uD83C\uDC10");
mahjongTileToUnicodeMap.set(TWO_BAMBOO, "\uD83C\uDC11");
mahjongTileToUnicodeMap.set(THREE_BAMBOO, "\uD83C\uDC12");
mahjongTileToUnicodeMap.set(FOUR_BAMBOO, "\uD83C\uDC13");
mahjongTileToUnicodeMap.set(FIVE_BAMBOO, "\uD83C\uDC14");
mahjongTileToUnicodeMap.set(SIX_BAMBOO, "\uD83C\uDC15");
mahjongTileToUnicodeMap.set(SEVEN_BAMBOO, "\uD83C\uDC16");
mahjongTileToUnicodeMap.set(EIGHT_BAMBOO, "\uD83C\uDC17");
mahjongTileToUnicodeMap.set(NINE_BAMBOO, "\uD83C\uDC18");

mahjongTileToUnicodeMap.set(ONE_CIRCLE, "\uD83C\uDC19");
mahjongTileToUnicodeMap.set(TWO_CIRCLE, "\uD83C\uDC1A");
mahjongTileToUnicodeMap.set(THREE_CIRCLE, "\uD83C\uDC1B");
mahjongTileToUnicodeMap.set(FOUR_CIRCLE, "\uD83C\uDC1C");
mahjongTileToUnicodeMap.set(FIVE_CIRCLE, "\uD83C\uDC1D");
mahjongTileToUnicodeMap.set(SIX_CIRCLE, "\uD83C\uDC1E");
mahjongTileToUnicodeMap.set(SEVEN_CIRCLE, "\uD83C\uDC1F");
mahjongTileToUnicodeMap.set(EIGHT_CIRCLE, "\uD83C\uDC20");
mahjongTileToUnicodeMap.set(NINE_CIRCLE, "\uD83C\uDC21");

mahjongTileToUnicodeMap.set(PLUM_GENTLEMAN, "\uD83C\uDC22");
mahjongTileToUnicodeMap.set(ORCHID_GENTLEMAN, "\uD83C\uDC23");
mahjongTileToUnicodeMap.set(BAMBOO_GENTLEMAN, "\uD83C\uDC24");
mahjongTileToUnicodeMap.set(CHRYSANTHEMUM_GENTLEMAN, "\uD83C\uDC25");
mahjongTileToUnicodeMap.set(SPRING_SEASON, "\uD83C\uDC26");
mahjongTileToUnicodeMap.set(SUMMER_SEASON, "\uD83C\uDC27");
mahjongTileToUnicodeMap.set(AUTUMN_SEASON, "\uD83C\uDC28");
mahjongTileToUnicodeMap.set(WINTER_SEASON, "\uD83C\uDC29");
  
export default mahjongTileToUnicodeMap;