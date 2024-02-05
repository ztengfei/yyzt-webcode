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
                    transform="translate(-652.000000, -268.000000)"
                    fill="#FF6002"
                    fillRule="nonzero"
                >
                    <g transform="translate(120.000000, 80.000000)">
                        <g transform="translate(20.000000, 164.000000)">
                            <g transform="translate(51.000000, 0.000000)">
                                <g transform="translate(356.000000, 14.416149)">
                                    <g transform="translate(93.000000, 0.000000)">
                                        <g transform="translate(12.000000, 9.583851)">
                                            <path d="M8.98881362,17.9999838 L8.988814,17.9999838 C4.01826437,17.9937928 -0.00617376218,13.9593506 7.11007224e-06,8.98880562 C0.00619045867,4.01826062 4.04063636,-0.00617375642 9.011186,7.11006526e-06 C13.9817356,0.0061904529 18.0061738,4.0406326 17.9999929,9.0111776 C17.9954963,12.6242603 15.8307484,15.8843982 12.5024866,17.290483 L12.5024861,17.2904832 C11.3909206,17.7609628 10.1958435,18.0022752 8.9888135,17.9999838 L8.98881362,17.9999838 Z M8.98881362,1.10627223 C4.64989822,1.10627223 1.12120518,4.6360374 1.12120518,8.9736089 C1.12120518,13.311198 4.64991585,16.8399054 8.98881362,16.8399054 C13.327729,16.8399054 16.8537952,13.3109336 16.8537952,8.9736089 C16.8537952,4.63628421 13.3250846,1.10627223 8.98881362,1.10627223 Z"></path>
                                            <path d="M8.00196005,12.37734 L8.00196001,12.37734 C7.1735245,12.3761779 6.50227472,11.7048109 6.50125743,10.8763762 L6.50125743,7.07083104 L6.50125743,7.07098968 C6.50154369,6.2421759 7.17366371,5.57052127 8.00247826,5.57080678 C8.29697587,5.57090858 8.58493642,5.65765755 8.83048361,5.82024645 L11.6992645,7.72380354 L11.6992644,7.72380349 C12.3898945,8.18202173 12.5783023,9.1133464 12.1200854,9.80397401 C12.0093114,9.97093364 11.866224,10.1140207 11.6992644,10.2247946 L8.83048354,12.126765 L8.83048351,12.126765 C8.58490458,12.2899256 8.29666725,12.3770473 8.00182762,12.3772342 L8.00196005,12.37734 Z"></path>
                                        </g>
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
