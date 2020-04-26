import React from 'react';
import toReact from 'svelte-adapter/react';
import './App.css';

import logo from './logo.svg';

import HelloComponent from './Hello.svelte';
const Hello = toReact(HelloComponent, {}, 'div');

function App() {
  const handleMessageFromSvelte = event => {
    console.log('React received message from Svelte', event);
    alert(`Message from Svelte -> "${event.detail.text}"`);
  }

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
        <Hello color="red" name="World" onMessage={handleMessageFromSvelte} />
      </header>
    </div>
  );
}

export default App;
