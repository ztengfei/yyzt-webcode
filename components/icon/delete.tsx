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
                <g
                    transform="translate(-1283.000000, -276.000000)"
                    fill="#DBDBDB"
                    fillRule="nonzero"
                >
                    <g transform="translate(480.000000, 257.000000)">
                        <g transform="translate(803.000000, 19.000000)">
                            <path d="M23,11.5 C23,5.09285714 17.9071429,0 11.5,0 C5.09285714,0 0,5.09285714 0,11.5 C0,17.9071429 5.09285714,23 11.5,23 C17.9071429,23 23,17.9071429 23,11.5 Z M16.1,17.25 L11.5,12.65 L6.9,17.25 C6.57142857,17.5785714 6.07857143,17.5785714 5.75,17.25 C5.42142857,16.9214286 5.42142857,16.4285714 5.75,16.1 L10.35,11.5 L5.75,6.9 C5.42142857,6.57142857 5.42142857,6.07857143 5.75,5.75 C6.07857143,5.42142857 6.57142857,5.42142857 6.9,5.75 L11.5,10.35 L16.1,5.75 C16.4285714,5.42142857 16.9214286,5.42142857 17.25,5.75 C17.5785714,6.07857143 17.5785714,6.57142857 17.25,6.9 L12.65,11.5 L17.25,16.1 C17.5785714,16.4285714 17.5785714,16.9214286 17.25,17.25 C16.9214286,17.5785714 16.4285714,17.5785714 16.1,17.25 Z"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default DeleteIcon;
