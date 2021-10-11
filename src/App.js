import './App.css';
import Header from 'components/header/Header';
import SideBar from 'components/sideBar/SideBar';
import { BrowserRouter } from 'react-router-dom';
import Router from 'router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header className="App-header"/>
        <SideBar />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
