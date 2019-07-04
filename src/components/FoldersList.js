import React from "react";

const FoldersList = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

export default FoldersList;
