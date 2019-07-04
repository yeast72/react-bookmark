import React from "react";
import FolderContainer from "./FolderContainer";
import BookmarkContainer from "./BookmarkContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <Router>
      <FolderContainer>
        <Route path="/:id" component={BookmarkContainer} />
      </FolderContainer>
    </Router>
  </div>
);

export default App;
