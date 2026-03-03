import {BasicIndexIndicator, CarouselIndexIndicatorProps} from "../index-indicator/BasicIndexIndicator";
import {NumberIndexIndicator} from "../index-indicator/NumberIndexIndicator";

type CarouselIndexIndicatorType = 'Basic' | 'Numbers'

const useCarouselIndicator = (type: CarouselIndexIndicatorType): React.ComponentType<CarouselIndexIndicatorProps> => {
    switch (type) {
        case "Numbers":
            return NumberIndexIndicator
        default:
            return BasicIndexIndicator
    }
}

export {useCarouselIndicator, type CarouselIndexIndicatorType}