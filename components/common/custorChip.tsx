import React from "react";

const CustomChip = (props: { color: string; children: any }) => {
    if (props.color == "error") {
        return (
            <span className="bg-[#FFF1F1] border border-[#FF2828] text-[#FF2828] rounded p-1 text-sm">
                {props.children}
            </span>
        );
    }

    return (
        <span className="bg-[#F1FDF4] border border-[#09C438] text-[#09C438] rounded p-1 text-sm">
            {props.children}
        </span>
    );
};

export default CustomChip;
