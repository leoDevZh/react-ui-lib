import {ComponentType} from "react";

type DialogCTO = { component: ComponentType<any>; props?: any }

const renderDialogCTO = (
    dto: DialogCTO
) => {
    const Component = dto.component
    return <Component {...dto.props} />
}

export {renderDialogCTO, type DialogCTO}