var loadDarknet;
var accountData = {};

function darketSpoilerButton(button) {
	console.log(button.parentElement);

	var children = button.children;
	for (var i = 0; i < children.length; i++) {
		var tableChild = children[i];
		if(tableChild.constructor && tableChild.constructor.name == 'HTMLImageElement') {
			var obj = $(tableChild);
			if (obj.is(":visible")){
				obj.fadeOut(600);
			} else {
				obj.fadeIn(600);
			}
		}
	}
}

$(document).ready(function(){
	var currentChannel = 'global';
	var oldMessages = [];
	var globalMessages = [];
	var channelMessages = [];
	var allMessages = [];
	var currentPage = 'home';
	var shopItems = [];

	loadDarknet = (d) => {
		if (d.channel && currentChannel != d.channel) currentChannel = d.channel;

		if (d.chat || d.cu) {
			$(".darknetChatEntry").remove();
			globalMessages = d.chat || globalMessages;
			channelMessages = d.cu || channelMessages;

			let result = [...globalMessages, ...channelMessages];
			allMessages = result.sort((a,b) => (a.date > b.date) ? 1 : -1);

			LoadChatbox();
		}

		if (d.m && (!d.m.channel || currentChannel == d.m.channel)) {
			AddDarknetMessage(d.m);
		}

		if (d.shop) {
			shopItems = d.shop;
			loadShopContent(d.shop);
		}

		if (d.info) updateDarknetData(d.info);
	}

	handleMenus = (menu) => {
		if (currentPage != menu) {
			transitionToAnotherDiv("darknet" + currentPage.charAt(0).toUpperCase() + currentPage.slice(1), "darknet" + menu.charAt(0).toUpperCase() + menu.slice(1));
		}

		switch (menu) {
			case "home":
				currentPage = 'home';
				break;
			case "shop":
				currentPage = 'shop';
				break;
			case "account":
				currentPage = 'account';
				break;
			default:
				// do nothing...
				break;
		}
	}

	function LoadChatbox() {
		const chatLenght = allMessages.length;
		for (let i = 0; i < chatLenght; i++) {
			const m = allMessages[i];
			if (!m.channel || m.channel.toLowerCase() == currentChannel || m.channel == 'global') {
				m.channel = m.channel || 'global';
				AddDarknetMessage(m, true);
			}
		}
	}

	function loadShopContent(shopData) {
		var myNode = document.getElementById("darknetItemPanel");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}

		const shopLenght = shopData.length;
		var trTag = false, trCount = 0;

		for (let i = 0; i < shopData.length; i++) {
			if (trCount === 0) {
				trTag = document.createElement("tr");
				$('#darknetItemPanel').append(trTag);
			}

			let data = shopData[i];
			if (data) {
				const name = "darknetShop_" + data.id;
				$(trTag).append("<td>" + data.Title + "<div class='darknetShopItemDesc'>" + data.Desc + "</div><button class='darknetShopBtn' id='" + name + "'>Acheter $" + data.Price + "</button></td>");
				$('#' + name).mouseup(function(){
					const itemName = $('#' + name).attr("id");
					doEvent(6, itemName);
					closeBrowser();
				});

				trCount++;
				if (trCount === 3) trCount = 0;
			}
		}		
	}

	function updateDarknetData(d) {
		d = d || [];
		accountData = {
			m : d.m,
			name : d.name
		};
		$(".darknetNavUsername").text("Bienvenue, " + (d.name || "Invité"));
		$(".darknetUsername").text((d.name || "guest") + "@darknet:~$");
	}

	function AddDarknetMessage(message, notUpdate)
	{
		let dateString = message.date ? "[" + timeConverter(message.date * 1000) + "]" : "";
		let repString = message.rep ? " [" + message.rep + "]" : "";
	 	let channelName = message.name ? (message.channel ? '[' + message.channel.toUpperCase() + '] ' : '[' + currentChannel.toUpperCase() + '] ') : '[DARKNET] ';
	 	let nameText = message.name ? (" " + message.name) : "Darknet";
		let colorHtml = message.color ? " style='color: " + message.color + "';" : "";

		var imageElement = "";
		if (message.image) imageElement = "<a id='dnet_spoiler' onclick='darketSpoilerButton(this)'>" + (message.content.length > 0 ? " " : "") + "[Pièce-jointe]<br><img class='darknetImage' src='" + message.image + "'></a></div>";

	 	const newElement = "<div class='darknetChatEntry'" + colorHtml + ">" + channelName +  dateString + repString + nameText + " > " + message.content + imageElement + "</div>";
		$(".darknetChat").prepend(newElement);
		if (!notUpdate) allMessages[allMessages.length] = { content : message.content, name : message.name, channel : message.channel, date : message.date, color : message.color, rep : message.rep };
	}

	/*
		1 -> envoie message
		2 -> ?
		3 -> Clean history
		4 -> Register
		5 -> Login
		6 -> Status
		7 -> Annonce
		8 -> setrank
		9 -> passwd
	*/
	function doEvent(id, ...a){
		$.post('http://pichot_ui/darknetAct', JSON.stringify({
			id: id,
			data: a
		}));
	}

	function addZero(i) {
		if (i < 10) i = "0" + i;
		return i;
	}

	function timeConverter(time){
		const a = new Date(time);
		return addZero(addZero(a.getHours()) + ':' + addZero(a.getMinutes()) + ':' + addZero(a.getSeconds()));
	}

	var oldMessagesIndex = -1;
	function moveOldMessageIndex(up){
		if (up && oldMessages.length > oldMessagesIndex + 1) {
			oldMessagesIndex += 1;
			$('.darknetInput').val(oldMessages[oldMessagesIndex]);
		} else if (!up && oldMessagesIndex - 1 >= 0) {
			oldMessagesIndex -= 1;
			$('.darknetInput').val(oldMessages[oldMessagesIndex]);
		} else if (!up && oldMessagesIndex - 1 === -1) {
			oldMessagesIndex = -1;
			$('.darknetInput').val(oldMessages['']);
		}
	}

	var dCmds = {};
	dCmds['help'] = {
		f : () => {
			let returnStr = "Voici un peu d'aide..<br><br><span style='color:cyan;'>Liste des commandes:";
			for (let commandName in dCmds) {
				const data = dCmds[commandName];
				if (data.desc) returnStr += "<br>!" + commandName + " <i>" + data.desc + "</i>";
			}
			AddDarknetMessage({ content : returnStr + "</span>" });
		},
		desc : "Affiche la liste des commandes.",
		auth : true
	};

	dCmds['channel'] = {
		desc : "[channel] pour définir un canal personnalisé sur le darknet. [shop-media-global-local]",
		f : (a) => doEvent(0, a[0] || 'global')
	};

	dCmds['ping'] = { auth : true, f : () => { AddDarknetMessage({ content : "Ping: " + (Math.floor(Math.random() * 9)) + 1 + "ms.", color : "cyan"}) }, desc : "Affiche votre ping." };

	dCmds['clear'] = {
		f : () => {
			$(".darknetChatEntry").remove();
			allMessages = {};
			doEvent(3);
			AddDarknetMessage({ content : "Vous avez supprimé l'historique du chat.", color : "red" });
		},
		auth : true,
		desc : "Supprimer l'historique des messages."
	};

	dCmds['logout'] = {
		f : () => {
			AddDarknetMessage({ content : "Vous vous êtes déconnecté de votre compte: " + accountData.name + "." });
			accountData = [];
			doEvent(2);
			updateDarknetData(accountData);
		},
		desc : "Se déconnecter de son compte."
	},
	dCmds['register'] = {
		auth : true,
		f : (a) => {
			if (a.length != 3) return AddDarknetMessage({ content : "La commande est incomplète." });
			if (a[1] != a[2]) return AddDarknetMessage({ content : "Vous n'avez pas indiqué le même mot de passe." });
			if (a[0].length > 30 || a[1].length > 30 || a[2].length > 30) return AddDarknetMessage({ content : "Votre pseudo ou votre mot de passe est trop long, maximum 30 caractères." });
			doEvent(4, a);
		},
		desc : "[pseudo] [mot de passe] [mot de passe] pour se créer un compte."
	},
	dCmds['login'] = {
		auth : true,
		f : (a) => {
			if (a.length != 2) return AddDarknetMessage({ content : "La commande est incomplète." });
			doEvent(5, a);
		},
		desc : "[pseudo] [mot de passe] afin de se connecter à un compte."
	},
	dCmds['announce'] = {
		auth : true,
		f : (a) => {
			if (a.length <= 0) return AddDarknetMessage({ content : "La commande est incomplète." });
			doEvent(7, a.join(' '));
		},
		desc : "[message] afin de passer un message anonyme sur toutes les fréquences."
	},
	dCmds['rank'] = {
		auth : true,
		f : (a) => {
			if (a.length != 1) return AddDarknetMessage({ content : "La commande est incomplète." });
			doEvent(8, a);
		},
		desc : "[rang] affiche le rang actuel de votre compte. Choix, de votre niveau actuel à 0"
	},
	dCmds['password'] = {
		auth : true,
		f : (a) => {
			if (a.length != 2) return AddDarknetMessage({ content : "La commande est incomplète." });
			if (a[0] != a[1]) return AddDarknetMessage({ content : "Vous n'avez pas indiqué le même mot de passe." });
			if (a[0].length > 30 || a[1].length > 30) return AddDarknetMessage({ content : "Votre mot de passe est trop long, maximum 30 caractères." });
			doEvent(9, a);
		},
		desc : "[nouveau mot de passe] [nouveau mot de passe] pour modifier votre mot de passe."
	}

	const labelLang = {
		no_auth : "Vous devez créer un compte sur le darknet.<br><span style='color:white'>!register [pseudo] [mot de passe] [mot de passe]<br>!login [pseudo] [mot de passe] pour changer de compte.<br>Ces identifiants sont secrets et ne peuvent pas être récupérés/réinitialisés.</span>",
		too_long : "Votre message est trop long.",
		spam : "Veuillez patienter avant d'envoyer un autre message. (SPAM)"
	};

	var lastMessageTime;
	$('.darknetInput').keydown(function(e){
		if(e.keyCode == 13) {
			e.preventDefault();
			var inputValue = $('.darknetInput').val();
			inputValue = inputValue.replace(/</g, "&lt;").replace(/>/g, "&lt;");
			$('.darknetInput').val("");

			if (inputValue.length == 0) return;

			oldMessages.unshift(inputValue);
			oldMessagesIndex = -1;

			const IsCommand = inputValue.substring(0, 1) == "!";
			if (IsCommand) {
				let commandArgs = inputValue.split(" ");
				const commandName = commandArgs[0].replace("!", "");
				const commandData = dCmds[commandName];
				if (commandData && commandData.f) {
					if(!commandData.auth && !accountData.name) return AddDarknetMessage({ content : labelLang.no_auth, color : "red" });

					commandArgs = commandArgs.slice(1);
					dCmds[commandName].f(commandArgs);
				} else {
					AddDarknetMessage({ content : "Cette commande n'existe pas.", color : "red" });
				}
			} else {
				if (!accountData.name) return AddDarknetMessage({ content : labelLang.no_auth, color : "red" });
				if (inputValue.length >= 300) return AddDarknetMessage({ content : labelLang.too_long, color : "red" });
				if (lastMessageTime && lastMessageTime + 1000 > Date.now()) return AddDarknetMessage({ content : labelLang.spam, color : "red" });

				doEvent(1, inputValue, currentChannel);
				lastMessageTime = Date.now();
			}
		} else if (e.keyCode === 38 || e.keyCode === 40) {
			e.preventDefault();
			moveOldMessageIndex(e.keyCode === 38);
		}
	});
});
