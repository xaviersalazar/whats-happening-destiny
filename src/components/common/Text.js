import classNames from "classnames";

export const Text = ({ classes, children, light, regular }) => {
  const classnames = classNames(
    "text-white",
    { light: !!light },
    { regular: !!regular },
    classes
  );

  return <p className={classnames}>{children}</p>;
};
