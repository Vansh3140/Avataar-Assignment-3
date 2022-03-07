	import React,{ useState } from 'react';
	import './App.css';
	import Editor from "@monaco-editor/react";
	import Navbar from './Components/Navbar';
	import Axios from 'axios';
	import spinner from './spinner.svg';

	function App() {

	// State variable to set users source code
	const [userCode, setUserCode] = useState(``);

	// State variable to set editors default language
	const [userLang, setUserLang] = useState("python");

	// State variable to set users input
	const [userInput, setUserInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");

	// Loading state variable to show spinner
	// while fetching data
	const [loading, setLoading] = useState(false);




	// Function to call the compile endpoint
	function compile() {
		setLoading(true);
		if (userCode === ``) {
		return
		}

		// Post request to compile endpoint
		Axios.post(`http://localhost:8000/compile`, {
		code: userCode,
		language: userLang,
		input: userInput }).then((res) => {
		setUserOutput(res.data.output);
		}).then(() => {
		setLoading(false);
		})
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}


	return (
		<>
		<div className="App">
		<Navbar
			userLang={userLang} setUserLang={setUserLang}
		/>
		<div className="main">
			<div className="lcontainer">
			<Editor
				height="calc(100vh - 50px)"
				width="100%"
				language={userLang}
				defaultLanguage="python"
				defaultValue="# Enter your code here"
				onChange={(value) => { setUserCode(value) }}
			/>
			<button className="run-btn" onClick={() => compile()}>
				Run
			</button>
			</div>
			<div className="rcontainer">
			<h4>Input:</h4>
			<div className="input-box">
				<textarea id="code-inp" onChange=
				{(e) => setUserInput(e.target.value)}>
				</textarea>
			</div>
			<h4>Output:</h4>
			{loading ? (
				<div className="spinner-box">
				<img src={spinner} alt="Loading..." />
				</div>
			) : (
				<div className="output-box">
				<pre>{userOutput}</pre>
				<button onClick={() => { clearOutput() }}
					className="clear-btn">
					Clear
				</button>
				</div>
			)}
			</div>
		</div>
		</div>
		</>
);
}

export default App;
