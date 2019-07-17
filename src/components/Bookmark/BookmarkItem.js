import React from "react";
import Bookmark from "../Bookmark/Bookmark";

const BookmarkItem = props => {
  const { name, url, id } = props;
  return (
    <div>
      <Bookmark name={name} url={url} />
    </div>
  );
};

export default BookmarkItem;
