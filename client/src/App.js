//import logo from './logo.svg';
/* import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App () {
  return (
    <div>
      <Header />
 
     <Main />
    </div> */
 // );
//}
//export default App;

//---------------EN LA LINEA 10 BORRE:     {/* Your main content */}    NO ME DEJABA COMENTARLO

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;

import React, { useState } from 'react';
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


export default App;