import React from "react";

const Bookmark = ({ id, name, url }) => (
  <div>
    <a href={url} target="_blank">
      {name}
    </a>
  </div>
);

export default Bookmark;
