import { PointPredicateLogicOption } from "mjqt-scoring";

export interface PointPredicateLogicOptionContent {
    title: string,
    description: string,
}

export const pointPredicateLogicOptionToContentMap: Map<string, PointPredicateLogicOptionContent> = new Map();

const concealedHandLastDiscardedTileMustCompletePair = {
    title: "Concealed Hand: Winning Tile via Discard must complete Pair",
    description: "A regular concealed hand can be won by discard. \n" + 
     "This option, when enabled restricts concealed hands such that the discard can only complete the pair, implying that you drew from the wall to complete your four non-pair melds. \n" + 
     "If disabled, there is no restriction on the type of meld your last tile completes if it is a discard, as long as every other meld is concealed. \n" +
     "Default = false for HK, true for international."
}

const meldedHandLastDiscardedTileMustCompletePair = {
    title: "Melded Hand: Winning Tile via Discard must complete Pair",
    description: "A regular melded hand is won when all four non-pair melds are exposed. \n" + 
     "This option, when enabled, restricts melded hands such that your winning tile via discard can only complete the pair. \n" + 
     "If disabled, a win via discard can also be used to satisfy your fourth (now exposed) meld. \n" +
     "Default = true."
}

const meldedHandAllowSelfDrawToCompletePair = {
    title: "Melded Hand: Allow Self Draw to Complete Pair",
    description: "This option allows melded hands to win via self draw for their pair, as long as there are four already exposed non-pair melds. \n" + 
    "If disabled, you must win via discard. \n " + 
    "Default = false."
}

const selfTripletsOnlyPongsAllowed = {
    title: "Self Triplets: Only Pongs Allows",
    description: "This option enforces that a self drawn hand of 'triplets' can only contain pongs (three-of-a-kinds), rather than a mix of pongs and 'concealed kongs' (four-of-a-kinds). \n" +
    "Default = true."
}

const plumBlossomOnRoofAnyReplacementAllowed = {
    title: "Plum Blossom on Roof: Any Replacement Allowed",
    description: "This option allows the Plum Blossom on Roof condition to be satisfied when taking a replacement tile from either a flower tile or as a result of a kong, rather than only from a kong. \n" +
    "Default = false."
}

const commonHandMustHaveValuelessPair = {
    title: "Common Hand: Must have Valueless Pair",
    description: "This option restricts common hands to also have a valueless pair (pair is not of a dragon, your seat wind, or the round prevailing wind. \n" + 
    "Default = false."
}

pointPredicateLogicOptionToContentMap.set(PointPredicateLogicOption.CONCEALED_HAND_LAST_DISCARDED_TILE_MUST_COMPLETE_PAIR, 
    concealedHandLastDiscardedTileMustCompletePair);

pointPredicateLogicOptionToContentMap.set(PointPredicateLogicOption.MELDED_HAND_LAST_DISCARDED_TILE_MUST_COMPLETE_PAIR, 
    meldedHandLastDiscardedTileMustCompletePair);

pointPredicateLogicOptionToContentMap.set(PointPredicateLogicOption.MELDED_HAND_ALLOW_SELF_DRAW_TO_COMPLETE_PAIR, 
    meldedHandAllowSelfDrawToCompletePair);

pointPredicateLogicOptionToContentMap.set(PointPredicateLogicOption.SELF_TRIPLETS_ONLY_PONGS_ALLOWED, 
    selfTripletsOnlyPongsAllowed);

pointPredicateLogicOptionToContentMap.set(PointPredicateLogicOption.PLUM_BLOSSOM_ON_ROOF_ANY_REPLACEMENT_ALLOWED,
    plumBlossomOnRoofAnyReplacementAllowed);

pointPredicateLogicOptionToContentMap.set(PointPredicateLogicOption.COMMON_HAND_MUST_HAVE_VALUELESS_PAIR,
    commonHandMustHaveValuelessPair);