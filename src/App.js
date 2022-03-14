import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BillPage from "./Admin/pages/bills";
import Messenger from "./Admin/pages/messenger/Messenger";
import Context from './Admin/Context/Context'
function App() {
  return (
    <>
    <Context>
      <Router>
        <Route exact path="/bill">
          <BillPage />
        </Route>
        <Route exact path="/messenger">
          <Messenger />
        </Route>
      </Router>

    </Context>
    </>
  );
}

export default App;
