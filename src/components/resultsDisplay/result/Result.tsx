import { PointPredicateResult, RootPointPredicateConfiguration, PointPredicateBaseConfiguration, MAX_POINTS, 
    PointPredicateFailureResult, PointPredicateSingleSuccessResult, SubPredicateResultsType } from "mjqt-scoring";
import { pointPredicateIdToContentMap } from "../../../content/pointPredicateIdToContentMap";
import { subPointPredicateIdToContentMap } from "../../../content/subPointPredicateIdToContentMap";
import { ResultType } from "./ResultType";
import { PointPredicateContent } from "../../../content/pointPredicateContent";
import MeldDetail from "./detail/MeldDetail";
import TileDetail from "./detail/TileDetail";
import { ReactElement } from "react";

interface ResultProps {
    resultType: ResultType
    result: PointPredicateResult
    rootConfig: RootPointPredicateConfiguration
}

function Result(props: ResultProps) {
    const baseConfig = props.rootConfig.getBaseConfiguration(props.result.pointPredicateId);
    if (!baseConfig) {
        return <></>;
    }

    const content = findContent(props.result.pointPredicateId);
    if (!content) {
        return <></>;
    }

    if (props.resultType === ResultType.SUCCESS) {
        return generateSuccessTopLevelResultElement(props.result, content,baseConfig, props.rootConfig);
    }

    if (props.resultType === ResultType.FAILURE) {
        return generateFailureTopLevelResultElement(props.result, content);
    }

    if (props.resultType === ResultType.IGNORED) {
        return generateIgnoredResultElement(props.result, content);
    }
    
    return <></>;
}

function generateSuccessTopLevelResultElement(result: PointPredicateResult, content: PointPredicateContent, 
    baseConfig: PointPredicateBaseConfiguration, rootConfig: RootPointPredicateConfiguration) {
    const points: string = baseConfig.points === MAX_POINTS ? rootConfig.maxPoints + " (max)" : baseConfig.points + "";
    if (result.subPredicateResults.length === 0) {
        generateResultElement(result, content, points);
    } else {
        const subpredicateResultsText = getSubResultsTypeText(result);

        return <>
            <div className="success result" key={result.pointPredicateId}>
                <details>
                    <summary>{content.title} - Success: +{points} pt(s)</summary>
                    Subpredicate Results <br />
                    {subpredicateResultsText} {(subpredicateResultsText ? <br /> : <></>)}
                    {generateSubElements(result)}
                </details>
            </div>
        </>;
    }
}

function generateResultElement(result: PointPredicateResult, content: PointPredicateContent, points?: string) {
    if (result instanceof PointPredicateSingleSuccessResult) {
        return generateSingleSuccessResultElement(result, content, points);
    } else if (result instanceof PointPredicateFailureResult) {
        return generateFailureResultElement(result, content);
    }
    return undefined;
}

function getSubResultsTypeText(result: PointPredicateResult): string | undefined {
    switch (result.subPredicateResultsType) {
        case SubPredicateResultsType.AND:
            return "All subpredicates must evaluate to true for this result to be successful";
        case SubPredicateResultsType.OR:
            return "At least one subpredicate must evaluate to true for this result to be successful";
        default:
            return undefined;
    } 
}

function generateSubElements(result: PointPredicateResult): ReactElement {
    const subElements: ReactElement[]= [];
    for (const subResult of result.subPredicateResults) {
        const subContent = findContent(subResult.pointPredicateId);
        if (!subContent) {
            continue;
        }
        const resultElement = generateResultElement(subResult, subContent);
        if (resultElement) {
            subElements.push(resultElement);
        }
    }
    return <>
        <div className="sub-results">
            {subElements}
        </div>
        </>;
}

function generateSingleSuccessResultElement(result: PointPredicateSingleSuccessResult, content: PointPredicateContent, points?: string) {
    const meldDetail = result.meldDetail ? <><MeldDetail melds={result.meldDetail.meldsThatSatisfyPredicate} /></>: undefined;
    const tileDetail = result.tileDetail ? <><TileDetail tilesList={result.tileDetail.tilesThatSatisfyPredicate} /></>: undefined;
    const optionalPointsString = points ? `: +${points} pt(s)` : ``;
    if (meldDetail || tileDetail) {
        // prefer meldDetail over tileDetail if meldDetail is defined
        return <div className="success result" key={result.pointPredicateId}>
            <details>
                <summary>{content.title} - Success{optionalPointsString}</summary>
            {meldDetail ? meldDetail : tileDetail}
            </details>
        </div>;
    } else {
        return <div className="success result" key={result.pointPredicateId}>
            {content.title} - Success
        </div>;
    }
}

function generateFailureResultElement(result: PointPredicateFailureResult, content: PointPredicateContent) {
    const meldDetail = result.meldDetail ? <><MeldDetail melds={result.meldDetail.meldsThatFailPredicate} /></>: undefined;
    const tileDetail = result.tileDetail ? <><TileDetail tilesList={result.tileDetail.tilesThatFailPredicate} /></>: undefined;
    if (meldDetail || tileDetail) {
        // prefer meldDetail over tileDetail if meldDetail is defined
        return <div className="failure result" key={result.pointPredicateId}>
            <details>
                <summary>{content.title} - Failure</summary>
            {meldDetail ? meldDetail : tileDetail}
            </details>
        </div>;
    } else {
        return <div className="failure result" key={result.pointPredicateId}>
            {content.title} - Failure
        </div>;
    }
}

function generateFailureTopLevelResultElement(result: PointPredicateResult, content: PointPredicateContent) {
    if (result.subPredicateResults.length === 0) {
        generateResultElement(result, content);
    } else {
        const subpredicateResultsText = getSubResultsTypeText(result);

        return <div className="failure result" key={result.pointPredicateId}>
                <details>
                    <summary>{content.title} - Failure</summary>
                    Subpredicate Results <br />
                    {subpredicateResultsText} {(subpredicateResultsText ? <br /> : <></>)}
                    {generateSubElements(result)}
                </details>
            </div>;
    }
}

function generateIgnoredResultElement(result: PointPredicateResult, content: PointPredicateContent) {
    return <>
        <div className="ignored result" key={result.pointPredicateId}>
            {content.title} - Points ignored (included by other successful result).
        </div>
    </>;
}

function findContent(pointPredicateId: string) {
    let content = pointPredicateIdToContentMap.get(pointPredicateId);
    if (!content) {
        content = subPointPredicateIdToContentMap.get(pointPredicateId);
        if (!content) {
            return undefined;
        }
    }
    return content;
}

export default Result;