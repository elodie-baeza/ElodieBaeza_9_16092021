import './App.css';
import Header from 'components/header/Header';
import TransNav from 'components/transNav/TransNav';
// import Dashboard from 'pages/dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import Router from 'router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header className="App-header"/>
        <TransNav />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
