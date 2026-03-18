import React, { FC } from 'react'

// component
const FireAnim: FC = () => {
  // return
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <g>
        <path
          className="fire-path"
          d="M3.42845 13.9258C1.32825 11.3835 2.0928 8.07658 2.7376 6.74093C2.87576 6.64882 3.20736 6.68567 3.42845 7.56997C3.64955 8.45426 4.99439 9.04378 5.63917 9.22801C5.501 8.76744 4.94831 7.33286 4.94831 5.22106C4.94831 3.59245 6.4682 1.35225 7.29722 0.523224C8.12625 -0.305803 8.81711 -0.0294606 8.67894 0.523224C8.54077 1.07591 8.95528 3.14848 10.0606 4.25385C11.166 5.35922 13.7913 7.15544 13.9294 9.22801C14.0676 11.3006 13.3768 13.5113 11.5805 14.7549C9.78431 15.9984 6.05371 17.1038 3.42845 13.9258Z"
          fill="url(#paint0_linear_1_26062)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_26062"
          x1="8.00001"
          y1="0"
          x2="8.00001"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default FireAnim
