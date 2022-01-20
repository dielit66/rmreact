import './App.css';

import Header from "./components/Header";
import MainContent from "./components/MainContent";

function App() {
  return (

    <div className="App">
        <Header></Header>
        <div className={'wrapper'}>
<MainContent></MainContent>
        </div>

    </div>
  );
}

export default App;
