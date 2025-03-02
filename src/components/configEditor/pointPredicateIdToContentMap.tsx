import { PointPredicateID } from "mjqt-scoring";

export interface PointPredicateContent {
    title: string,
    description: string,
}

export const pointPredicateIdToContentMap: Map<string, PointPredicateContent> = new Map();

const allChowsContent: PointPredicateContent = {
    title: "All Chows (Consecutive Runs)",
    description: "All of your melds are consecutive runs in Suited Tiles"
};

const commonHandContent: PointPredicateContent = {
    title: "Common Hand",
    description: "1) All of your melds are consecutive runs in two or more different Suited Tiles. \n " + 
    "2) You win by self-draw. \n " + 
    "3) You have no flower tiles.\n " + 
    "This rule can be configured to enforce that your pair must be valueless (no dragons or seat/prevailing wind pair). "
};

const allPongsAndKongsContent: PointPredicateContent = {
    title: "All Triples",
    description: "All of your melds must be a mix of pongs and kongs (three-of-a-kinds and four-of-a-kinds)."
};

const sevenPairsContent: PointPredicateContent = {
    title: "Seven Pairs",
    description: "Your hand is 14 tiles long and consists of 7 pairs. No kongs allowed."
};

const allKongsContent: PointPredicateContent = {
    title: "All Kongs",
    description: "All of your melds must be kongs (four-of-a-kind)."
};

const selfDrawContent: PointPredicateContent = {
    title: "Win By Self Draw",
    description: "Your winning tile was drawn from the wall (not eaten from someone else)."
};

pointPredicateIdToContentMap.set(PointPredicateID.ALL_CHOWS, allChowsContent);
pointPredicateIdToContentMap.set(PointPredicateID.COMMON_HAND, commonHandContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_PONGS_AND_KONGS, allPongsAndKongsContent);
pointPredicateIdToContentMap.set(PointPredicateID.SEVEN_PAIRS, sevenPairsContent);
pointPredicateIdToContentMap.set(PointPredicateID.ALL_KONGS, allKongsContent);

pointPredicateIdToContentMap.set(PointPredicateID.SELF_DRAW, selfDrawContent);
