import './App.css';
import React from 'react';
import EventHandler from './eventHandler';

function App() {
	return (
		<div className="App">
			<h1>Socket.io POC</h1>
			<EventHandler />
		</div>
	);
}

export default App;
