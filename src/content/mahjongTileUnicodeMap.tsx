import { Tile, TileGroup, TileValue, WindTileValue,
    DragonTileValue,
    SuitedTileValue,
    GentlemanTileValue,
    SeasonTileValue} from 'mjqt-scoring'

const windValueMap: Map<TileValue, string> = new Map();
const dragonValueMap: Map<TileValue, string> = new Map();
const characterValueMap: Map<TileValue, string> = new Map();
const bambooValueMap: Map<TileValue, string> = new Map();
const circleValueMap: Map<TileValue, string> = new Map();
const gentlemanValueMap: Map<TileValue, string> = new Map();
const seasonValueMap: Map<TileValue, string> = new Map();

/* https://unicode.org/charts/nameslist/n_1F000.html */
windValueMap.set(WindTileValue.EAST, "\uD83C\uDC00"); // = \u1F000
windValueMap.set(WindTileValue.SOUTH, "\uD83C\uDC01");
windValueMap.set(WindTileValue.WEST, "\uD83C\uDC02");
windValueMap.set(WindTileValue.NORTH, "\uD83C\uDC03");
  
dragonValueMap.set(DragonTileValue.RED, "\uD83C\uDC04\uFE0E"); // \uFE0E denotes the plain text ver (not emoji)
dragonValueMap.set(DragonTileValue.GREEN, "\uD83C\uDC05");
dragonValueMap.set(DragonTileValue.WHITE, "\uD83C\uDC06");

characterValueMap.set(SuitedTileValue.ONE, "\uD83C\uDC07");
characterValueMap.set(SuitedTileValue.TWO, "\uD83C\uDC08");
characterValueMap.set(SuitedTileValue.THREE, "\uD83C\uDC09");
characterValueMap.set(SuitedTileValue.FOUR, "\uD83C\uDC0A");
characterValueMap.set(SuitedTileValue.FIVE, "\uD83C\uDC0B");
characterValueMap.set(SuitedTileValue.SIX, "\uD83C\uDC0C");
characterValueMap.set(SuitedTileValue.SEVEN, "\uD83C\uDC0D");
characterValueMap.set(SuitedTileValue.EIGHT, "\uD83C\uDC0E");
characterValueMap.set(SuitedTileValue.NINE, "\uD83C\uDC0F");

bambooValueMap.set(SuitedTileValue.ONE, "\uD83C\uDC10");
bambooValueMap.set(SuitedTileValue.TWO, "\uD83C\uDC11");
bambooValueMap.set(SuitedTileValue.THREE, "\uD83C\uDC12");
bambooValueMap.set(SuitedTileValue.FOUR, "\uD83C\uDC13");
bambooValueMap.set(SuitedTileValue.FIVE, "\uD83C\uDC14");
bambooValueMap.set(SuitedTileValue.SIX, "\uD83C\uDC15");
bambooValueMap.set(SuitedTileValue.SEVEN, "\uD83C\uDC16");
bambooValueMap.set(SuitedTileValue.EIGHT, "\uD83C\uDC17");
bambooValueMap.set(SuitedTileValue.NINE, "\uD83C\uDC18");

circleValueMap.set(SuitedTileValue.ONE, "\uD83C\uDC19");
circleValueMap.set(SuitedTileValue.TWO, "\uD83C\uDC1A");
circleValueMap.set(SuitedTileValue.THREE, "\uD83C\uDC1B");
circleValueMap.set(SuitedTileValue.FOUR, "\uD83C\uDC1C");
circleValueMap.set(SuitedTileValue.FIVE, "\uD83C\uDC1D");
circleValueMap.set(SuitedTileValue.SIX, "\uD83C\uDC1E");
circleValueMap.set(SuitedTileValue.SEVEN, "\uD83C\uDC1F");
circleValueMap.set(SuitedTileValue.EIGHT, "\uD83C\uDC20");
circleValueMap.set(SuitedTileValue.NINE, "\uD83C\uDC21");

gentlemanValueMap.set(GentlemanTileValue.PLUM, "\uD83C\uDC22");
gentlemanValueMap.set(GentlemanTileValue.ORCHID, "\uD83C\uDC23");
gentlemanValueMap.set(GentlemanTileValue.CHRYSANTHEMUM, "\uD83C\uDC25");
gentlemanValueMap.set(GentlemanTileValue.BAMBOO, "\uD83C\uDC24");
seasonValueMap.set(SeasonTileValue.SPRING, "\uD83C\uDC26");
seasonValueMap.set(SeasonTileValue.SUMMER, "\uD83C\uDC27");
seasonValueMap.set(SeasonTileValue.AUTUMN, "\uD83C\uDC28");
seasonValueMap.set(SeasonTileValue.WINTER, "\uD83C\uDC29");
  
export default function getUnicodeRepresentation(tile: Tile): string | undefined {
    switch(tile.group) {
        case TileGroup.WIND:
            return windValueMap.get(tile.value);
        case TileGroup.DRAGON:
            return dragonValueMap.get(tile.value);
        case TileGroup.CHARACTER:
            return characterValueMap.get(tile.value);
        case TileGroup.BAMBOO:
            return bambooValueMap.get(tile.value);
        case TileGroup.CIRCLE:
            return circleValueMap.get(tile.value);
        case TileGroup.GENTLEMAN:
            return gentlemanValueMap.get(tile.value);
        case TileGroup.SEASON:
            return seasonValueMap.get(tile.value);
    }
}