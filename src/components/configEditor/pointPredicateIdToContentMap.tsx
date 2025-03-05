import { PointPredicateID } from "mjqt-scoring";
import { PointPredicateContent } from "./pointPredicateContent"

export const pointPredicateIdToContentMap: Map<string, PointPredicateContent> = new Map();

const allChowsContent: PointPredicateContent = {
    title: "All Chows (Consecutive Runs)",
    description: <div className="predicate-description"><p>All of your 3+ tile melds are consecutive runs.</p></div>,
};

const commonHandContent: PointPredicateContent = {
    title: "Common Hand",
    description: 
    <div className="predicate-description">
        <ol>
        <li>All of your 3+ tile melds are chows.</li>
        <li>Your hand has more than one different Suited Tile.</li>
        <li>You win by self-draw.</li> 
        <li>You have no flower tiles.</li>
        </ol>
        <p>This rule can be customized to check that your pair is valueless.</p>
        <p>(Valueless Pair = neither dragon nor seat nor prevailing wind pair)</p>
    </div>
};

const allPongsAndKongsContent: PointPredicateContent = {
    title: "All Triples",
    description: <div className="predicate-description">
        <p>Your 3+ tile melds must be a mix of pongs or kongs.</p>
        </div>
};

const sevenPairsContent: PointPredicateContent = {
    title: "Seven Pairs",
    description: <div className="predicate-description">
        <p>Your hand is 14 tiles long and consists of 7 pairs. No kongs allowed.</p>
        </div>
};

const allKongsContent: PointPredicateContent = {
    title: "All Kongs",
    description: <div className="predicate-description">
        <p>All of your 3+ tile melds must be kongs.</p>
        </div>
};

const nineGatesContent: PointPredicateContent = {
    title: "Nine Gates",
    description: <div className="predicate-description">
        <p>A Concealed Hand of 1112345678999 in the same suit, with a duplicate of any number.</p>
        <p>It is called nine gates because, once you have 1112345678999, any duplicate can create a winning hand of a pair and four other 3-tile melds.</p>
        </div>
};

const thirteenOrphansContent: PointPredicateContent = {
    title: "Thirteen Orphans",
    description: <div className="predicate-description">
        <p>A Concealed Hand consisting of: </p>
        <ul>
            <li>one 1 and one 9 in every suit</li>
            <li>one of every dragon</li> 
            <li>one of every wind</li>
            <li>one duplicate of any of the preceding tiles.</li>
        </ul>
    </div>
};

const selfDrawContent: PointPredicateContent = {
    title: "Win By Self Draw",
    description: <div className="predicate-description">
        <p>Your winning tile is drawn from the wall.</p>
        </div>
};

const robbingKongContent: PointPredicateContent = {
    title: "Robbing a Kong",
    description: <div className="predicate-description">
        <p>Your winning tile is the same tile being added to a previously exposed pong during another player's turn.</p>
        </div>
};

const winByLastTileContent: PointPredicateContent = {
    title: "Win By Last Tile",
    description: <div className="predicate-description">
        <p>Your winning tile is the last tile of the wall.</p>
        </div>
};

const winByLastDiscardContent: PointPredicateContent = {
    title: "Win By Last Discard",
    description: <div className="predicate-description">
        <p>Your winning tile is the last tile discarded of the whole game.</p>
        </div>
};

const winByKongContent: PointPredicateContent = {
    title: "Win By Kong",
    description: <div className="predicate-description">
        <p>Your winning tile is the replacement tile you picked up after declaring/promoting a kong.</p>
        </div>
};

const winByDoubleKongContent: PointPredicateContent = {
    title: "Win By Double Kong",
    description: <div className="predicate-description">
        <p>Your winning tile is the second replacement tile you picked up after declaring/promoting two kongs within the same turn.</p>
        </div>
};

const earthlyHandContent: PointPredicateContent = {
    title: "Earthly Hand",
    description: <div className="predicate-description">
        <p>Your seat wind is East and your initial hand is a winning hand.</p>
        </div>
};

