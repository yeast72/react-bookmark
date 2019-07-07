import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ name, id }) => {
  return (
    <Link to={id}>
      <FontAwesomeIcon icon={faFolder} />
      {name}
    </Link>
  );
};

export default Folder;
