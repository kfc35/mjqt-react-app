import { PointPredicateID } from "mjqt-scoring";
import { PointPredicateContent } from "./pointPredicateContent"

export const subPointPredicateIdToContentMap: Map<string, PointPredicateContent> = new Map();

const onePairContent: PointPredicateContent = {
    title: "One Pair",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly one pair.</p>
        </div>,
};

const fourChowsContent: PointPredicateContent = {
    title: "Four Chows",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four chows (consecutive runs).</p>
        </div>,
};

const fourKongsContent: PointPredicateContent = {
    title: "Four Kongs",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four kongs (four-of-a-kinds).</p>
        </div>,
};

const fourPongsKongsContent: PointPredicateContent = {
    title: "Four Pongs/Kongs",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four melds that are a mix of pongs and kongs (three-of-a-kinds and four-of-a-kinds).</p>
        </div>
};

const fourConcealedPongsContent: PointPredicateContent = {
    title: "Four Concealed Pongs",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four concealed melds that are a mix of pongs and kongs (three-of-a-kinds and four-of-a-kinds).</p>
        </div>
};

const fourConcealedPongsKongsContent: PointPredicateContent = {
    title: "Four Concealed Pongs/Kongs",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four concealed melds that are a mix of pongs and kongs (three-of-a-kinds and four-of-a-kinds).</p>
        </div>
};

const fourConcealedNonPairMeldsContent: PointPredicateContent = {
    title: "Four Concealed Non-Pair Melds",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four concealed melds, none of which are pairs.</p>
        </div>
};

const fourConcealedMeldsContent: PointPredicateContent = {
    title: "Four Concealed Melds",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four concealed melds. A self-drawn pair counts as a concealed meld.</p>
        </div>
};

const fourExposedNonPairMeldsContent: PointPredicateContent = {
    title: "Four Exposed Non-Pair Melds",
    description: <div className="subpredicate-description">
        <p>Your hand has exactly four exposed melds, none of which are pairs.</p>
        </div>
};

const handContainsNoSuitsContent: PointPredicateContent = {
    title: "Hand Contains No Suits",
    description: <div className="subpredicate-description">
        <p>Your hand does not contain suited tiles (character, bamboo, circle).</p>
        </div>
};

const handContainsOneSuitContent: PointPredicateContent = {
    title: "Hand Contains One Suit",
    description: <div className="subpredicate-description">
        <p>Your hand contains exactly one suit (character, bamboo, circle).</p>
        </div>
};

const handContainsMoreThanOneSuitContent: PointPredicateContent = {
    title: "Hand More Than One Suit",
    description: <div className="subpredicate-description">
        <p>Your hand contains more than one suit (character, bamboo, circle).</p>
        </div>
};

const handContainsHonorsContent: PointPredicateContent = {
    title: "Hand Contains Honors",
    description: <div className="subpredicate-description">
        <p>Your hand contains honor tiles (dragons, winds).</p>
        </div>
};

const handContainsNoHonorsContent: PointPredicateContent = {
    title: "Hand Contains No Honors",
    description: <div className="subpredicate-description">
        <p>Your hand does not contain honor tiles (dragons, winds).</p>
        </div>
};

const ifLastTileWasDiscardThenItCompletedPair: PointPredicateContent = {
    title: "If Your Last Tile was Discard, then it Completed Pair",
    description: <div className="subpredicate-description">
        <p>If your last tile was a discard, then it completed a pair.</p>
        <p>This rule follows the the mathematical truth table for implication (if p then q).</p>
        <p>This means that, if your last tile was self drawn, this evaluates to true </p>
        </div>
};

const ifLastTileWasSelfDrawnThenItCompletedPair: PointPredicateContent = {
    title: "If Your Last Tile was Self Drawn, then it Completed Pair",
    description: <div className="subpredicate-description">
        <p>If your last tile was self drawn, then it completed a pair.</p>
        <p>This rule follows the the mathematical truth table for implication (if p then q).</p>
        <p>This means that, if your last tile was a discard, this evaluates to true</p>
        </div>
};

const lastTileCompletedPairContent: PointPredicateContent = {
    title: "Last Tile Completed Pair",
    description: <div className="subpredicate-description">
        <p>Your last tile completed your pair.</p>
        </div>
};