const heavenlyHandContent: PointPredicateContent = {
    title: "Heavenly Hand",
    description: <div className="predicate-description">
        <p>Your seat wind is NOT East and your initial hand with East's first discard is a winning hand.</p>
        </div>
};

const lastOfItsKindContent: PointPredicateContent = {
    title: "Last Of Its Kind",
    description: <div className="predicate-description">
        <p>Your winning tile is the last of its kind (i.e., the fourth tile of it), and it is visible to all players that it was the last of its kind via discarded tiles and exposed melds.</p>
        </div>
};

const winByFlowerContent: PointPredicateContent = {
    title: "Win By Flower",
    description: <div className="predicate-description">
        <p>Your winning tile is the replacement tile after you picked up a flower tile.</p>
        </div>
};

const winByDoubleFlowerContent: PointPredicateContent = {
    title: "Win By Double Flower",
    description: <div className="predicate-description">
        <p>Your winning tile is the second replacement tile after you picked up two flower tiles in a row.</p>
        </div>
};

const winByMixedDoubleReplacementContent: PointPredicateContent = {
    title: "Win By Mixed Double Replacement",
    description: <div className="predicate-description">
        <p>Your winning tile is the second replacement tile you picked up after a combination of declaring/promoting a kong and a flower tile in any order.</p>
        </div>
};

const concealedHandContent: PointPredicateContent = {
    title: "Concealed Hand",
    description: <div className="predicate-description">
        <p>Four of your hand's five melds (including your pair) are self drawn.</p>
        <p>You may win via discard to complete any of your melds in order to complete this hand.</p>
        <p>This rule can be customized to only permit you to win via discard when the tile completes your pair.</p>
        </div>
};

const selfTripletsContent: PointPredicateContent = {
    title: "Self Triples",
    description: <div className="predicate-description">
        <p>Your hand's 3-tile melds are all pongs that you never exposed.</p>
        <p>This rule can be customized to allow concealed kongs in your hand.</p>
        </div>
};

const fullyConcealedHandContent: PointPredicateContent = {
    title: "Fully Concealed Hand",
    description: <div className="predicate-description">
        <p>Your hand was concealed AND you self drew your last tile.</p>
        </div>
};

const meldedHandContent: PointPredicateContent = {
    title: "Melded Hand",
    description: <div className="predicate-description">
        <p>Your hand's 3-tile melds are all exposed. </p>
        <p>This rule can be customized two ways: </p>
        <ul>
            <li>to allow for wins via a self draw (to complete your pair)</li>
            <li>to force win via discards to complete your pair only (one of your 3-tile melds cannot be the meld you expose and complete for the win)</li>
        </ul>
        </div>
};

const fullyMeldedHandContent: PointPredicateContent = {
    title: "Fully Melded Hand",
    description: <div className="predicate-description">
        <p>All of your melds were completed by eating others' discards, and you win by discard.</p>
        </div>
};

const noGentlemenOrSeasonsContent: PointPredicateContent = {
    title: "No Flowers",
    description: <div className="predicate-description">
        <p>You did not draw any flower tiles (gentlemen or seasons).</p>
        </div>
};

const seatGentlemanContent: PointPredicateContent = {
    title: "Seat Gentleman",
    description: <div className="predicate-description">
        <p>You drew the gentleman tile that corresponds to your seat wind.</p>
        <ol>
            <li>Plum for East</li>
            <li>Orchid for South</li>
            <li>Chrysanthemum for West</li>
            <li>Bamboo for North</li>
        </ol>
        </div>
};

const seatSeasonContent: PointPredicateContent = {
    title: "Seat Season",
    description: <div className="predicate-description">
        <p>You drew the season tile that corresponds to your seat wind.</p>
        <ol>
            <li>Spring for East</li>
            <li>Summer for South</li>
            <li>Autumn for West</li>
            <li>Winter for North</li>
        </ol>
        </div>
};

const allGentlemenContent: PointPredicateContent = {
    title: "All Gentlemen",
    description: <div className="predicate-description">
        <p>You drew all of the gentlemen tiles.</p>
        </div>
};

