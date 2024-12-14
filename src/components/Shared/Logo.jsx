import { Link } from "react-router-dom";

const Logo = ({ size }) => {
  return (
    <Link
      to="/"
      className={`flex items-center ${
        size === "sm" ? "flex-row gap-2" : " flex-col"
      }`}
    >
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="55.000000pt" height="55.000000pt" viewBox="0 0 55.000000 55.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,55.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M245 400 c-3 -5 -2 -10 4 -10 5 0 13 5 16 10 3 6 2 10 -4 10 -5 0
-13 -4 -16 -10z"/>
<path d="M155 376 c-27 -5 -54 -15 -58 -20 -11 -15 2 -137 17 -151 6 -6 28
-14 49 -18 20 -3 51 -16 68 -27 16 -12 33 -19 37 -15 4 4 0 10 -8 13 -15 5 86
30 128 31 38 1 52 24 52 83 -1 60 -17 88 -51 88 -13 0 -40 4 -59 9 -60 15
-123 18 -175 7z m205 -66 c0 -7 -32 -10 -90 -9 -50 1 -90 5 -90 9 0 4 40 8 90
9 58 1 90 -2 90 -9z m-190 -42 c0 -12 -1 -19 -3 -17 -1 2 -9 12 -16 22 -12 14
-11 17 3 17 10 0 16 -8 16 -22z m91 4 c6 10 28 15 74 16 64 1 65 1 54 -21 -12
-21 -12 -21 -19 -2 -7 19 -8 19 -15 2 -6 -14 -10 -15 -21 -6 -8 6 -14 7 -14 2
0 -16 -128 -14 -134 2 -7 21 16 25 43 8 21 -13 25 -13 32 -1z m-111 -42 c0 -5
-4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m220 2 c0
-4 -47 -9 -105 -10 -58 -1 -105 2 -105 6 0 4 47 8 105 10 58 1 105 -2 105 -6z
m30 4 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z"/>
</g>
</svg>


      <h1 className="text-gray-600 font-medium leading-10 tracking-widest">
        Kwara Talents Harvest
      </h1>
    </Link>
  );
};

export default Logo;
