import React from "react";
import iconProps from "./iconInterface";

const DeleteIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
    ...props
}: iconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            fill={filled ? fill : "none"}
            {...props}
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-370.000000, -322.000000)" fillRule="nonzero">
                    <g transform="translate(120.000000, 61.000000)">
                        <g transform="translate(19.000000, 56.000000)">
                            <g transform="translate(59.470878, 205.000000)">
                                <g transform="translate(172.000000, 0.000000)">
                                    <path
                                        d="M18,9 C18,3.98571429 14.0142857,0 9,0 C3.98571429,0 0,3.98571429 0,9 C0,14.0142857 3.98571429,18 9,18 C14.0142857,18 18,14.0142857 18,9 Z"
                                        fill="#DBDBDB"
                                    ></path>
                                    <path
                                        d="M12.6,13.5 L9,9.9 L5.4,13.5 C5.14285714,13.7571429 4.75714286,13.7571429 4.5,13.5 C4.24285714,13.2428571 4.24285714,12.8571429 4.5,12.6 L8.1,9 L4.5,5.4 C4.24285714,5.14285714 4.24285714,4.75714286 4.5,4.5 C4.75714286,4.24285714 5.14285714,4.24285714 5.4,4.5 L9,8.1 L12.6,4.5 C12.8571429,4.24285714 13.2428571,4.24285714 13.5,4.5 C13.7571429,4.75714286 13.7571429,5.14285714 13.5,5.4 L9.9,9 L13.5,12.6 C13.7571429,12.8571429 13.7571429,13.2428571 13.5,13.5 C13.2428571,13.7571429 12.8571429,13.7571429 12.6,13.5 Z"
                                        fill="#FFFFFF"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default DeleteIcon;
