// App.js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';

import Navigation from './components/Navigation';
import PageHeader from './components/PageHeader';
import AssetShowcase from './components/AssetShowcase';
import AssetEditor from './components/AssetEditor';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation>
          <Link to="/" className="nav__link"><p>Inspiration</p></Link>
          <Link to="/contribute" className="nav__link"><p>Contribute</p></Link>
        </Navigation>
        <Route exact path="/">
          <div className="app__content">
            <PageHeader></PageHeader>
            <AssetShowcase></AssetShowcase>
          </div>
        </Route>
        <Route exact path="/contribute">
          <AssetEditor></AssetEditor>
        </Route>
      </div>
    </Router>
  );
}

export default App;
