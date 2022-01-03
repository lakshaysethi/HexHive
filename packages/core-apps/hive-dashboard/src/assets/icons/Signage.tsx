import * as React from "react";

function SvgSignage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50.61 102.48"
      {...props}
    >
      <path
        d="M19.94 102.49A20 20 0 016.23 68.04a3.02 3.02 0 014.15 4.39 13.92 13.92 0 1019.68.55 3.013 3.013 0 114.38-4.14 19.94 19.94 0 01-14.5 33.65zM8.86 46.36a3 3 0 01-2.08-.83 19.95 19.95 0 01-.73-28.21c2-2.17 6.67-9.2 9.15-13l1.43-2.17c.73-1.09 1.42-2.11 3-2.15s2.34 1 3.13 2l1.59 2.13c2.7 3.63 7.72 10.39 9.89 12.45a19.95 19.95 0 01.73 28.21 3.017 3.017 0 11-4.37-4.16 13.91 13.91 0 00-.52-19.68c-2.27-2.16-6.27-7.44-10.22-12.75-3.63 5.51-7.29 11-9.46 13.26a13.92 13.92 0 00.51 19.68 3 3 0 01-2.07 5.21z"
        fill="#394427"
      />
      <path
        d="M19.94 84.58a3 3 0 01-3-3V32.04a3 3 0 016 0v49.53a3 3 0 01-3 3.01z"
        fill="#394427"
      />
      <path
        d="M31.53 59.82H9.24a3 3 0 010-6h22.29a3 3 0 110 6zM50.48 75.81c0-.35.08-.71.13-1.05a9.65 9.65 0 00-.13 1.05z"
        fill="#394427"
      />
    </svg>
  );
}

export default SvgSignage;
