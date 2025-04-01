import { PointPredicateResult, RootPointPredicateConfiguration, PointPredicateBaseConfiguration, MAX_POINTS } from "mjqt-scoring";
import { pointPredicateIdToContentMap } from "../../content/pointPredicateIdToContentMap";
import { subPointPredicateIdToContentMap } from "../../content/subPointPredicateIdToContentMap";
import { ResultType } from "./ResultType";
import { PointPredicateContent } from "../../content/pointPredicateContent";

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

    let content = pointPredicateIdToContentMap.get(props.result.pointPredicateId);
    if (!content) {
        content = subPointPredicateIdToContentMap.get(props.result.pointPredicateId);
        if (!content) {
            return <></>;
        }
    }

    if (props.resultType === ResultType.SUCCESS) {
        return generateSuccessResultElement(props.result, content,baseConfig, props.rootConfig);
    }

    if (props.resultType === ResultType.FAILURE) {
        return generateFailureResultElement(props.result, content);
    }

    if (props.resultType === ResultType.IGNORED) {
        return generateIgnoredResultElement(props.result, content);
    }
    
    return <></>;
}

function generateSuccessResultElement(result: PointPredicateResult, content: PointPredicateContent, 
    baseConfig: PointPredicateBaseConfiguration, rootConfig: RootPointPredicateConfiguration) {
    const points: string = baseConfig.points === MAX_POINTS ? rootConfig.maxPoints + " (max)" : baseConfig.points + "";
    return <>
        <div className="success result" key={result.pointPredicateId}>
            {content.title} - Success: +{points} pt(s)
        </div>
    </>;
}

function generateFailureResultElement(result: PointPredicateResult, content: PointPredicateContent) {
    return <>
        <div className="failure result" key={result.pointPredicateId}>
            {content.title} - Failure
        </div>
    </>;
}

function generateIgnoredResultElement(result: PointPredicateResult, content: PointPredicateContent) {
    return <>
        <div className="ignored result" key={result.pointPredicateId}>
            {content.title} - Points ignored (included by other successful result).
        </div>
    </>;
}

export default Result;