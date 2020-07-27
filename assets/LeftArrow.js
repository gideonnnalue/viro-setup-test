import * as React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 450 630" width="450" height="630">
    <defs>
        <path d="M375.22 489.24L374.6 618.51L72.53 313.61L377.47 11.49L376.85 140.55L199.54 315.34L199.54 315.34L375.22 489.24Z" id="b1M8hOOz6K"></path>
        <path d="M376.05 212.42L269.68 317.8L375.06 424.11" id="a41mzSCwK4"></path>
    </defs>
    <g>
        <g>
            <g>
                <use xlink:href="#b1M8hOOz6K" opacity="1" fill="#dc1c4e" fill-opacity="1"></use>
                <g>
                    <use xlink:href="#b1M8hOOz6K" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use>
                </g>
            </g>
            <g>
                <use xlink:href="#a41mzSCwK4" opacity="1" fill="#dc1c4e" fill-opacity="1"></use>
                <g>
                    <use xlink:href="#a41mzSCwK4" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use>
                </g>
            </g>
        </g>
    </g>
</svg>
`
const xmlFocused = `
`

export default ({focused, width, height, style}) => <SvgCss xml={focused ? xmlFocused : xml} width={width} height={height} style={style}/>