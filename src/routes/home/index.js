import { h } from 'preact';
import style from './style.css';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

const Home = () => {
	const [repo, setRepo] = useState('');

	return (
		<div class={style.home}>
			<h1>Home</h1>
			<form onSubmit={(e) => {
				e.preventDefault()
				route(`/repo/?repoUrl=${repo}`)
			}}>
				<label>
					Input the name of the repo:
					<input type="text" name="name" onInput={e => setRepo(e.target.value)} value={repo} />
				</label>
				<input type="submit" value="submit" />
			</form>
		</div>
	)
}

export default Home;
