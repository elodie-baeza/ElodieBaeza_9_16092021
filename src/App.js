import './App.css';
import Header from 'components/header/Header';
import TransNav from 'components/transNav/TransNav';
import Dashboard from 'pages/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Header className="App-header"/>
      <TransNav />
      <Dashboard />
    </div>
  );
}

export default App;
