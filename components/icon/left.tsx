import React from "react";
import iconProps from "./iconInterface";

const LeftIcon = ({ fill = "currentColor", filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            fill={filled ? fill : "none"}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-119.000000, -299.000000)" stroke="#FFEBD5">
                    <g transform="translate(119.000000, 102.000000)">
                        <g transform="translate(0.000000, 197.000000)">
                            <g transform="translate(1.000000, 1.000000)">
                                <path
                                    d="M0,21.0000127 C0,32.5980223 9.40200313,42.0000254 21.0000127,42.0000254 C32.5980223,42.0000254 42.0000254,32.5980223 42.0000254,21.0000127 C42.0000254,9.40200313 32.5980223,0 21.0000127,0 C9.40200313,0 0,9.40200313 0,21.0000127"
                                    opacity="0.364389329"
                                    fill-rule="nonzero"
                                ></path>
                                <polyline
                                    stroke-width="1.2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    points="24.3282568 12.8623167 16.1425726 20.4941749 24.3282568 29.1287699"
                                ></polyline>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default LeftIcon;