const threeWindsPongKongContent: PointPredicateContent = {
    title: "Three Pongs/Kongs of Winds",
    description: <div className="subpredicate-description">
        <p>Your hand has three pongs/kongs of three different winds.</p>
        </div>
};

const twoDragonsPongKongContent: PointPredicateContent = {
    title: "Two Pongs/Kongs of Dragons",
    description: <div className="subpredicate-description">
        <p>Your hand has two pongs/kongs of two different dragons.</p>
        </div>
};

const allOneSuitWithSufficientTileQuantitiesForNineGatesContent: PointPredicateContent = {
    title: "All One Suit with Sufficient Tile Quantities for Nine Gates",
    description: <div className="subpredicate-description">
        <p>Your hand: </p>
        <ul>
        <li>is composed of tiles all from the same suit</li>
        <li>has the correct tile quantities (1112345678999 + a duplicate) for the "Nine Gates" special hand.</li>
        </ul>
        </div>
};

const allBambooAndGreenDragonContent: PointPredicateContent = {
    title: "All Bamboo and Green Dragon",
    description: <div className="subpredicate-description">
        <p>Your hand is composed of tiles from the Bamboo Suit and the Green Dragon tile.</p>
        </div>
};

const allCharacterAndRedDragonContent: PointPredicateContent = {
    title: "All Character and Red Dragon",
    description: <div className="subpredicate-description">
        <p>Your hand is composed of tiles from the Character Suit and the Red Dragon tile.</p>
        </div>
};

const allCircleAndWhiteDragonContent: PointPredicateContent = {
    title: "All Circle and White Dragon",
    description: <div className="subpredicate-description">
        <p>Your hand is composed of tiles from the Circle Suit and the White Dragon tile.</p>
        </div>
};

const dragonPairContent: PointPredicateContent = {
    title: "Dragon Pair",
    description: <div className="subpredicate-description">
        <p>Your hand contains a pair of a dragon.</p>
        </div>
};

const windPairContent: PointPredicateContent = {
    title: "Wind Pair",
    description: <div className="subpredicate-description">
        <p>Your hand contains a pair of a wind.</p>
        </div>
};

const valuedWindPairContent: PointPredicateContent = {
    title: "Valued Wind Pair",
    description: <div className="subpredicate-description">
        <p>Your hand contains a pair of a valued wind (seat or prevailing).</p>
        </div>
};

const valuelessWindPairContent: PointPredicateContent = {
    title: "Valueless Wind Pair",
    description: <div className="subpredicate-description">
        <p>Your hand contains a pair of a valueless wind (neither seat nor prevailing).</p>
        </div>
};

const valuelessSuitedPairContent: PointPredicateContent = {
    title: "Suited Pair",
    description: <div className="subpredicate-description">
        <p>Your hand contains a suited pair (inherently valueless).</p>
        </div>
};

const valuelessPairContent: PointPredicateContent = {
    title: "Valueless Pair",
    description: <div className="subpredicate-description">
        <p>Your hand contains a valueless pair.</p>
        </div>
};

const winWithInitialHandContent: PointPredicateContent = {
    title: "Win With Initial Hand",
    description: <div className="subpredicate-description">
        <p>You win with the hand you started with or via first discard</p>
        </div>
};

const notSelfDrawContent: PointPredicateContent = {
    title: "Did Not Win via Self Draw",
    description: <div className="subpredicate-description">
        <p>You did not win via self draw</p>
        </div>
};

const winningTileIsOneCircleContent: PointPredicateContent = {
    title: "Winning Tile is One Circle",
    description: <div className="subpredicate-description">
        <p>Your winning tile is the One of Circles</p>
        </div>
};

const winningTileIsFiveCircleContent: PointPredicateContent = {
    title: "Winning Tile is Five Circle",
    description: <div className="subpredicate-description">
        <p>Your winning tile is the Five of Circles</p>
        </div>
};

const winningTileMeldIsFourFiveSixCircleContent: PointPredicateContent = {
    title: "Winning Tile Completes Four-Five-Six Circle Chow",
    description: <div className="subpredicate-description">
        <p>Your winning tile completes a Chow of 4-5-6 Circle</p>
        </div>
};

