import { JSX } from "react";
import { LoaderProps } from "./Loader.props";
import s from "./loader.module.css";
const Loader = ({ isLoading }: LoaderProps): JSX.Element => {
  return (
    <>
      {isLoading ? (
        <div className={s.loader}>
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Loader;
