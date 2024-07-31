import styled from "./styles.module.css";
interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<ISkeletonProps> & {
  MultiLine: React.FC<ISkeletonProps>;
  Square: React.FC<ISkeletonProps>;
  Circle: React.FC<ISkeletonProps>;
} = ({ width = "100%", height = "1rem", ...props }) => {
  const skeletonStyle: React.CSSProperties = { width, height };
  return <div className={styled.skeleton} style={skeletonStyle} {...props}></div>;
};

Skeleton.MultiLine = ({ height = "1rem" }: ISkeletonProps) => {
  return (
    <>
      <Skeleton width={"40%"} height={height} />
      <Skeleton width={"100%"} height={height} />
      <Skeleton width={"100%"} height={height} />
      <Skeleton width={"60%"} height={height} />
    </>
  );
};

Skeleton.Square = ({ width = "10rem" }: ISkeletonProps) => {
  return <Skeleton width={width} height={width} />;
};

Skeleton.Circle = ({ width = "10rem" }: ISkeletonProps) => {
  return <Skeleton style={{ borderRadius: "50%", width, height: width }} />;
};

export default Skeleton;
