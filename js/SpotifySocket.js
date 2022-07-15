! function($) {
    "use strict";

    if (window.WebSocket) {

    	var url = 'wss://api.lanyard.rest/socket'
   		const ws = new WebSocket(url);
	
	    const Operation = {
		  Event: 0,
		  Hello: 1,
		  Initialize: 2,
		  Heartbeat: 3,
		}

		const EventType = {
		  INIT_STATE: 'INIT_STATE',
		  PRESENCE_UPDATE: 'PRESENCE_UPDATE',
		}

		const send = (op, d) => {
	    	if (ws !== null) ws.send(JSON.stringify({ op, d }));
	  	}
		
		const logLanyardEvent = (eventName, data) => {
			// eslint-disable-next-line no-console
			  console.log(
			    `%cLanyard%c <~ ${eventName} %o`,
			    'background-color: #d7bb87; border-radius: 5px; padding: 3px; color: #372910;',
			    'background: none; color: #d7bb87;',
			    data
			  );
		};

		ws.onmessage = function ({ data }) { 
			const { op, t, d } = JSON.parse(data);
			if (op === Operation.Hello) {

				setInterval(() => send(Operation.Heartbeat), d.heartbeat_interval);
	        	send(Operation.Initialize, { subscribe_to_id: "877067872655011861" });

			} else if (op === Operation.Event && t) {
				logLanyardEvent(t, d);
				// discord info and avatar
				var tag = document.getElementById("Discord-tag");
				var avatar = document.getElementById("AvatarDis");

				tag.innerHTML = d.discord_user.username +"#" + d.discord_user.discriminator
				avatar.src = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png?size=1024`

				// spotify presence
				if ([EventType.INIT_STATE, EventType.PRESENCE_UPDATE].includes(t)) {
					var Spotify = document.getElementById("Spotify");

					if (d.listening_to_spotify === true) {
						Spotify.style = "display: revert; position: absolute;"
						var song = document.getElementById("song");
						var artist = document.getElementById("artist");
						var img = document.getElementById("Spotify-img");
						var Progress = document.getElementById("ProgressFill");

						img.src = d.spotify.album_art_url
						song.innerHTML = d.spotify.song.length > 13 ? d.spotify.song.substring(0, 13) + "..." : d.spotify.song;
						artist.innerHTML = "by "+ d.spotify.artist.split(";").join(", ")

					} else {
						Spotify.style = "display: none;"
					}
					
				}
			}
	       	
		};

	    ws.onclose = function(e) {
	    	if (e.wasClean) {
				Toastify({
				  text: `[WebSocket] Connection closed cleanly, please reload the website`,
				  duration: 500000,
				  destination: "https://qoft.tech",
				  newWindow: false,
				  gravity: "top",
				  position: "right",
				  backgroundColor: "linear-gradient(to right, #ed2a4a, #ff1ba6);",
				  stopOnFocus: true,
				}).showToast();
	        } else {
	        	Toastify({
				  text: `[WebSocket] Connection died, please reload the website`,
				  duration: 500000,
				  destination: "https://qoft.tech",
				  newWindow: false,
				  gravity: "top",
				  position: "right",
				  backgroundColor: "linear-gradient(to right, #ed2a4a, #ff1ba6);",
				  stopOnFocus: true,
				}).showToast();
	        	console.log('');
	        }
	     
		}

	}
	// v2 soon 
	function progresUpdate(d, Progress) { 
		setInterval(() => {
		    if (!d || !d.listening_to_spotify) return;

		    const total = d.spotify.timestamps.end - d.spotify.timestamps.start;
		    var progress = (100 - (100 * (d.spotify.timestamps.end - new Date().getTime())) / total);

		    Progress.style = `
				width: 100%;
				height: 5px;
				background-color: var(--accent);
				transition: transform 750ms;
				transform: translateX(${progress - 100}%);
				`;
		}, 250);

		return () => clearInterval(progresUpdate);
	}
} (window.jQuery);