import React from "react";
import { Link } from "react-router-dom";

const Folder = ({ name, id }) => <Link to={id}>{name}</Link>;

export default Folder;
