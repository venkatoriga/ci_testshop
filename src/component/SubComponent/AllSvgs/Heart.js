import React from "react";

const Heart = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="24"
      viewBox="0 0 27 24"
      fill="none"
    >
      <path
        d="M24.0283 2.76422C26.3092 5.18627 26.8945 9.41084 24.2538 12.2434L13.5085 22.6105L2.76321 12.2435C0.0998985 9.38695 0.689465 5.16287 2.97171 2.7491C4.08934 1.56707 5.55629 0.890425 7.16642 1.01469C8.78033 1.13924 10.7224 2.08382 12.7383 4.51833L13.5085 5.44851L14.2787 4.51833C16.2947 2.08366 18.2337 1.14261 19.8431 1.02103C21.4488 0.899737 22.9122 1.57902 24.0283 2.76422Z"
        stroke={fill ? fill :"#211E24"}
        stroke-width="2"
        stroke-linecap="round"
        fill={fill ?fill :null}
      />
    </svg>
  );
};

export default Heart;
