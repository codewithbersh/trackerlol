interface LogoProps extends React.HTMLAttributes<SVGElement> {
  color?: string;
}

export const Logo = ({ color = "#3B82F6", ...props }: LogoProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_646_2480)">
        <path
          d="M9.64258 4.92969H13.4138V8.70092"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.28476 15.7711L6.81335 15.2997C6.31326 14.7996 6.0323 14.1213 6.0323 13.4141C6.0323 12.7068 6.31326 12.0285 6.81335 11.5284L13.413 4.92878"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3561 19.0712H10.5848V15.2999"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.7138 8.22956L17.1852 8.70097C17.6853 9.20106 17.9662 9.87934 17.9662 10.5866C17.9662 11.2938 17.6853 11.9721 17.1852 12.4722L10.5855 19.0719"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.829 10.1141L13.8862 9.17132C13.3655 8.65063 12.5212 8.65063 12.0006 9.17132L9.17212 11.9998C8.65142 12.5205 8.65142 13.3647 9.17212 13.8854L10.1149 14.8282C10.6356 15.3489 11.4799 15.3489 12.0006 14.8282L14.829 11.9998C15.3497 11.4791 15.3497 10.6348 14.829 10.1141Z"
          stroke={color}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_646_2480">
          <rect
            width="16"
            height="16"
            fill={color}
            transform="translate(0.685547 12) rotate(-45)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
