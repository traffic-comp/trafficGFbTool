import { JSX } from "react";
import { ButtonProps } from "./Button.props";

import s from "./button.module.css";

const Button = ({
  type,
  squere,
  posX,
  posY,
  blue,
  rotate,
  red,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  switch (type) {
    case "squere":
      return (
        <button
          className={`${s.squere} ${blue ? s.blue : s.white} ${
            rotate && s.rotate
          }  ${red && s.red}`}
          style={{ left: posX, top: posY }}
          {...props}
        >
          {children}
        </button>
      );

    default:
      return (
        <button className={s.btn} {...props}>
          {children}
        </button>
      );
  }
};

export default Button;
