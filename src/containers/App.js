import React from "react";
import FolderContainer from "./FolderContainer";
import ChildContainer from "./ChildContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <Router>
      <FolderContainer>
        <Route exact path="/" component={ChildContainer} />
        <Route path="/:id" component={ChildContainer} />
      </FolderContainer>
    </Router>
  </div>
);

export default App;
