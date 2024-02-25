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
                <g transform="translate(-687.000000, -870.000000)" fill="#FFFFFF" stroke="#C0C0C0">
                    <g transform="translate(120.000000, 633.000000)">
                        <g transform="translate(567.000000, 222.000000)">
                            <g transform="translate(0.000000, 15.000000)">
                                <g transform="translate(0.000000, 0.080000)">
                                    <rect x="0.5" y="0.5" width="17" height="17" rx="4"></rect>
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
