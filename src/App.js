// App.js
import './App.scss';

import Navigation from './components/Navigation';
import PageHeader from './components/PageHeader';
import AssetShowcase from './components/AssetShowcase';

function App() {
  return (
    <div className="app">
      <Navigation>
        <a className="nav__link"><p>Inspiration</p></a>
        <a className="nav__link"><p>Contribute</p></a>
      </Navigation>
      <div className="app__content">
        <PageHeader></PageHeader>
        <AssetShowcase></AssetShowcase>
      </div>

    </div>
  );
}

export default App;
