/**
 * @fileOverview 
 * Entry point to Skini
 * @version 1.3
 * @author Bertrand Hédelin  © Copyright 2017-2022, B. Petit-Hédelin
 */
var fs = require('fs');
var express = require('express');
var path = require("path");
var ipConfig = require("./serveur/ipConfig.json");
var midiConfig = require("./serveur/midiConfig.json");

function startSkini() {

  // Nettoyage du log précédents
  try {
    fs.unlinkSync("./skinilog.json")
    //file removed
  } catch (err) {
    console.error("WARN: Pas de log précédents:", err)
  }

  // Websocket dans le Serveur
  var ws = require('./serveur/websocketServer');
  var oscReceiveDAW = require("./serveur/midimix.js");
  var par = require('./serveur/skiniParametres');

  // To share the parameters file at launch. ws dispaches to oscMidi,
  // DAW and groupesClientsSons
  ws.setParameters(par, oscReceiveDAW);

  // Share ws server in midimix
  oscReceiveDAW.setWebSocketServer(ws);

  // AFFICHAGE DU CONTEXTE =================================================

  function displayContext(param, ipConfig) {
    // console.log("\n=========================================================");
    // //if(param.scenesON) console.log("Skini avec les scènes\n");
    // if (param.avecMusicien) {
    //   console.log("Décalage des FIFOs de ", param.decalageFIFOavecMusicien, " pulsations");
    // }
    // console.log("Config des patterns: ", param.configClips);
    // console.log("Fichiers sons dans : ", param.soundFilesPath1);
    // if (param.avecMusicien) console.log("Fichiers partitions dans : ", param.patternScorePath1);

    // console.log("Synchro. Midi: ", param.synchoOnMidiClock);
    // console.log("Réaction au moment où le pattern est joué (par défaut à la sélection):", param.reactOnPlay);
    // console.log("Algorithme sur FIFO: ", param.algoGestionFifo);
    // console.log("Nombe de groupes clients: ", param.nbeDeGroupesClients);

    // console.log("----------- SIMULATEUR ----------------------------------");
    // console.log("Simulation dans un groupe dédié: ", param.simulatorInAseperateGroup);
    // console.log("Tempo max simulateur en ms:", param.tempoMax);
    // console.log("Tempo min simulateur en ms:", param.tempoMin);
    // console.log("Limite de durée d'attente en pulsations :", param.limiteDureeAttente);

    console.log("----------- RESEAU --------------------------------------");
    console.log("Port OUT OSC pour MIDI:", ipConfig.OutPortOSCMIDItoDAW, "IP:", ipConfig.remoteIPAddressSound); // DAW ou Processing
    console.log("Port IN  OSC pour MIDI:", ipConfig.InPortOSCMIDIfromDAW, "IP:", ipConfig.remoteIPAddressSound); // DAW ou Processing
    console.log("Port IN  OSC pour M4L :", ipConfig.portOSCFromAbleton, "IP:", ipConfig.remoteIPAddressAbleton); // Pour M4L
    //console.log("Port OUT OSC pour Jeu :", ipConfig.portOSCToGame, "IP:", ipConfig.remoteIPAdressGame);
    //console.log("Port IN  OSC pour Jeu :", ipConfig.portOSCFromGame, "IP:", ipConfig.remoteIPAdressGame);
    console.log("Port IN  OSC pour QLC :", ipConfig.inportLumiere, "IP:", ipConfig.remoteIPAddressLumiere);
    console.log("Port OUT OSC pour QLC :", ipConfig.outportLumiere, "IP:", ipConfig.remoteIPAddressLumiere);
    console.log("Port OUT pour Visu    :", ipConfig.outportProcessing, "IP:", ipConfig.remoteIPAddressImage);
    console.log("Port OUT seq. distrib.:", ipConfig.distribSequencerPort, "IP:", ipConfig.remoteIPAddressSound); // Processing
    console.log("Serveur HTTP port:", ipConfig.webserveurPort, "IP:", ipConfig.serverIPAddress);
    console.log("Serveur WS port:", ipConfig.websocketServeurPort, "IP:", ipConfig.serverIPAddress);
    if (ipConfig.serverIPAddressPublic !== undefined) {
      console.log("Serveur publique HTTP et Websocket IP:", ipConfig.serverIPAddressPublic);
    } else {
      console.log("Serveur pas accessible depuis Internet");
    }

    console.log("----------- MIDI --------------------------------------");
    if (par.directMidiON) {
      console.log("Use MIDI direct to control DAW");
    } else {
      console.log("Use OSC to control DAW");
    }
    for (var i = 0; i < midiConfig.length; i++) {
      console.log("Midi" + midiConfig[i].type + ", usage:" + midiConfig[i].spec + ", bus: " + midiConfig[i].name + ", " + midiConfig[i].comment);
    }
    console.log("=========================================================");
  }

  var app = express();
  app.use(express.static('./'));

  app.get('/sequenceur', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/sequencer.html'));
  });

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/clientListe/clientListe.html'));
  });

  app.get('/block', function (req, res) {
    res.sendFile(path.join(__dirname + '/blocklySkini/blocklySkini.html'));
  });

  // Avec /controleur ça plante le client ???
  app.get('/contr', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/controleur/controleur.html'));
  });

  app.get('/skini', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/clientListe/clientListe.html'));
  });

  app.get('/score', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/score/score.html'));
  });

  app.get('/conf', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/configurateur/configurateur.html'));
  });

  var port = ipConfig.webserveurPort;
  var addressServer = ipConfig.serverIPAddress;
  app.listen(port, () => {
    console.log(`INFO: Skini listening at http://${addressServer}:${port}`);
  });

  displayContext(par, ipConfig);
}

startSkini();