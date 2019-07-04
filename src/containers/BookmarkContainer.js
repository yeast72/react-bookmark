import React from "react";
import { connect } from "react-redux";
import { getRootFolder } from "../reducers";
import BookmarksList from "../components/BookmarksList";
import FolderItem from "../components/FolderItem";

const BookmarkContainer = ({ match }) => {
  return <BookmarksList title="Bookmark bar">{match.params.id}</BookmarksList>;
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(BookmarkContainer);
