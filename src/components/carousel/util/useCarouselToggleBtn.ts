import {BasicCarouselToggleBtn, ToggleBtnProps} from "../toggle-btn/BasicCarouselToggleBtn";

type CarouselToggleBtnType = 'Basic'

const useCarouselToggleBtn = (type: CarouselToggleBtnType): React.ComponentType<ToggleBtnProps> => {
    switch (type) {
        default:
            return BasicCarouselToggleBtn
    }
}

export {useCarouselToggleBtn, type CarouselToggleBtnType}