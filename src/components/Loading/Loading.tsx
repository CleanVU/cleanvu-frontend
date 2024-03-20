import { LoadingVariant } from "./Loading.definitions";
import styles from "./Loading.module.css";
import { MoonLoader } from "react-spinners";
import type { LoadingProps } from "./Loading.definitions";

const Loading = ({ variant = LoadingVariant.MEDIUM }: LoadingProps) => {
  return (
    <div className={styles.loadingContainer}>
      <MoonLoader
        size={
          variant === LoadingVariant.SMALL
            ? 20
            : variant === LoadingVariant.MEDIUM
              ? 40
              : 60
        }
        color="#3fc5ff"
        loading={true}
      />
    </div>
  );
};

export default Loading;
