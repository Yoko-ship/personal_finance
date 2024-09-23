import "./App.css";
import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Income from "./components/Income";
import Expenditures from "./components/Expenditures";
import homeImage from "./components/assert/home.png"
import expenseImage from "./components/assert/expense.png"
import salaryImage from "./components/assert/salary.png"
import AuntificationImage from "./components/assert/signup.png"
import singInImage from "./components/assert/sign-in.png"
import SingUp from "./components/auth/SingUp";
import SingIn from "./components/auth/SingIn";
import AuthDetails from "./components/auth/AuthDetails";



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
              <Link to="/"><img src={homeImage}/></Link>
            </button>

            <button>
              <Link to="/expenditures"><img src={expenseImage}/></Link>
            </button>
            <button>
              <Link to="/Incomes"><img src={salaryImage}/></Link>
            </button>
            <button>
              <Link to="/signUp"><img src={AuntificationImage}/></Link>
            </button>
            <button>
              <Link to="signIn"><img src={singInImage}/></Link>
            </button>
            <AuthDetails/>
          </ul>
        </div>

        <Routes>
            <Route path="/"/>
            <Route path="/expenditures" element={<Expenditures/>}/>
            <Route path="/Incomes" element={<Income/>}/>
            <Route path="/signUp" element={<SingUp/>}/>
            <Route path="/signIn" element={<SingIn/>}/>
          </Routes>

      </Router>

     
    </>
  );
}

export default App;
