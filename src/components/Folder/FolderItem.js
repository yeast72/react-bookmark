import React, { Component } from "react";
import Folder from "../Folder/Folder";

export default class FolderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, id } = this.props;
    return (
      <div>
        <Folder name={name} id={id} />
      </div>
    );
  }
}
