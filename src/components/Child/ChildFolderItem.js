import React from "react";
import Folder from "../Folder/Folder";

const ChildFolderItem = props => {
  const { name, id } = props;
  return <Folder name={name} id={id} />;
};

export default ChildFolderItem;
