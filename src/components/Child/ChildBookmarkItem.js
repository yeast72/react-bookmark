import React from "react";
import Bookmark from "../Bookmark/Bookmark";

const ChildBookmarkItem = props => {
  const { name, url, id } = props;
  return <Bookmark name={name} url={url} />;
};

export default ChildBookmarkItem;
