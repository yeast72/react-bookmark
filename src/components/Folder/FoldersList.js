import React from "react";

const FoldersList = props => {
  const { title, children } = props;
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default FoldersList;
