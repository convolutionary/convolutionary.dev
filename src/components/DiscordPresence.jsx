import React, { useEffect, useState } from "react";
import { FaDiscord, FaSpotify } from "react-icons/fa";

const DiscordPresence = () => {
	const [data, setData] = useState(null);
	const [elapsedTime, setElapsedTime] = useState({});
	const [diceState, setDiceState] = useState({
		isSuccess: Math.random() > 0.5,
		isIntro: true,
		key: 0
	});

	const formatTimestamp = (start, end) => {
		if (!start) return "";
		const now = Date.now();
		const startTime = new Date(start).getTime();
		const endTime = end ? new Date(end).getTime() : null;
		
		if (endTime) {
			const total = Math.floor((endTime - startTime) / 1000);
			const current = Math.floor((now - startTime) / 1000);
			const minutes = Math.floor(current / 60);
			const totalMinutes = Math.floor(total / 60);
			return `${minutes}:${String(current % 60).padStart(2, '0')} - ${totalMinutes}:${String(total % 60).padStart(2, '0')}`;
		}

		const elapsed = Math.floor((now - startTime) / 1000);
		const hours = Math.floor(elapsed / 3600);
		const minutes = Math.floor((elapsed % 3600) / 60);
		
		if (hours > 0) {
			return `${hours}:${String(minutes).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')} elapsed`;
		}
		return `${minutes}:${String(elapsed % 60).padStart(2, '0')} elapsed`;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://api.lanyard.rest/v1/users/1178440413212844102"
				);
				const json = await response.json();
				setData(json.data);
			} catch (error) {
				console.error("Error fetching Discord data:", error);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 30000);

		const timeInterval = setInterval(() => {
			if (data?.activities) {
				const times = {};
				data.activities.forEach((activity, index) => {
					if (activity.timestamps?.start) {
						times[index] = formatTimestamp(activity.timestamps.start, activity.timestamps.end);
					}
				});
				setElapsedTime(times);
			}
		}, 1000);

		const style = document.createElement('style');
		style.textContent = `
			@keyframes diceIdle {
				0% {
					transform: scale(1);
				}
				50% {
					transform: scale(1.02);
				}
				100% {
					transform: scale(1);
				}
			}
		`;
		document.head.appendChild(style);

		let idleTimer;

		const runDiceAnimation = () => {
			const newSuccess = Math.random() > 0.5;
			
			setDiceState({
				isSuccess: newSuccess,
				isIntro: true,
				key: Date.now()
			});

			idleTimer = setTimeout(() => {
				setDiceState(prev => ({
					...prev,
					isIntro: false
				}));
			}, 4000);
		};

		runDiceAnimation();
		const cycleTimer = setInterval(runDiceAnimation, 10000);

		return () => {
			clearInterval(interval);
			clearInterval(timeInterval);
			document.head.removeChild(style);
			clearTimeout(idleTimer);
			clearInterval(cycleTimer);
		};
	}, []);

	if (!data) return null;

	const getStatusColor = (status) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "idle":
				return "bg-yellow-500";
			case "dnd":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const getActivityAsset = (activity, type = "large") => {
		const asset = type === "large" ? activity.assets?.large_image : activity.assets?.small_image;
		if (!asset) return null;

		if (asset.startsWith("spotify:")) {
			return asset.replace("spotify:", "https://i.scdn.co/image/");
		}

		if (asset.startsWith("mp:external/")) {
			return asset.replace("mp:external/", "https://media.discordapp.net/external/");
		}

		if (asset.startsWith("external/")) {
			return `https://media.discordapp.net/external/${asset.slice(9)}`;
		}

		return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${asset}`;
	};

	const getBannerUrl = () => {
		return "https://cdn.discordapp.com/banners/1178440413212844102/a_31124cf50617f5912d50e20487ca43af.gif?size=1024";
	};

	const getProfileDecoration = () => {
		const baseUrl = "https://cdn.discordapp.com/assets/profile_effects/effects/2024-10-07/d20/";
		const cacheBuster = `?t=${diceState.key}`;
		if (diceState.isIntro) {
			return diceState.isSuccess
				? `${baseUrl}intro_success.png${cacheBuster}`
				: `${baseUrl}intro_failure.png${cacheBuster}`;
		}
		return diceState.isSuccess 
			? `${baseUrl}idle_success.png${cacheBuster}` 
			: `${baseUrl}idle_failure.png${cacheBuster}`;
	};

	const customStatus = data.activities.find(a => a.type === 4);
	const activities = data.activities.filter(a => a.type !== 4);
	const bannerUrl = getBannerUrl();
	const decorationUrl = getProfileDecoration();

	return (
		<div className="glass-card overflow-hidden bg-[#18191c] rounded-lg relative min-h-[800px]">
			<div className="absolute inset-0 z-[100]">
				<img
					key={diceState.key}
					src={decorationUrl}
					alt=""
					className="absolute inset-0 w-full h-full object-cover"
					style={{
						animation: !diceState.isIntro && 'diceIdle 2s ease-in-out infinite'
					}}
				/>
			</div>

			<div className="relative z-[90]">
				<div className="relative h-[120px] w-full">
					<img
						src={bannerUrl}
						alt="Discord Banner"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#18191c] via-[#18191c]/80 to-transparent" />
				</div>

				<div className="px-4 pb-4">
					<div className="relative -mt-[76px]">
						<div className="relative inline-block">
							<img
								src="https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/images/decorations/solar_orbit.png"
								alt=""
								className="absolute pointer-events-none select-none z-[2]"
							/>
							<img
								src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}`}
								alt="Discord Avatar"
								className="w-[92px] h-[92px] rounded-full border-[6px] border-[#18191c] relative z-[1]"
							/>
							<div
								className={`absolute bottom-1 right-1 w-[22px] h-[22px] rounded-full ${getStatusColor(
									data.discord_status
								)} ring-[3px] ring-[#18191c] z-[3]`}
							/>
						</div>
					</div>

					<div className="mt-2.5">
						<div className="flex items-center justify-between">
							<span className="font-semibold text-white text-xl leading-6">
								{data.discord_user.global_name || data.discord_user.username}
							</span>
							<FaDiscord className="text-[#7f08f7] text-xl" />
						</div>
						<span className="text-sm text-[#B8B9BF]">relativi.ty</span>
						{customStatus && (
							<div className="flex items-center gap-1.5 mt-1 text-[#B8B9BF]">
								{customStatus.emoji && (
									<img 
										src={customStatus.emoji.id 
											? `https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}`
											: `https://cdn.discordapp.com/emojis/${customStatus.emoji.name}.png`
										} 
										alt={customStatus.emoji.name}
										className="w-4 h-4"
									/>
								)}
								<span>{customStatus.state}</span>
							</div>
						)}
					</div>

					{activities.length > 0 && (
						<div className="mt-4 space-y-2">
							{activities.map((activity, index) => (
								<div key={index} className="bg-[#1f1f24] rounded-lg p-3">
									<div className="flex items-start gap-3">
										<div className="relative">
											{getActivityAsset(activity, "large") && (
												<img
													src={getActivityAsset(activity, "large")}
													alt={activity.assets?.large_text || activity.name}
													className="w-16 h-16 rounded-lg object-cover"
												/>
											)}
											{getActivityAsset(activity, "small") && (
												<div className="absolute -bottom-1 -right-1">
													<div className="relative">
														<img
															src={getActivityAsset(activity, "small")}
															alt={activity.assets?.small_text || ""}
															className="w-6 h-6 rounded-full ring-2 ring-[#18191c]"
														/>
														{activity.type === 2 && (
															<FaSpotify className="absolute bottom-0 right-0 text-[#1DB954] text-sm bg-[#18191c] rounded-full p-0.5 ring-1 ring-[#18191c]" />
														)}
													</div>
												</div>
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2">
												<span className="font-medium text-white truncate">
													{activity.name}
												</span>
												{activity.type === 2 && (
													<span className="text-xs text-[#7f08f7] bg-[#7f08f7]/10 px-2 py-0.5 rounded-full">
														LISTENING
													</span>
												)}
											</div>
											{activity.details && (
												<div className="text-sm text-[#B8B9BF] truncate mt-0.5">
													{activity.details}
												</div>
											)}
											{activity.state && (
												<div className="text-sm text-[#B8B9BF] truncate">
													{activity.state}
												</div>
											)}
											{activity.timestamps && (
												<div className="text-xs text-[#B8B9BF]/60 mt-1">
													{elapsedTime[index]}
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DiscordPresence; 