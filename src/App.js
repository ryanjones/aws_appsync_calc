//import './App.css';
import { Link } from "react-router-dom";


function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appsync-calc">Appsync Calculator</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