const allSeasonsContent: PointPredicateContent = {
    title: "All Seasons",
    description: <div className="predicate-description">
        <p>You drew all of the season tiles.</p>
        </div>
};

const prevailingGentlemanContent: PointPredicateContent = {
    title: "Prevailing Gentleman",
    description: <div className="predicate-description">
        <p>You drew the gentleman tile that corresponds to the prevailing wind.</p>
        <ol>
            <li>Plum for East</li>
            <li>Orchid for South</li>
            <li>Chrysanthemum for West</li>
            <li>Bamboo for North</li>
        </ol>
        </div>
};

const prevailingSeasonContent: PointPredicateContent = {
    title: "Prevailing Season",
    description: <div className="predicate-description">
        <p>You drew the season tile that corresponds to the prevailing wind.</p>
        <ol>
            <li>Spring for East</li>
            <li>Summer for South</li>
            <li>Autumn for West</li>
            <li>Winter for North</li>
        </ol>
        </div>
};

const allGentlemenAndSeasonsContent: PointPredicateContent = {
    title: "All Gentlemen and Seasons",
    description: <div className="predicate-description">
        <p>You drew all of the flower tiles, gentleman and seasons.</p>
        </div>
};

const jadeDragonContent: PointPredicateContent = {
    title: "Jade Dragon",
    description: <div className="predicate-description">
        <ul>
            <li>Your hand's 3+-tile melds are a mixture of pongs and kongs</li>
            <li>One of your 3+-tile melds is a pong or kong of the Green Dragon</li>
            <li>All of your other tiles are in the Bamboo Suit</li>
        </ul>
        </div>
};

const rubyDragonContent: PointPredicateContent = {
    title: "Ruby Dragon",
    description: <div className="predicate-description">
        <ul>
            <li>Your hand's 3+-tile melds are a mixture of pongs and kongs</li>
            <li>One of your 3+-tile melds is a pong or kong of the Red Dragon</li>
            <li>All of your other tiles are in the Characters Suit</li>
        </ul>
        </div>
};

const pearlDragonContent: PointPredicateContent = {
    title: "Pearl Dragon",
    description: <div className="predicate-description">
        <ul>
            <li>Your hand's 3+-tile melds are a mixture of pongs and kongs</li>
            <li>One of your 3+-tile melds is a pong or kong of the White Dragon</li>
            <li>All of your other tiles are in the Circles Suit</li>
        </ul>
        </div>
};

const greenDragonPongKongContent: PointPredicateContent = {
    title: "Green Dragon Pong/Kong",
    description: <div className="predicate-description">
        <p>Your hand contains a pong/kong of the Green Dragon.</p>
        </div>
};

const redDragonPongKongContent: PointPredicateContent = {
    title: "Red Dragon Pong/Kong",
    description: <div className="predicate-description">
        <p>Your hand contains a pong/kong of the Red Dragon.</p>
        </div>
};

const whiteDragonPongKongContent: PointPredicateContent = {
    title: "White Dragon Pong/Kong",
    description: <div className="predicate-description">
        <p>Your hand contains a pong/kong of the White Dragon.</p>
        </div>
};

const seatWindPongKongContent: PointPredicateContent = {
    title: "Seat Wind Pong/Kong",
    description: <div className="predicate-description">
        <p>Your hand contains a pong/kong of your seat wind.</p>
        </div>
};

const prevailingWindPongKongContent: PointPredicateContent = {
    title: "Prevailing Pong/Kong",
    description: <div className="predicate-description">
        <p>Your hand contains a pong/kong of the round's prevailing wind.</p>
        </div>
};

const smallThreeDragonsContent: PointPredicateContent = {
    title: "Small Three Dragons",
    description: <div className="predicate-description">
        <p>Your hand contains two pongs/kongs of two of the dragons and a pair of the third.</p>
        </div>
};

const bigThreeDragonsContent: PointPredicateContent = {
    title: "Big Three Dragons",
    description: <div className="predicate-description">
        <p>Your hand contains pongs/kongs of all three of the dragons.</p>
        </div>
};

