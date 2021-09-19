import './App.css';
import Header from 'components/header/Header';
import TransNav from 'components/transNav/TransNav';

function App() {
  return (
    <div className="App">
      <Header className="App-header"/>
      <TransNav />
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
