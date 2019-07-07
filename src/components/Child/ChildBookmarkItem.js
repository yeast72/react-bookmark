import React from "react";
import Bookmark from "../Bookmark/Bookmark";

const ChildBookmarkItem = props => {
  const { name, url, id } = props;
  return (
    <div>
      <Bookmark name={name} url={url} />
    </div>
  );
};

export default ChildBookmarkItem;
