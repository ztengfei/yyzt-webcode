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
                    id="15"
                    transform="translate(-560.000000, -268.000000)"
                    fill={fill || "#FF5200"}
                    fillRule="nonzero"
                    stroke={fill || "#FF5200"}
                    strokeWidth="0.4"
                >
                    <g transform="translate(120.000000, 80.000000)">
                        <g transform="translate(20.000000, 164.000000)">
                            <g transform="translate(51.000000, 0.000000)">
                                <g transform="translate(356.000000, 14.416149)">
                                    <g transform="translate(14.000000, 10.000000)">
                                        <path d="M13.2857143,3.01973684 C13.7584319,3.01973684 14.1428571,3.42102282 14.1428571,3.91447368 L14.1428571,15.2105263 C14.1428571,15.7039772 13.7584319,16.1052632 13.2857143,16.1052632 L4.21414621,16.1052632 C3.74142857,16.1052632 3.35700335,15.7039772 3.35700335,15.2105263 L3.35700335,3.91447368 C3.35700335,3.42102282 3.74142857,3.01973684 4.21414621,3.01973684 L13.2857143,3.01973684 M13.2857143,2.125 L4.21414621,2.125 C3.27128906,2.125 2.49986049,2.93026316 2.49986049,3.91447368 L2.49986049,15.2105263 C2.49986049,16.1947368 3.27128906,17 4.21414621,17 L13.2857143,17 C14.2285714,17 15,16.1947368 15,15.2105263 L15,3.91447368 C15,2.93026316 14.2285714,2.125 13.2857143,2.125 Z M1.66670759,14.025 C1.20728237,14.025 0.833353795,13.6436184 0.833353795,13.175 L0.833353795,1.7 C0.833353795,1.23138158 1.20728237,0.85 1.66672433,0.85 L10.8334319,0.85 C11.2928571,0.85 11.6667857,1.23138158 11.6667857,1.7 L12.5001562,1.7 C12.5001562,0.765 11.7501562,0 10.8334152,0 L1.66672433,0 C0.75,0 0,0.765 0,1.7 L0,13.175 C0,14.11 0.75,14.875 1.66670759,14.875 L3.33343192,14.875 L3.33343192,14.025 L1.66670759,14.025 Z"></path>
                                    </g>
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
