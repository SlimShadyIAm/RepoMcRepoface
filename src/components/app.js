import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Repo from '../routes/repo';

const App = () => (
	<div id="app">
		{/* <Header /> */}
		<Router>
			<Home path="/" />
			<Repo path="/repo/" />
			{/* <Repo path="/repo/:user" /> */}
		</Router>
	</div>
)

export default App;
