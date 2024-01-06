import React from "react";
import iconProps from "./iconInterface";

const LeftIcon = ({ fill, filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            fill={filled ? fill : "none"}
            {...props}
        >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-1216.000000, -314.000000)">
                    <g transform="translate(121.000000, 259.000000)">
                        <g transform="translate(0.000000, 33.000000)">
                            <g transform="translate(1078.181818, 10.000000)">
                                <g transform="translate(17.818182, 12.000000)">
                                    <g
                                        opacity="0.899999976"
                                        transform="translate(0.000000, 1.000000)"
                                        fill={fill || "#FF6002"}
                                        fill-rule="nonzero"
                                        stroke={fill || "#FF6002"}
                                        stroke-width="0.3"
                                    >
                                        <g>
                                            <path
                                                d="M12.4605007,12.8310006 C12.8201674,12.8310006 13,13.0246667 13,13.4120003 L13,13.4190003 C13,13.806334 12.8201674,14 12.4605007,14 L0.539499324,14 C0.1798326,14 0,13.806334 0,13.4190003 L0,13.4120003 C0,13.0246667 0.1798326,12.8310006 0.539499324,12.8310006 L12.4605007,12.8310006 Z M6.50649848,0 C6.8661652,0 7.0459978,0.193666013 7.0459978,0.58099968 L7.045,10.83 L11.560902,5.96747552 C11.8152245,5.69358947 12.0695471,5.69358947 12.3238697,5.96747552 L12.3284659,5.97242527 C12.5827885,6.24631131 12.5827885,6.52019736 12.3284659,6.7940834 L6.91415548,12.6248833 C6.6598329,12.8987694 6.40551033,12.8987694 6.15118775,12.6248833 L6.14659156,12.6199336 L6.096,12.56 L0.656078818,6.70172113 C0.401756242,6.42783509 0.401756242,6.15394904 0.656078818,5.880063 L0.660675013,5.87511325 C0.914997589,5.6012272 1.16932017,5.6012272 1.42364274,5.87511325 L5.96,10.761 L5.96049915,0.58099968 C5.96049915,0.193666013 6.14033175,0 6.49999848,0 L6.50649848,0 Z"
                                                id="形状结合"
                                            ></path>
                                        </g>
                                    </g>
                                    <g transform="translate(0.000000, 13.831001)"></g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default LeftIcon;
