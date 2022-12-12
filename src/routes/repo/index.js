import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Repo = ({ repoUrl, manager }) => {
	const repoFormats = {
		cydia: {
			urlFormat: 'cydia://url/https:/cydia.saurik.com/api/share#?source=',
			color: "#a36648",
			iconUrl: "https://media.discordapp.net/attachments/947346851185700884/970434794263564298/Cydia.png",
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
			iconUrl: "https://media.discordapp.net/attachments/947346851185700884/970434676261019668/Installer_5.png",
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
		window.location = `${repoFormats[manager].urlFormat}${repoUrl}`
		return (
			<div class={style.success}>Redirecting you to <a href={`${repoFormats[manager].urlFormat}${repoUrl}`}>{repoFormats[manager].urlFormat}{repoUrl}</a>... (click if it didn't work)</div>
		)
	}

	return (
		<div class={style.outer}>
			<div class={style.inner}>
				<img src={`${repoUrl}/CydiaIcon.png`} onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = "https://media.discordapp.net/attachments/947340203100635249/947387894098718740/Subtract.png";
				}} class={style.repoIcon}></img>
				{Object.keys(repoFormats).map(thisManager => (
					<a class={style.repoButton} href={`${repoFormats[thisManager].urlFormat}${repoUrl}`} style={{ backgroundColor: repoFormats[thisManager].color }}><img src={repoFormats[thisManager].iconUrl} class={style.icon}></img><p class={style.text}>Add to {capitalize(thisManager)}</p></a>
				))}
			</div>
		</div>
	);
}

export default Repo;