const winByAnyReplacementContent: PointPredicateContent = {
    title: "Win by Any Replacement",
    description: <div className="subpredicate-description">
        <p>Your winning tile is a replacement tile from either declaring a kong or from drawing a flower tile.</p>
        </div>
};

const winByAnyDoubleReplacementContent: PointPredicateContent = {
    title: "Win by Any Double Replacement",
    description: <div className="subpredicate-description">
        <p>Your winning tile is the second replacement tile from:</p>
        <ul>
            <li>declaring two kongs in a row</li>
            <li>drawing two flower tiles in a row</li>
            <li>a mix of the two (kong then flower, or flower then kong)</li>
        </ul>
        </div>
};

const seatWindIsEastContent: PointPredicateContent = {
    title: "Seat Wind is East",
    description: <div className="subpredicate-description">
        <p>Your Seat Wind is East.</p>
        </div>
};

const notSeatWindIsEastContent: PointPredicateContent = {
    title: "Seat Wind is Not East",
    description: <div className="subpredicate-description">
        <p>Your Seat Wind is not East (it is South, West, or North instead).</p>
        </div>
};

subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_ONE_PAIR, onePairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CHOWS, fourChowsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_KONGS, fourKongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_PONGS_AND_KONGS, fourPongsKongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_PONGS, fourConcealedPongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_PONGS_AND_KONGS, fourConcealedPongsKongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_NON_PAIR_MELDS, fourConcealedNonPairMeldsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_MELDS, fourConcealedMeldsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_EXPOSED_NON_PAIR_MELDS, fourExposedNonPairMeldsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_HAND_CONTAINS_NO_SUITS, handContainsNoSuitsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_HAND_CONTAINS_ONE_SUIT, handContainsOneSuitContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_HAND_CONTAINS_MORE_THAN_ONE_SUIT, handContainsMoreThanOneSuitContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_HAND_CONTAINS_HONORS, handContainsHonorsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_HAND_CONTAINS_NO_HONORS, handContainsNoHonorsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_IF_LAST_TILE_WAS_DISCARD_THEN_IT_COMPLETED_PAIR, ifLastTileWasDiscardThenItCompletedPair);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_IF_LAST_TILE_WAS_SELF_DRAWN_THEN_IT_COMPLETED_PAIR, ifLastTileWasSelfDrawnThenItCompletedPair);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_LAST_TILE_COMPLETED_PAIR, lastTileCompletedPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_THREE_WINDS_PONG_KONG, threeWindsPongKongContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_TWO_DRAGONS_PONG_KONG, twoDragonsPongKongContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_TWO_DRAGONS_PONG_KONG, twoDragonsPongKongContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_ALL_ONE_SUIT_WITH_SUFFICIENT_TILE_QUANTITIES_FOR_NINE_GATES, 
    allOneSuitWithSufficientTileQuantitiesForNineGatesContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_ALL_BAMBOO_AND_GREEN_DRAGON, allBambooAndGreenDragonContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_ALL_CHARACTER_AND_RED_DRAGON, allCharacterAndRedDragonContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_ALL_CIRCLE_AND_WHITE_DRAGON, allCircleAndWhiteDragonContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_DRAGON_PAIR, dragonPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WIND_PAIR, windPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_VALUED_WIND_PAIR, valuedWindPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_VALUELESS_WIND_PAIR, valuelessWindPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_VALUELESS_SUITED_PAIR, valuelessSuitedPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_VALUELESS_PAIR, valuelessPairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WIN_WITH_INITIAL_HAND, winWithInitialHandContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_NOT_SELF_DRAW, notSelfDrawContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WINNING_TILE_IS_ONE_CIRCLE, winningTileIsOneCircleContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WINNING_TILE_IS_FIVE_CIRCLE, winningTileIsFiveCircleContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WINNING_TILE_MELD_IS_FOUR_FIVE_SIX_CIRCLE_CHOW, winningTileMeldIsFourFiveSixCircleContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WIN_BY_ANY_REPLACEMENT, winByAnyReplacementContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_WIN_BY_ANY_DOUBLE_REPLACEMENT, winByAnyDoubleReplacementContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_SEAT_WIND_IS_EAST, seatWindIsEastContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_NOT_SEAT_WIND_IS_EAST, notSeatWindIsEastContent);
