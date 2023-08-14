//import logo from './logo.svg';
/* import './App.css';
import Header from './components/Header';

function App () {
  return (
    <div>
      <Header />

    </div>
  );
}
export default App;
 */


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


//--------------Jess experiments



//import React from 'react';
import './App.css';
import Header from './components/Header';
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
      <Header />
      {showLoginForm ? (
        <LoginForm onSwitchForm={handleFormSwitch} />
      ) : (
        <SignForm onSwitchForm={handleFormSwitch} />
      )}
    </div>
  );
}


export default App;
