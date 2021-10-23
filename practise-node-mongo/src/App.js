import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './Components/Products/Products';
import AddProducts from './Components/AddProducts/AddProducts';
import UpdateProducts from './Components/UpdateProducts/UpdateProducts';

function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/addproducts">Add products</Link>
            </li>
            <li>
              <Link to="/update">Update products</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/addproducts">
            <AddProducts />
          </Route>
          <Route path="/product/:id">
            <UpdateProducts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
