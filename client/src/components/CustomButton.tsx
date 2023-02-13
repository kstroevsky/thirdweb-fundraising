import React from "react";

interface Button {
  btnType?: "button" | "submit" | "reset";
  title?: string;
  handleClick?: () => void;
  styles?: string;
}
const CustomButton = ({ btnType, title, handleClick, styles }: Button) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
