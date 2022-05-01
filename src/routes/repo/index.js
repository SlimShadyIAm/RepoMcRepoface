import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Repo = ({ repoUrl, manager }) => {
	const repoFormats = {
		cydia: {
			urlFormat: 'cydia://url/https:/cydia.saurik.com/api/share#?source=',
			color: "#c2582f",
			iconUrl: "https://cdn.discordapp.com/emojis/356460944261382144.webp?size=240&quality=lossless",
		},
		sileo: {
			urlFormat: 'sileo://source/',
			color: "#2fc2bf",
			iconUrl: "https://cdn.discordapp.com/emojis/959128883498729482.webp?size=240&quality=lossless",
		},
		zebra: {
			urlFormat: 'zbra://sources/add/',
			color: "#333",
			iconUrl: "https://cdn.discordapp.com/emojis/959129860603801630.webp?size=240&quality=lossless",
		},
		installer: {
			urlFormat: 'installer://add/',
			color: "#2f91c2",
			iconUrl: "",
		}
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

	const capitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	if (!isValidHttpUrl(repoUrl)) {
		return (
			<div class={style.alert}>Invalid URL! The repository URL must be an <code>http</code> or <code>https</code> link.</div>
		)
	} else if (manager !== undefined && !(manager.toLowerCase() in repoFormats)) {
		return (
			<div class={style.alert}>Invalid package manager! The options are {(() => {
				const input = Object.keys(repoFormats)
				const last = input.pop();
				return input.map(i => capitalize(i)).join(', ') + ' and ' + capitalize(last);
			})()} </div>
		)
	}

	if (manager !== undefined) {
		manager = manager.toLowerCase()
		window.location = `${repoFormats[manager]}${repoUrl}`
		return (
			<div class={style.success}>Redirecting you to <a href={`${repoFormats[manager]}${repoUrl}`}>{repoFormats[manager]}{repoUrl}</a>... (click if it didn't work)</div>
		)
	}

	return (
		<div class={style.outer}>
			<div class={style.inner}>
				{Object.keys(repoFormats).map(thisManager => (
					<div class={style.repoButton} href={`${repoFormats[thisManager].urlFormat}${repoUrl}`} style={{backgroundColor: repoFormats[thisManager].color}}><img src={repoFormats[thisManager].iconUrl} class={style.icon}></img><p class={style.text}>Add to {capitalize(thisManager)}</p></div>
				))}
			</div>
		</div>
	);
}

export default Repo;
