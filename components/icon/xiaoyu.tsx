import React from "react";
import iconProps from "./iconInterface";

const RoleIcon = ({ fill = "currentColor", filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg viewBox="0 0 1024 1024" width="18" height="18">
            <path
                d="M714.59446201 57.186462l71.67999999 74.200615-450.95384699 467.652923-71.60123001-74.27938501z"
                fill="currentColor"
            ></path>
            <path
                d="M335.63569199 451.426462l450.95384601 467.652923-71.68 74.279384L264.113231 525.705846z"
                fill="currentColor"
            ></path>
        </svg>
    );
};
export default RoleIcon;
