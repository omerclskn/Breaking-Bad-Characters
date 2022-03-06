import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Header from "./components/Header/Header";
import Quotes from "./pages/Quotes";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/char/:char_id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
