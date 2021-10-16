import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loading = ({ style }) => {
  return (
    <div className={style}>
      <Loader type="Oval" color="#0e0e0e" height={25} width={25} />
    </div>
  );
};
