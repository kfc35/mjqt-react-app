import { PointPredicateID } from "mjqt-scoring";
import { ReactElement } from "react";

export interface PointPredicateContent {
    title: string,
    description: ReactElement,
}

export const pointPredicateIdToContentMap: Map<string, PointPredicateContent> = new Map();

const allChowsContent: PointPredicateContent = {
    title: "All Chows (Consecutive Runs)",
    description: <div className="config-description">All of your melds are consecutive runs in Suited Tiles.</div>
};

const commonHandContent: PointPredicateContent = {
    title: "Common Hand",
    description: 
    <div className="config-description">
        <ol>
        <li>All of your melds are consecutive runs in two or more different Suited Tiles.</li>
        <li>You win by self-draw.</li> 
        <li>You have no flower tiles.</li>
        </ol>
        <p>This rule can be customized to enforce whether your pair must be valueless (no dragons or seat/prevailing wind pair).</p>
    </div>
};

const allPongsAndKongsContent: PointPredicateContent = {
    title: "All Triples",
    description: <div className="config-description">All of your melds must be a mix of pongs and kongs (three-of-a-kinds and four-of-a-kinds).</div>
};

const sevenPairsContent: PointPredicateContent = {
    title: "Seven Pairs",
    description: <div className="config-description">Your hand is 14 tiles long and consists of 7 pairs. No kongs allowed.</div>
};

const allKongsContent: PointPredicateContent = {
    title: "All Kongs",
    description: <div className="config-description">All of your melds must be kongs (four-of-a-kind).</div>
};

const selfDrawContent: PointPredicateContent = {
    title: "Win By Self Draw",
    description: <div className="config-description">Your winning tile was drawn from the wall (not eaten from someone else).</div>
};

const nineGatesContent: PointPredicateContent = {
    title: "Nine Gates",
    description: <div className="config-description">A Concealed Hand of 1112345678999 (three 1's, three 9's, and one of every other number 2-8) in the same suit, with a duplicate of any number.</div>
};

const thirteenOrphansContent: PointPredicateContent = {
    title: "Thirteen Orphans",
    description: <div className="config-description">A Concealed Hand consisting of one 1 and one 9 in every suit, one of every dragon, and one of every wind, with a duplicate of any of the preceding tiles.</div>
};

pointPredicateIdToContentMap.set(PointPredicateID.ALL_CHOWS, allChowsContent);
pointPredicateIdToContentMap.set(PointPredicateID.COMMON_HAND, commonHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_PONGS_AND_KONGS, allPongsAndKongsContent);
pointPredicateIdToContentMap.set(PointPredicateID.SEVEN_PAIRS, sevenPairsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_KONGS, allKongsContent);

pointPredicateIdToContentMap.set(PointPredicateID.SELF_DRAW, selfDrawContent);

pointPredicateIdToContentMap.set(PointPredicateID.NINE_GATES, nineGatesContent);
pointPredicateIdToContentMap.set(PointPredicateID.THIRTEEN_ORPHANS, thirteenOrphansContent);