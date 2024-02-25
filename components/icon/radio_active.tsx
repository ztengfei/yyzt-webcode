import React from "react";
import iconProps from "./iconInterface";

const DeleteIcon = ({ fill, filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg
            width={size || width || 18}
            height={size || height || 19}
            fill={filled ? fill : "none"}
            {...props}
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-687.000000, -1343.000000)">
                    <g transform="translate(120.000000, 948.000000)">
                        <g transform="translate(567.000000, 380.000000)">
                            <g transform="translate(0.000000, 15.000000)">
                                <g transform="translate(0.000000, 0.080000)">
                                    <rect
                                        fill="#FF6002"
                                        x="0"
                                        y="0"
                                        width="18"
                                        height="18"
                                        rx="4"
                                    ></rect>
                                    <polyline
                                        stroke="#FFFFFF"
                                        points="4.51303155 8.9017552 8.23423743 11.978844 13.9230318 5.77825732"
                                    ></polyline>
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
