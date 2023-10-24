interface LogoProps extends React.HTMLAttributes<SVGElement> {
  color?: string;
}

export const Logo = ({ color = "#4f46e5", ...props }: LogoProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.33333 14H5.66667C4.95942 14 4.28115 13.719 3.78105 13.219C3.28095 12.7189 3 12.0406 3 11.3333L3 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M9.66602 2H10.3327C11.0399 2 11.7182 2.28095 12.2183 2.78105C12.7184 3.28115 12.9993 3.95942 12.9993 4.66667V14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M8.66667 4.66602H7.33333C6.59695 4.66602 6 5.26297 6 5.99935V9.99935C6 10.7357 6.59695 11.3327 7.33333 11.3327H8.66667C9.40305 11.3327 10 10.7357 10 9.99935V5.99935C10 5.26297 9.40305 4.66602 8.66667 4.66602Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
