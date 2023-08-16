//import logo from './logo.svg';
 import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Dashboard from './components/Dashboard';

function App () {
  return (
    <div>
    <Header />
     <Main />
    <Dashboard/>

    </div> 
  );
}
export default App; 

//---------------EN LA LINEA 10 BORRE:     {/* Your main content */}    NO ME DEJABA COMENTARLO

/*  function App() {
   return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
       <p>
           Edit <code>src/App.js</code> and save to reload.
         </p>
         <a
           className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn React
         </a>
       </header>
     </div>
   );
 }

export default App; */



//LOGIN SIGN IN 
/* import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignForm from './components/SignForm';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleFormSwitch = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      {showLoginForm ? (
        <LoginForm onSwitchForm={handleFormSwitch} />
      ) : (
        <SignForm onSwitchForm={handleFormSwitch} />
      )}
    </div>
  );
}


export default App; */


// USER PROFILE USE
/* import React from 'react';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;
  */