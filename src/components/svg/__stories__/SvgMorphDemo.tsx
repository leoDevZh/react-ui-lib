// Start shape for the Default story — star
export const CIRCLE_PATH =
    'M 100 15 C 146.4 15 185 53.6 185 100 C 185 146.4 146.4 185 100 185 C 53.6 185 15 146.4 15 100 C 15 53.6 53.6 15 100 15 Z'

// Start shape for the Diamond story — diamond / rhombus
export const STAR_PATH =
    'M100 15 L120 75 L185 75 L133 113 L153 178 L100 140 L47 178 L67 113 L15 75 L80 75 Z'

export function StarSvgForMorph() {
    return (
        <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <path
                d={STAR_PATH}
                fill="none"
                stroke="#667eea"
                strokeWidth="5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    )
}

export function CircleSvgForMorph() {
    return (
        <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <path
                d={CIRCLE_PATH}
                fill="none"
                stroke="#f5576c"
                strokeWidth="5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    )
}