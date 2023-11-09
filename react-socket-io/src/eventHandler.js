import React, { useState, useEffect } from 'react';
import { socket } from './socket';

const EventHandler = () => {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		return () => {
			function onConnect() {
				console.log('Client connected');
			}

			function onDisconnect() {
				console.log('Client disconnected');
			}

			function onEvent(message) {
				setMessages((prevMessages) => [...prevMessages, message]);
				console.log('msg received - ' + message);
			}

			socket.on('connect', onConnect);
			socket.on('disconnect', onDisconnect);
			socket.on('message', onEvent);
		};
	}, []);

	const sendMessage = () => {
		socket.emit('message', message);
		console.log('msg send - ', message);
	};

	return (
		<div>
			<b>
				<span>Messages received: </span>
			</b>
			<br />
			<br />
			<div>
				{messages.map((msg, index) => (
					<div key={index}>{msg}</div>
				))}
			</div>
			<br />
			<br />
			<br />
			<b>
				<span>Send message: </span>
			</b>
			<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};

export default EventHandler;
