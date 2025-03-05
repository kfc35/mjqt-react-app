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

subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_ONE_PAIR, onePairContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CHOWS, fourChowsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_KONGS, fourKongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_PONGS_AND_KONGS, fourPongsKongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_PONGS, fourConcealedPongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_PONGS_AND_KONGS, fourConcealedPongsKongsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_NON_PAIR_MELDS, fourConcealedNonPairMeldsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_CONCEALED_MELDS, fourConcealedMeldsContent);
subPointPredicateIdToContentMap.set(PointPredicateID.SUBPREDICATE_CONTAINS_FOUR_EXPOSED_NON_PAIR_MELDS, fourExposedNonPairMeldsContent);