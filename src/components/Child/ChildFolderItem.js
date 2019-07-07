import React, { Component } from "react";
import Folder from "../Folder/Folder";

export default class ChildFolderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id, onSelectFolder } = this.props;
    const handleSelectFolder = () => {
      console.log("hello");
      return onSelectFolder;
    };
    return (
      <div onClick={onSelectFolder}>
        <Folder name={name} id={id} />
      </div>
    );
  }
}
