var closeBrowser
$(document).ready(function(){
	var radioFrequence = 80.00;
	var radioMode = 0;
	var noteID;
	var timeout;
	var isLite = false;

	const taxes10 = 0.1;
	const firstPlafond = 20000;
	const taxes20 = 0.2;
	const midPlafond = 50000;
	const taxes30 = 0.3;
	const lastPlafond = 90000;
	const taxes40 = 0.4;

	closeBrowser =() => {
		$(".focus").fadeOut(600);
		$(".internet-container").fadeOut(400);
		setTimeout(function(){
			$('embed#website').remove();
			$('.web-site').children('div').each(function() {
				$(this).css("display", "none");
			});
		}, 400);

		$.post('http://pichot_ui/closeInternet');
	}

	const defaultTextInput = "Valider les informations";
	function formFunction(item) {
		if (item && item.input) {
			$(".formInput").fadeIn(400);
			$(".focus").fadeIn(600);
			$(".form-group").remove();
		} else {
			$(".formInput").fadeOut(400);
			$(".focus").fadeOut(600);
		}
		if (item && item.input != false && item.input != null) {
			$("#formTitle").text(item.inputName || "Informations");
			for (let i = item.input.length - 1; i >= 0; i--) {
				let data = item.input[i];
				$("#form-content").prepend("<div class='form-group'><label>" + data.field + "</label><input type='" + (data.type || "text") + "' id='" + data.id + "' name='" + data.id + "' required='required'/></div>");
			}
			$("#form-content").append("<div class='form-group'><button id='fieldValidate'>" + (item.fieldValidate || defaultTextInput) + "</button></div>");

			$("#fieldValidate").mouseup(function(){
				var allInputs = {};
				for (let i = item.input.length - 1; i >= 0; i--) {
					let data = item.input[i];
					allInputs[data.id] = $("#" + data.id).val() || "";
				}

				$.post('http://pichot_ui/onEntry', JSON.stringify({
					id: 1,
					inputs: allInputs
				}));
				formFunction();
			});
		}
	}

	$('#incomes').on('keyup', function() {
		if (this.value.length > 0) {
			var taxes = 0;

			if (isLite) {
				if (this.value <= firstPlafond) {
					taxes = this.value * taxes10;
				} else if (this.value > firstPlafond && this.value <= midPlafond) {
					taxes = firstPlafond * taxes10 + (this.value - firstPlafond) * taxes20;
				} else {
					taxes = firstPlafond * taxes10 + (midPlafond - firstPlafond) * taxes20 + (this.value - midPlafond) * taxes30;
				}
			} else {
				if (this.value <= firstPlafond) {
					taxes = this.value * taxes10;
				} else if (this.value > firstPlafond && this.value <= midPlafond) {
					taxes = firstPlafond * taxes10 + (this.value - firstPlafond) * taxes20;
				} else if (this.value > midPlafond && this.value <= lastPlafond) {
					taxes = firstPlafond * taxes10 + (midPlafond - firstPlafond) * taxes20 + (this.value - midPlafond) * taxes30;
				} else {
					taxes = firstPlafond * taxes10 + (midPlafond - firstPlafond) * taxes20 + (lastPlafond - midPlafond) * taxes30 + (this.value - lastPlafond) * taxes40;
				}
			}
			$('#taxes').val(taxes);
		}
	 });

	function resizeCheck() {
		var embed = document.getElementsByTagName("embed")[0];

		if (embed != null) {
			embed.style.paddingTop = "5px";
			embed.style.height = "95%";
			embed.style.width = "100%";
		}
	};

	transitionToAnotherDiv = function transitionToAnotherDiv(fromDiv, toDiv) {
		$("#" + fromDiv).fadeOut(1000);
		setTimeout(function(){
			$("#" + toDiv).fadeIn(1000);
		}, 1000);
	}

	function showBrowser(websiteUrl, divID) {
		$(".internet-container").fadeIn(600);
		$(".focus").fadeIn(600);

		$("." + divID).css("display", "inline-block");

		if (websiteUrl == "lifeinvader") {
			const newElement = "<embed id='website' sandbox='allow-scripts' src='https://lifeinvader.gtaliferp.fr/' type='text/html' width='1200' height='1000'>";
			$(".lifeinvader").append(newElement);
		}

		document.getElementById("urlEntry").value = "www." + websiteUrl + ".com";
	}

	/*showBrowser("unknownlocation",'darknet');
	resizeCheck();

	loadDarknet({
		info : {},
		chat : [
			{ content : "your wonderful message", name : "pseudo", date : 1540980527, image : "https://www.nps.gov/common/uploads/banner_image/imr/homepage/99556161-1DD8-B71B-0B896E4D786C6B47.jpg" }
		],
		shop :  [
			{ title : "Programme GPS trafiqué", price : 300, id : "gps_hack", sub : "En téléchargant de programme 2.0 votre GPS aura la possibilité de détecter les radars et d'ainsi vous en avertir via un bip sonore lorsque vous serez dans ses alentours. Attention, la portée est réduite vous devez être très réactif." },
			{ title : "Annonce globale", price : 300, id : "gl_ann", sub : "Ce service vous permet d'envoyer une annonce sur toutes les fréquences du réseau darknet. Très utile pour faire passer messages, annoncer des choses. Votre message sera immédiatement envoyé et sera marqué en rouge pour être bien voyant." },
			{ title : "Informations armes", price : 300, id : "info_armes", sub : "Cet achat vous donne accès au channel gérant les échanges d'armes à Los Santos et Blaine County. Vous devrez après vous organiser pour vous en procurer." },

			{ title : "Kit débutant", price : 300, id : "start_kit", sub : "Cet achat vous donne les informations de base afin de bien vous insérer dans le système illégal. Vous aurez notamment des localisations intéressantes mais aussi des explications." },
			{ title : "Graînes weed", price : 300, id : "buy_seed_w", sub : "Un contact vous donnera des coordonnées afin que vous puissiez récupérer la marchandise. La qualité des grâines est médiocre, ne vous attendez pas à produire de la drogue de haute qualité." },
			{ title : "Kit débutant", price : 300, id : "start_kit", sub : "Cet achat vous donne les informations de base afin de bien vous insérer dans le système illégal. Vous aurez notamment des localisations intéressantes mais aussi des explications." },

			{ title : "Indice recette weed", price : 300, id : "hint_weed", sub : "La recette est dynamique, vous aurez accès à des informations approximatives sur la recette actuelle de la weed afin d'obtenir de la drogue de meilleure qualité." },
			{ title : "Indice recette cocaïne", price : 300, id : "hint_coke", sub : "La recette est dynamique, vous aurez accès à des informations approximatives sur la recette actuelle de la cocaïne afin d'obtenir de la drogue de meilleure qualité." },
			{ title : "Indice recette meth", price : 300, id : "hint_meth", sub : "La recette est dynamique, vous aurez accès à des informations approximatives sur la recette actuelle de la meth afin d'obtenir de la drogue de meilleure qualité." },
			{ title : "Indice recette meth", price : 300, id : "hint_meth", sub : "La recette est dynamique, vous aurez accès à des informations approximatives sur la recette actuelle de la meth afin d'obtenir de la drogue de meilleure qualité." },
		],
	});*/

	window.addEventListener('message', function(event){
		const item = event.data;
		if (item.lite != null) {
			isLite = item.lite;
		}
		if(item.showInternet!= null && item.showInternet == true) {
			showBrowser(item.URL, item.webID);
			resizeCheck();
			if(item.darknet != null){
				loadDarknet(item.darknet);
			}
		} else if (item.showInternet!= null && item.showInternet == false) {
			closeBrowser();
		} else if (item.darknet) {
			loadDarknet(item.darknet);
		} else if(item.showID === true) {
			$("#cardID").fadeIn(400);
			$("#id_name").text(item.name);
			$("#id_data").text(item.data);
			$("#id_city").text(item.city);
			$(".idDate").text(item.date);
			$(".idNumber").text(item.number);
			$(".idPhoto").css("background-image", `url(https://files.gtaliferp.fr/${item.server}/players/${item.userID}.png)`);

			timerID = setTimeout(function(){
				$("#cardID").fadeOut(400);
			}, 10000);
		} else if(item.showPermis == true) {
			const pem = item.data;

			$("#permisID").fadeIn(400);
			$(".permisName").text(item.name);
			$("#carLicense").text(pem[0] ? "✔" : "✖");
			$("#boatLicense").text(pem[1] ? "✔" : "✖");
			$("#planeLicense").text(pem[2] ? "✔" : "✖");
			$("#helicopterLicense").text(pem[3] ? "✔" : "✖");
			$("#bikeLicense").text(pem[4] ? "✔" : "✖");
			$("#truckLicense").text(pem[5] ? "✔" : "✖");
			$("#huntLicense").text(pem[6] ? "✔" : "✖");
			$("#ppaLS").text(pem[7] ? "✔" : "✖");
			$("#ppaBC").text(pem[8] ? "✔" : "✖");
			$("#fishLicense").text(pem[9] ? "✔" : "✖");
			$(".idPhoto").css("background-image", `url(https://files.gtaliferp.fr/${item.server}/players/${item.userID}.png)`);

			timerID = setTimeout(function(){
				$("#permisID").fadeOut(400);
			}, 10000);
		} else if(item.showCardBank == true) {
			$("#bankcardID").fadeIn(400);
			$("#bankcardID").css("color", item.gamme == 3 ? "black" : "white");
			$(".ownerCard").text(item.name);
			$(".cardDate").text(item.date);
			$(".cardNumber").html(item.number);
			//$("#cardRank").attr(src, url("bank/" + item.gamme + ".png"));

			timerID = setTimeout(function(){
				$("#bankcardID").fadeOut(400);
			}, 6000);
		} else if (item.radio != null) {
			if (item.freq != null) radioFrequence = item.freq;
			if (item.mode != null) radioMode = item.mode;

			$(".radioIndicator").css("display", (radioMode == 2 || radioMode == 0) ? "none" : "block");

			if (item.radio == false && $(".radioUI").is(":visible")) {
				$(".radioUI").fadeOut(400);
			} else if(item.radio) {
				$(".radioUI").fadeIn(400);

				if (radioMode > 0 && item.freq){
					$(".radioState").text(parseFloat(radioFrequence).toFixed(2));
				} else {
					$(".radioState").text('');
				}

				$(".radioRec").css("display", radioMode == 0 ? "none" : "inline-block");
				$("#radioMute").css("display", radioMode == 2 ? "inline-block" : "none");

				if (timeout) clearInterval(timeout);
			}
		} else if (item.input != null) {
			formFunction(item);
		} else if (item.event) {
			const data = item.event;
			$("#eventContainer").fadeIn(400);
			$("#idDiscordNick").text(data.name);
			$("#idDiscordTag").text("@" + data.tag);
			$("#idTimestamp").text("le " + data.date);
			$("#idMessage").text(data.msg.replace(/</g, "&lt;").replace(/>/g, "&lt;"));

			if (data.url) {
				$("#idAttachment").show();
				$("#idAttachment").attr('src', data.url || '');
			} else {
				$("#idAttachment").hide();
			}

			timerID = setTimeout(function(){
				$("#eventContainer").fadeOut(400);
			}, 15000);
		} else if (item.notes != null) {
			console.log(JSON.stringify(item));
			if (item.notes != false || item.notes === "") 
				$(".note-container").fadeIn(400);
			else
				$(".note-container").fadeOut(400);

			noteID = item.itemNum;
			$("#note-content").val(typeof item.notes === 'string' ? item.notes : "");
		}
	});

	$("#corp-taxes").mouseup(function(){
		transitionToAnotherDiv('buttongouv', 'entrygouv');
	});

	$("#entry-back").mouseup(function(){
		transitionToAnotherDiv('entrygouv', 'buttongouv');
	});

	$("#entry-validate").mouseup(function(){
		transitionToAnotherDiv('entrygouv', 'buttongouv');
	});

	$(".settings-button").mouseup(function(){
		closeBrowser();
		$.post('http://pichot_ui/closeInternet');
	});

	$("#entry-validate").mouseup(function(){
		closeBrowser();
		$.post('http://pichot_ui/validateTaxes', JSON.stringify({
			incomes: $("#incomes").val(),
			declaration: $("#declaration").val(),
			week: $("#week").val()
		}));
	});

	$("#radioToggle").mouseup(function(){
		$.post('http://pichot_ui/radioAct', JSON.stringify({
			id: 1
		}));
	});

	$("#radioFreq").mouseup(function(){
		$.post('http://pichot_ui/radioAct', JSON.stringify({
			id: 3,
			freq: radioFrequence
		}));
	});

	$("#radioButtonMute").mouseup(function(){
		$.post('http://pichot_ui/radioAct', JSON.stringify({
			id: 2
		}));
	});

	$("#radioManual").mouseup(function(){
		$.post('http://pichot_ui/radioAct', JSON.stringify({
			id: 4
		}));
	});

	function changeRadioFrequence(boolUP) {
		radioFrequence = Math.round( (radioFrequence + (boolUP ? .01 : - .01)) * 100 ) / 100;
		if (radioFrequence >= 20 && radioFrequence <= 130) $(".radioState").text(parseFloat(radioFrequence).toFixed(2));
	}

	$("#radioUP").mousedown(function(){
		if(timeout) clearInterval(timeout);
		if (radioMode > 0) {
			timeout = setInterval(function(){
				changeRadioFrequence(true);
			}, 100);
		}
	});

	$("#radioUP").mouseleave(function(){
		if(timeout) clearInterval(timeout);
	})

	$("#radioUP").mouseup(function(){
		if (timeout) {
			clearInterval(timeout);
			return false;
		}
	});

	$("#radioDown").mousedown(function(){
		if(timeout) clearInterval(timeout);
		if (radioMode > 0) {
			timeout = setInterval(function(){
				changeRadioFrequence(false);
			}, 100);
		}
	});

	$("#radioDown").mouseup(function(){
		if (timeout) {
			clearInterval(timeout);
			return false;
		}
	});

	let keyboardBinds = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
	$(document).keydown(function(event) {
		if (event.which === 80 && $(".radioUI").is(":visible")) {
			$.post('http://pichot_ui/radioAct', JSON.stringify({
				id: 5
			}));
		} else if (event.which == 27 && $(".formInput").is(":visible")) {
			$.post('http://pichot_ui/onEntry', JSON.stringify({}));
			formFunction();
		} else if (event.which == 27 && $(".internet-container").is(":visible")) {
			closeBrowser();
		}

		if (radioMode > 0 && $(".radioUI").is(":visible") && keyboardBinds.includes(event.which)) {
			$.post('http://pichot_ui/radioAct', JSON.stringify({
				id: 7,
				key: event.which - 96
			}));
		}
	});

	$("#note-quit").mouseup(function(){
		$(".note-container").fadeOut();
		$.post('http://pichot_ui/saveNotes');
		noteID = null;
	});

	$("#note-ok").mouseup(function(){
		$(".note-container").fadeOut();

		$.post('http://pichot_ui/saveNotes', JSON.stringify({
			text: $("#note-content").val(),
			id: noteID
		}));
		noteID = null;
	});
});