const smallFourWindsContent: PointPredicateContent = {
    title: "Small Four Winds",
    description: <div className="predicate-description">
        <p>Your hand contains pongs/kongs of three of the winds and a pair of the fourth.</p>
        </div>
};

const bigFourWindsContent: PointPredicateContent = {
    title: "Big Four Winds",
    description: <div className="predicate-description">
        <p>Your hand contains pongs/kongs of all four of the winds.</p>
        </div>
};

const allHonorsAndTerminalsContent: PointPredicateContent = {
    title: "All Honors And Terminals",
    description: <div className="predicate-description">
        <p>Your hand consists of only Honors (Dragons & Winds) and Terminals (1's & 9's).</p>
        </div>
};

const allOneSuitAndHonorsContent: PointPredicateContent = {
    title: "All One Suit With Honors",
    description: <div className="predicate-description">
        <p>Your hand consists of only one of the three Suits (Character, Bamboo, or Circle) and Honors (Dragons & Winds).</p>
        </div>
};

const allOneSuitContent: PointPredicateContent = {
    title: "All One Suit",
    description: <div className="predicate-description">
        <p>Your hand consists of only one of the three Suits (Character, Bamboo, or Circle).</p>
        </div>
};

const allHonorsContent: PointPredicateContent = {
    title: "All Honors",
    description: <div className="predicate-description">
        <p>Your hand consists of only Honors (Dragons & Winds).</p>
        </div>
};

const allTerminalsContent: PointPredicateContent = {
    title: "All Terminals",
    description: <div className="predicate-description">
        <p>Your hand consists of only Terminals (1's and 9's).</p>
        </div>
};

const allSimplesContent: PointPredicateContent = {
    title: "All Simples",
    description: <div className="predicate-description">
        <p>Your hand consists of only Simples (tiles 2's through 8's).</p>
        </div>
};

const voidedSuitContent: PointPredicateContent = {
    title: "Voided Suit",
    description: <div className="predicate-description">
        <p>Your hand does not contain any tiles from only one of the three Suits (Character, Bamboo, or Circle).</p>
        </div>
};

const plumBlossomOnTheRoofContent: PointPredicateContent = {
    title: "Plum Blossom on the Roof",
    description: <div className="predicate-description">
        <p>Your winning tile is:</p> 
        <ul>
            <li>A Five of Bamboo that completes a 4-5-6 Bamboo Chow</li>
            <li>A replacement tile from declaring a kong</li>
        </ul>
        <p>This rule can be customized to allow the replacement tile to also come from a flower.</p>
        </div>
};

const moonFromTheBottomOfTheSeaContent: PointPredicateContent = {
    title: "Moon from the Bottom of the Sea",
    description: <div className="predicate-description">
        <p>Your winning tile is:</p>
        <ul>
            <li>The One of Circle</li>
            <li>The last tile from the wall via self-draw</li>
        </ul>
        </div>
};

const chickenHandContent: PointPredicateContent = {
    title: "Chicken Hand",
    description: <div className="predicate-description"><p>Your hand does not earn points from any other rules.</p></div>,
};

/* Basic Hands */
pointPredicateIdToContentMap.set(PointPredicateID.ALL_CHOWS, allChowsContent);
pointPredicateIdToContentMap.set(PointPredicateID.COMMON_HAND, commonHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_PONGS_AND_KONGS, allPongsAndKongsContent);
pointPredicateIdToContentMap.set(PointPredicateID.SEVEN_PAIRS, sevenPairsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_KONGS, allKongsContent);

/* Win Condition */
pointPredicateIdToContentMap.set(PointPredicateID.SELF_DRAW, selfDrawContent);
pointPredicateIdToContentMap.set(PointPredicateID.ROBBING_KONG, robbingKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_LAST_TILE, winByLastTileContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_LAST_DISCARD, winByLastDiscardContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_KONG, winByKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_DOUBLE_KONG, winByDoubleKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.EARTHLY_HAND, earthlyHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.HEAVENLY_HAND, heavenlyHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.LAST_OF_ITS_KIND, lastOfItsKindContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_FLOWER, winByFlowerContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_DOUBLE_FLOWER, winByDoubleFlowerContent);
pointPredicateIdToContentMap.set(PointPredicateID.WIN_BY_MIXED_DOUBLE_REPLACEMENT, winByMixedDoubleReplacementContent);

