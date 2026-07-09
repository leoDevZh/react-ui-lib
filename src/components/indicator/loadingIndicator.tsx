import {ComponentType} from "react";
import {Spinner, SpinnerProps} from "./spinner/Spinner";

type LoadingIndicator =
    | "spinner"
    | { type: "spinner"; props?: SpinnerProps }
    | { component: ComponentType<any>; props?: any }

const renderLoadingIndicator = (
    indicator?: LoadingIndicator
) => {
    if (!indicator || indicator === "spinner") {
        return <Spinner/>
    }

    if ("type" in indicator && indicator.type === "spinner") {
        return <Spinner {...indicator.props} />
    }

    if ("component" in indicator) {
        const Component = indicator.component
        return <Component {...indicator.props} />
    }

    return <Spinner/>
}

export {renderLoadingIndicator, type LoadingIndicator}
