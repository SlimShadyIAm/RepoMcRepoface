import { h } from 'preact';
import style from './style.css';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

const Home = () => {
	const [repo, setRepo] = useState('');

	return (
		<div class={style.home}>
			<h1 class={style.title}>Repo McRepoface</h1>
			<h2 class={style.subtitle}>Sharable links for jailbreak tweak repositories</h2>
			<form class={style.form} onSubmit={(e) => {
				e.preventDefault()
				route(`/repo/?repoUrl=${repo}`)
			}}>
				<input class={style.field} type="text" name="name" placeholder='https://...' onInput={e => setRepo(e.target.value)} value={repo} />
				<input class={style.submit} type="submit" value="submit" />
			</form>
			<p class={style.plug}>By <a href="https://github.com">SlimShadyIAm</a></p>
		</div>
	)
}

export default Home;
