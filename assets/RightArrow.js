import * as React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 450 630" width="450" height="630">
    <defs>
        <path d="M74.78 489.24L75.4 618.51L377.47 313.61L72.53 11.49L73.15 140.55L250.46 315.34L250.46 315.34L74.78 489.24Z" id="g44wNXCwQ7"></path>
        <path d="M73.95 212.42L180.32 317.8L74.94 424.11" id="a8lA1jBcrT"></path>
    </defs>
    <g>
        <g>
            <g>
                <use xlink:href="#g44wNXCwQ7" opacity="1" fill="#dc1c4e" fill-opacity="1"></use>
                <g>
                    <use xlink:href="#g44wNXCwQ7" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use>
                </g>
            </g>
            <g>
                <use xlink:href="#a8lA1jBcrT" opacity="1" fill="#dc1c4e" fill-opacity="1"></use>
                <g>
                    <use xlink:href="#a8lA1jBcrT" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use>
                </g>
            </g>
        </g>
    </g>
</svg>
`
const xmlFocused = `
`

export default ({focused, width, height, style}) => <SvgCss xml={focused ? xmlFocused : xml} width={width} height={height} style={style}/>