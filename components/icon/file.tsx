import React from "react";
import iconProps from "./iconInterface";

const DeleteIcon = ({ fill, filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            fill={filled ? fill : "none"}
            {...props}
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                    transform="translate(-136.000000, -121.000000)"
                    stroke="currentColor"
                    strokeWidth="1.2"
                >
                    <g transform="translate(120.000000, 62.000000)">
                        <g transform="translate(0.000000, 46.000000)">
                            <g transform="translate(16.823529, 13.000000)">
                                <path d="M13.1357673,5.85813947 L18.4326381,5.85813947 C18.9849229,5.85813947 19.4326381,6.30585472 19.4326381,6.85813947 L19.4326381,16.2755176 C19.4326381,16.8278023 18.9849229,17.2755176 18.4326381,17.2755176 L4.08417687,17.2755176 C3.53189213,17.2755176 3.08417687,16.8278023 3.08417687,16.2755176 L3.08417687,4.68135311 C3.08417687,4.12906836 3.53189213,3.68135311 4.08417687,3.68135311 L8.3116646,3.68135311 C8.99361068,3.68135311 9.65520734,3.91369284 10.1874148,4.34007967 L11.2600171,5.19941291 C11.7922246,5.62579974 12.4538212,5.85813947 13.1357673,5.85813947 Z"></path>
                                <line
                                    x1="3.525881"
                                    y1="8.92231235"
                                    x2="19.4326381"
                                    y2="8.92231235"
                                ></line>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default DeleteIcon;
