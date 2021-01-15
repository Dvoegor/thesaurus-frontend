import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./components/main"
import Nav from "./components/nav"
import About from "./components/about";
import Login from "./components/login";
import Admin from "./components/admin";
import Edit from "./components/edit";
import Create from "./components/create";
import Delete from "./components/delete";

function App() {
  return (
    <div className="App">
      <Nav/>
      <div class="container">
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/login" component={Login} />
              <Route path="/edit/:id" component={Edit} />
              <Route path="/create" component={Create} />
              <Route path="/delete/:id" component={Delete} />
            </Switch>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
