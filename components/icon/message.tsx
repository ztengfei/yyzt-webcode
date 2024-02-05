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
                    transform="translate(-136.000000, -258.000000)"
                    fill="currentColor"
                    fillRule="nonzero"
                >
                    <g transform="translate(120.000000, 62.000000)">
                        <g transform="translate(0.000000, 184.000000)">
                            <g transform="translate(16.823529, 12.000000)">
                                <path d="M16.6247148,3 C18.5828904,3 20.1764706,4.74978288 20.1764706,6.90240147 L20.1764706,6.90240147 L20.1764706,16.0942638 C20.1764706,18.2502302 18.5828819,20 16.6247148,20 L16.6247148,20 L5.72822638,20 C3.7700508,20 2.17647059,18.2468824 2.17647059,16.0942638 L2.17647059,16.0942638 L2.17647059,6.90573617 C2.17647059,4.7497698 3.77005925,3 5.72822638,3 L5.72822638,3 Z M16.6247148,4.33575305 L5.72822638,4.33575305 C4.48624231,4.33575305 3.47470294,5.48850318 3.47470294,6.90237967 L3.47470294,6.90237967 L3.47470294,16.0909073 C3.47470294,17.5081316 4.48625076,18.657534 5.72822638,18.657534 L5.72822638,18.657534 L16.6247148,18.657534 C17.8677807,18.657534 18.8782382,17.5047838 18.8782382,16.0909073 L18.8782382,16.0909073 L18.8782382,6.90237967 C18.8782382,5.48515541 17.8677723,4.33575305 16.6247148,4.33575305 L16.6247148,4.33575305 Z M4.60039131,8.0478894 C4.75633767,7.71477481 5.14455648,7.57513208 5.46750234,7.73598847 L5.46750234,7.73598847 L10.8086381,10.3963571 C11.0399386,10.5168913 11.3130026,10.5168913 11.5443031,10.3963571 L11.5443031,10.3963571 L16.8854389,7.73598844 C17.2083847,7.58071155 17.5966037,7.7203547 17.7525499,8.0534691 C17.9084962,8.38658349 17.7731158,8.78702629 17.4501699,8.94788268 L17.4501699,8.94788268 L12.1090341,11.6082513 C11.5211233,11.9072972 10.8318177,11.9072972 10.2439069,11.6082512 L10.2439069,11.6082512 L4.90277127,8.94230299 C4.57982519,8.78144637 4.44444517,8.3810038 4.60039131,8.0478894 Z"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
export default DeleteIcon;
