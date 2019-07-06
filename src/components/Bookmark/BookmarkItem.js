import React from "react";
import Bookmark from "./Bookmark";

const BookmarkItem = ({ bookmark }) => {
  const { id, name, url } = bookmark;
  return (
    <div>
      <Bookmark id={id} name={name} url={url} />
    </div>
  );
};

export default BookmarkItem;
