import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Main_file';

function App() {
  return (
    <div id = "Main">
    <Navbar title = "Expense Tracker App"/><hr></hr><br/>
    <Textform/>
    </div>
  );
}

export default App;

