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
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
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
