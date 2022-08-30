interface Props {
  sideBarWidth: number;
  children: React.ReactNode;
}

export const WrapperSidebar: React.FC<Props> = (props: Props) => {
  return (
    <div
      style={{
        minWidth: props.sideBarWidth
          ? `calc(100% - ${props.sideBarWidth}px)`
          : "100%",
      }}
    >
      {props.children}
    </div>
  );
};
