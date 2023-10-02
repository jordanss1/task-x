import { ReactElement } from "react";
import { SVGPropsType } from "./svgTypes";

const Clipboard = ({ size }: SVGPropsType): ReactElement => {
  size = size ?? 60;

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      xmlSpace="preserve"
    >
      <g id="Layer_1">
        <g>
          <circle fill="#77B3D4" cx="32" cy="32" r="32" />
        </g>
        <g opacity="0.2">
          <path
            fill="#231F20"
            d="M48,14H16c-2.2,0-4,1.8-4,4v5.5V50c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V23.5V18C52,15.8,50.2,14,48,14z"
          />
        </g>
        <g>
          <path
            fill="#E0995E"
            d="M48,12H16c-2.2,0-4,1.8-4,4v5.5V48c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V21.5V16C52,13.8,50.2,12,48,12z"
          />
        </g>
        <g opacity="0.2">
          <rect x="16" y="18" fill="#231F20" width="32" height="32" />
        </g>
        <g>
          <rect x="16" y="16" fill="#FFFFFF" width="32" height="32" />
        </g>
        <g>
          <rect x="22" y="24" fill="#E0E0D1" width="20" height="2" />
        </g>
        <g>
          <rect x="22" y="28" fill="#E0E0D1" width="20" height="2" />
        </g>
        <g>
          <rect x="22" y="32" fill="#E0E0D1" width="20" height="2" />
        </g>
        <g>
          <rect x="22" y="36" fill="#E0E0D1" width="20" height="2" />
        </g>
        <g>
          <rect x="22" y="40" fill="#E0E0D1" width="20" height="2" />
        </g>
        <g opacity="0.2">
          <path
            fill="#231F20"
            d="M37,12H27h-3v3v1v1c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-1v-1v-3H37z"
          />
        </g>
        <g>
          <path
            fill="#4F5D73"
            d="M37,10H27h-3v3v1v1c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-1v-1v-3H37z"
          />
        </g>
      </g>
      <g id="Layer_2"></g>
    </svg>
  );
};

export default Clipboard;
