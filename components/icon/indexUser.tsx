import React from "react";
import iconProps from "./iconInterface";

const DeleteIcon = ({ fill, filled, size, height, width, ...props }: iconProps) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            fill="currentColor"
            viewBox="0 0 1024 1024"
            {...props}
        >
            <path
                d="M513.457231 41.353846c-133.377969 2.837662-244.999877 49.189415-332.973292 137.160862C92.512492 266.488123 46.160738 378.110031 43.323077 511.488c2.837662 133.377969 49.189415 244.054646 137.160862 332.026092C268.457354 931.487508 380.079262 977.839262 513.457231 980.676923c133.377969-2.837662 244.054646-49.189415 332.026092-137.160862S979.808492 644.867938 982.646154 511.488c-2.837662-133.377969-49.189415-244.054646-137.160862-332.026092C757.511877 90.543262 646.837169 44.191508 513.457231 41.353846L513.457231 41.353846zM811.431385 799.056738c-23.650462-11.352615-49.189415-23.648492-74.730338-26.486154-67.160615-5.675323-108.782277-16.080738-124.863015-32.161477-15.137477-16.082708-21.758031-38.784-18.9184-68.109785 0.945231-17.9712 5.675323-28.376615 16.080738-33.108677 10.405415-4.728123 21.756062-31.216246 33.108677-78.513231 3.784862-14.188308 7.567754-25.540923 12.297846-34.053908 4.728123-8.512985 12.295877-26.486154 21.756062-55.809969 4.730092-20.810831 4.730092-33.108677-0.945231-35.944369-5.675323-2.837662-9.460185-3.784862-10.403446-2.837662L669.538462 411.218708c2.837662-13.243077 4.728123-29.323815 6.620554-47.296985 5.677292-47.296985-3.782892-87.973415-28.378585-122.027323-24.593723-34.999138-69.998277-52.972308-137.160862-54.864738-59.594831 0.945231-90.811077 24.595692-125.810215 53.919508-38.784 30.271015-52.027077 70.945477-41.621662 122.972554 7.567754 38.784 18.9184 70.945477 11.350646 68.107815-0.945231-0.945231-4.728123 0-9.458215 2.837662-4.730092 2.837662-5.675323 15.135508-1.892431 35.944369 10.405415 25.540923 17.973169 43.514092 23.648492 52.974277 5.675323 9.458215 9.458215 21.756062 12.297846 36.8896 9.460185 46.351754 18.9184 71.892677 29.323815 76.6208 10.405415 4.730092 17.025969 17.027938 20.810831 34.999138 4.730092 29.325785-0.945231 52.027077-17.973169 68.109785-17.025969 16.080738-57.7024 26.486154-122.027323 32.161477-23.648492 2.837662-52.027077 14.188308-74.728369 25.540923-72.837908-75.675569-115.4048-175.946831-116.352-286.621538 2.837662-117.297231 43.514092-214.728862 122.027323-293.244062s175.946831-119.187692 293.244062-122.027323c117.295262 2.837662 214.728862 43.514092 292.296862 122.027323 78.513231 78.513231 119.189662 175.946831 122.027323 293.244062C926.834215 624.055138 884.267323 724.324431 811.431385 799.056738z"
                fill="currentColor"
            ></path>
        </svg>
    );
};
export default DeleteIcon;
