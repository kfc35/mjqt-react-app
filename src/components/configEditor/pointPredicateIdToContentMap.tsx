import { PointPredicateID } from "mjqt-scoring";
import { ReactElement } from "react";

export interface PointPredicateContent {
    title: string,
    description: ReactElement,
    example?: string,
}

export const pointPredicateIdToContentMap: Map<string, PointPredicateContent> = new Map();

const allChowsContent: PointPredicateContent = {
    title: "All Chows (Consecutive Runs)",
    description: <div className="config-description"><p>All of your 3+ tile melds are consecutive runs.</p></div>,
};

const commonHandContent: PointPredicateContent = {
    title: "Common Hand",
    description: 
    <div className="config-description">
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
    description: <div className="config-description">
        <p>Your 3+ tile melds must be a mix of pongs or kongs.</p>
        </div>
};

const sevenPairsContent: PointPredicateContent = {
    title: "Seven Pairs",
    description: <div className="config-description">
        <p>Your hand is 14 tiles long and consists of 7 pairs. No kongs allowed.</p>
        </div>
};

const allKongsContent: PointPredicateContent = {
    title: "All Kongs",
    description: <div className="config-description">
        <p>All of your 3+ tile melds must be kongs.</p>
        </div>
};

const nineGatesContent: PointPredicateContent = {
    title: "Nine Gates",
    description: <div className="config-description">
        <p>A Concealed Hand of 1112345678999 in the same suit, with a duplicate of any number.</p>
        <p>It is called nine gates because, once you have 1112345678999, any duplicate can create a winning hand of a pair and four other 3-tile melds.</p>
        </div>
};

const thirteenOrphansContent: PointPredicateContent = {
    title: "Thirteen Orphans",
    description: <div className="config-description">
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
    description: <div className="config-description">
        <p>Your winning tile is drawn from the wall.</p>
        </div>
};

const robbingKongContent: PointPredicateContent = {
    title: "Robbing a Kong",
    description: <div className="config-description">
        <p>Your winning tile is the same tile being added to a previously exposed pong during another player's turn.</p>
        </div>
};

const winByLastTileContent: PointPredicateContent = {
    title: "Win By Last Tile",
    description: <div className="config-description">
        <p>Your winning tile is the last tile of the wall.</p>
        </div>
};

const winByLastDiscardContent: PointPredicateContent = {
    title: "Win By Last Discard",
    description: <div className="config-description">
        <p>Your winning tile is the last tile discarded of the whole game.</p>
        </div>
};

const winByKongContent: PointPredicateContent = {
    title: "Win By Kong",
    description: <div className="config-description">
        <p>Your winning tile is the replacement tile you picked up after declaring/promoting a kong.</p>
        </div>
};

const winByDoubleKongContent: PointPredicateContent = {
    title: "Win By Double Kong",
    description: <div className="config-description">
        <p>Your winning tile is the second replacement tile you picked up after declaring/promoting two kongs within the same turn.</p>
        </div>
};

const earthlyHandContent: PointPredicateContent = {
    title: "Earthly Hand",
    description: <div className="config-description">
        <p>Your seat wind is East and your initial hand is a winning hand.</p>
        </div>
};

const heavenlyHandContent: PointPredicateContent = {
    title: "Heavenly Hand",
    description: <div className="config-description">
        <p>Your seat wind is NOT East and your initial hand with East's first discard is a winning hand.</p>
        </div>
};

const lastOfItsKindContent: PointPredicateContent = {
    title: "Last Of Its Kind",
    description: <div className="config-description">
        <p>Your winning tile is the last of its kind (i.e., the fourth tile of it), and it is visible to all players that it was the last of its kind via discarded tiles and exposed melds.</p>
        </div>
};

const winByFlowerContent: PointPredicateContent = {
    title: "Win By Flower",
    description: <div className="config-description">
        <p>Your winning tile is the replacement tile after you picked up a flower tile.</p>
        </div>
};

const winByDoubleFlowerContent: PointPredicateContent = {
    title: "Win By Double Flower",
    description: <div className="config-description">
        <p>Your winning tile is the second replacement tile after you picked up two flower tiles in a row.</p>
        </div>
};

const winByMixedDoubleReplacementContent: PointPredicateContent = {
    title: "Win By Mixed Double Replacement",
    description: <div className="config-description">
        <p>Your winning tile is the second replacement tile you picked up after a combination of declaring/promoting a kong and a flower tile in any order.</p>
        </div>
};

/* Hands */
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

pointPredicateIdToContentMap.set(PointPredicateID.NINE_GATES, nineGatesContent);
pointPredicateIdToContentMap.set(PointPredicateID.THIRTEEN_ORPHANS, thirteenOrphansContent);
