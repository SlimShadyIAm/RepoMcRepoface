import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Repo = ({ repoUrl, manager }) => {
	const repoFormats = {
		'cydia': 'cydia://url/https:/cydia.saurik.com/api/share#?source=',
		'sileo': 'sileo://source/',
		'zebra': 'zbra://sources/add/',
		'installer': 'installer://add/'
	}

	const isValidHttpUrl = (string) => {
		let url;
		
		try {
			url = new URL(string);
		} catch (_) {
			return false;  
		}

		return url.protocol === "http:" || url.protocol === "https:";
	}

	// useEffect(() => {
		
	// })

	if (!isValidHttpUrl(repoUrl)) {
		return (
			<p style={{color: 'red'}}>Invalid url!</p>
		)
	} else if (manager !== undefined && !(manager in repoFormats)) {
		return (
			<p style={{color: 'red'}}>Invalid manager!</p>
		)
	}

	if (manager !== undefined) {
		window.location = `${repoFormats[manager]}${repoUrl}`
		return (
			<p>Redirecting you to <a href={`${repoFormats[manager]}${repoUrl}`}>{repoFormats[manager]}{repoUrl}</a>... (click if it didn't work)</p>
		)
	}

	return (
		<div>
			{Object.keys(repoFormats).map(thisManager => (
				<a href={`${repoFormats[thisManager]}${repoUrl}`}>Add to {thisManager.charAt(0).toUpperCase() + thisManager.slice(1)} <br/></a>
			))}
		</div>
	);
}

export default Repo;
