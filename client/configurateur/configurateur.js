"use strict"
var par;
var ipConfig = require("../../serveur/ipConfig.json");

var index = Math.floor((Math.random() * 10000) + 1 ); // Pour identifier le client
var pseudo = "Anonyme";
var ws;

var msg = { // On met des valeurs pas defaut
  type: "configuration",
  text: "ECRAN_NOIR" ,
  pseudo: "Anonyme",
  value: 0
}

function saisiClip() {
	var DAWNote = document.getElementById("numClip").value;
	var DAWChannel = Math.floor(DAWNote / 127) + 1;
	DAWNote = DAWNote % 127;
	if (DAWChannel > 15) {
	  console.log("Web Socket Server.js : pushNoteOnDAW: Nombre de canaux midi dépassé.");
	return;
	}

	var msg = {
	  type:"configDAWMidiNote",
	  bus: par.busMidiDAW,
	  channel: DAWChannel,
	  note: DAWNote
	}
	ws.send(JSON.stringify(msg));
}
window.saisiClip = saisiClip;

function saisiCC() {
  var controlChange = parseFloat(document.getElementById("numCC").value);
  var controlChangeValue = parseFloat(document.getElementById("valueCC").value);
  var DAWChannel = 1;
  if (controlChange != undefined && controlChangeValue != undefined) {
	var msg = {
	  type:"configDAWCC",
	  bus: par.busMidiDAW,
	  channel: DAWChannel,
	  CC: controlChange,
	  CCValue: controlChangeValue
	}
	ws.send(JSON.stringify(msg));
  }else{
  	alert("CC or CC value undefined:", controlChange, controlChangeValue );
  }
}
window.saisiCC = saisiCC;

function initWSSocket(host) {

	ws = new WebSocket("ws://" + host + ":" + ipConfig.websocketServeurPort);
	console.log( "ws://" + host + ":" + ipConfig.websocketServeurPort );

	ws.onopen = function( event ) {
		var msg = {
		  type:"startSpectateur",
		  text:"configurateur",
		  id: index
		}
		console.log("ID sent to server:", msg.id);
		ws.send(JSON.stringify(msg));
	};

	//Traitement de la Réception sur le client
	ws.onmessage = function( event ) {
	  var msgRecu = JSON.parse(event.data);
		switch(msgRecu.type) {

	     case "message":  
			console.log(msgRecu);
			document.getElementById("MessageDuServeur").innerHTML = msgRecu.value;
			break;

			case "skiniParametres":
				console.log("skiniParametres:", msgRecu.value);
				par =  msgRecu.value;
				break;

	     default: console.log("Client reçoit un message inconnu");
	    }
	};

	ws.onclose = function( event ) {
	    console.log( "Client: websocket closed for :", index );
	}

	window.onbeforeunload = function () {
		msg.type = "closeSpectateur";
	    msg.text = "DISCONNECT_SPECTATEUR";
	    ws.send(JSON.stringify(msg));
		ws.close();
	}
}
window.initWSSocket = initWSSocket;