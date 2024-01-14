import React from "react";
import iconProps from "./iconInterface";

const DeleteIcon = ({ fill, filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            fill={filled ? fill : "none"}
            viewBox="0,0,256,256"
            {...props}
        >
            <g
                fill="#ff6002"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
            >
                <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.68359,0 -23,10.31641 -23,23c0,12.68359 10.31641,23 23,23c12.68359,0 23,-10.31641 23,-23c0,-12.68359 -10.31641,-23 -23,-23zM22,34h-5v-18h5zM33,34h-5v-18h5z"></path>
                </g>
            </g>
        </svg>
    );
};
export default DeleteIcon;
