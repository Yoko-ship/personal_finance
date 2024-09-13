import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Income from "./components/Income";
import Expenditures from "./components/Expenditures";

function App() {
  

  return (
    <>
      <Router>
        <header>
          <div className="texts">
            <h1>Мой Финансовый Помощник</h1>
            <div></div>
          </div>
          <div className="texts">
            <span>
              «Управляйте своими финансами, как никогда раньше! Создавайте
              категории расходов, следите за доходами,
              <br />
              планируйте бюджет и получайте полезные отчеты для достижения
              финансовой стабильности.»
            </span>
          </div>
        </header>
        <div className="buttons-main">
        <ul>
            <button>
              <Link to="/"><img src="/home.png"/></Link>
            </button>

            <button>
              <Link to="/expenditures"><img src="/expense.png"/></Link>
            </button>
            <button>
              <Link to="/Incomes"><img src="/salary.png"/></Link>
            </button>
          </ul>
        </div>

        <Routes>
            <Route path="/"/>
            <Route path="/expenditures" element={<Expenditures/>}/>
            <Route path="/Incomes" element={<Income/>}/>
          </Routes>

      </Router>

     
    </>
  );
}

export default App;