/* Special hand combos */
pointPredicateIdToContentMap.set(PointPredicateID.NINE_GATES, nineGatesContent);
pointPredicateIdToContentMap.set(PointPredicateID.THIRTEEN_ORPHANS, thirteenOrphansContent);

/* Concealed or Exposed */
pointPredicateIdToContentMap.set(PointPredicateID.CONCEALED_HAND, concealedHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.SELF_TRIPLETS, selfTripletsContent);
pointPredicateIdToContentMap.set(PointPredicateID.FULLY_CONCEALED_HAND, fullyConcealedHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.MELDED_HAND, meldedHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.FULLY_MELDED_HAND, fullyMeldedHandContent);

/* Flowers */
pointPredicateIdToContentMap.set(PointPredicateID.NO_GENTLEMEN_OR_SEASONS, noGentlemenOrSeasonsContent);
pointPredicateIdToContentMap.set(PointPredicateID.SEAT_GENTLEMAN, seatGentlemanContent);
pointPredicateIdToContentMap.set(PointPredicateID.SEAT_SEASON, seatSeasonContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_GENTLEMEN, allGentlemenContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_SEASONS, allSeasonsContent);
pointPredicateIdToContentMap.set(PointPredicateID.PREVAILING_GENTLEMAN, prevailingGentlemanContent);
pointPredicateIdToContentMap.set(PointPredicateID.PREVAILING_SEASON, prevailingSeasonContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_GENTLEMAN_AND_SEASONS, allGentlemenAndSeasonsContent);

pointPredicateIdToContentMap.set(PointPredicateID.JADE_DRAGON, jadeDragonContent);
pointPredicateIdToContentMap.set(PointPredicateID.RUBY_DRAGON, rubyDragonContent);
pointPredicateIdToContentMap.set(PointPredicateID.PEARL_DRAGON, pearlDragonContent);

pointPredicateIdToContentMap.set(PointPredicateID.GREEN_DRAGON_PONG_KONG, greenDragonPongKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.RED_DRAGON_PONG_KONG, redDragonPongKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.WHITE_DRAGON_PONG_KONG, whiteDragonPongKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.SEAT_WIND_PONG_KONG, seatWindPongKongContent);
pointPredicateIdToContentMap.set(PointPredicateID.PREVAILING_WIND_PONG_KONG, prevailingWindPongKongContent);

pointPredicateIdToContentMap.set(PointPredicateID.SMALL_THREE_DRAGONS, smallThreeDragonsContent);
pointPredicateIdToContentMap.set(PointPredicateID.BIG_THREE_DRAGONS, bigThreeDragonsContent);
pointPredicateIdToContentMap.set(PointPredicateID.SMALL_FOUR_WINDS, smallFourWindsContent);
pointPredicateIdToContentMap.set(PointPredicateID.BIG_FOUR_WINDS, bigFourWindsContent);

/** Tile type conditions*/
pointPredicateIdToContentMap.set(PointPredicateID.ALL_HONORS_AND_TERMINALS, allHonorsAndTerminalsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_ONE_SUIT_AND_HONORS, allOneSuitAndHonorsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_ONE_SUIT, allOneSuitContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_HONORS, allHonorsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_TERMINALS, allTerminalsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_SIMPLES, allSimplesContent);
pointPredicateIdToContentMap.set(PointPredicateID.VOIDED_SUIT, voidedSuitContent);

pointPredicateIdToContentMap.set(PointPredicateID.PLUM_BLOSSOM_ON_THE_ROOF, plumBlossomOnTheRoofContent);
pointPredicateIdToContentMap.set(PointPredicateID.MOON_FROM_THE_BOTTOM_OF_THE_SEA, moonFromTheBottomOfTheSeaContent);

pointPredicateIdToContentMap.set(PointPredicateID.CHICKEN_HAND, chickenHandContent);