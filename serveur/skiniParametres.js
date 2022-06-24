
// Generated by Skini: Wed Jun 22 2022 11:21:41 GMT+0200 (heure d’été d’Europe centrale)
"use strict"

var midiConfig = require("../serveur/midiConfig.json");

var countBusOUT = 0;
for (var i = 0; i < midiConfig.length; i++) {
  if (midiConfig[i].type === "OUT") {
    if (midiConfig[i].spec === "clipToDAW") {
      exports.busMidiDAW = countBusOUT;
    }
    countBusOUT++;
  }
}

// Piece Bitwig en OSC si la paramètre est false
// Sinon Skini parle MIDI
exports.directMidiON = true;

// Pour charger les fonctions et modules de scenes de type GOLEM
exports.scenesON = false;

exports.english = false;

/***********************************
  Paramètres du simulateur
  Si ces valeurs ne sont pas données c'est celle qui
  sont dans le simulateur qui sont utilisées
************************************/
exports.tempoMax = 503; // En ms
exports.tempoMin = 500; // En ms
exports.limiteDureeAttente = 50; // En pulsations

/********************************************************
AUTOMATE
*********************************************************/
// Pour un automate conforme à un rechargement selon les déclarations de module HipHop
exports.reactOnPlay = false;

/*************************************
CHEMIN DES FICHIERS SONS MP3 pour les clients
Le choix se fait sur le client en fonction d'abletonON donc 
de la pièce choisie dans la contrôleur.
Nom du sous répartoire ./sounds/xxxx
*************************************/
exports.soundFilesPath1 = "hiver2022";

/***************************************
CHEMIN DES PARTITIONS DES PATTERNS ET CONFIG AVEC MUSICIENS
****************************************/
exports.avecMusicien = false; // Pour mettre en place les spécificités au jeu avec des musiciens.
exports.decalageFIFOavecMusicien = 4; // Décalage de la FIFO vide avant le premier pattern dans une FIFO.
exports.patternScorePath1 ="";

/****************************************
ACTIVATION D'ALGORITHME D'ORGANISATION DES FIFOs
Si 0 ou undefined pas d'algorithme.
Si 1 algorithme de réorganisation Début, Milieu, Fin, Neutre (DFMN)
Dans le csv, D -> 1, M -> 2, F->3, N->4 (c'est fixé dans controleAbleton.js)
Si autre ... à créer...
ATTENTION: NE JAMAIS UTILISER EN SITUATION D'INTERACTION SI L'ALGORITHME
PEUT SUPPRIMER DES PATTERNS DES FIFOs
*****************************************/
exports.algoGestionFifo = 0;
exports.shufflePatterns = false;
/*****************************************************************************

Gestion de la Matrice des possibles
Automate de gestion de la matrice des possibles

******************************************************************************/
exports.nbeDeGroupesClients = 3;

function setnbeDeGroupesClients(num) {
  this.nbeDeGroupesClients = num;
}
exports.setnbeDeGroupesClients = setnbeDeGroupesClients;

exports.simulatorInAseperateGroup = true; // Si true, le dernier groupe client est réservé au simulateur.

// Pour un contrôle des Raspberries
exports.useRaspberries = true;
exports.playBufferMessage = "test";
exports.raspOSCPort = 4000;

// La synchro Midi, Link. Synchro Bitwig OSC par défaut si Midi et Link false.
exports.synchoOnMidiClock = false;
exports.synchroLink = true;
exports.synchroSkini = false;
exports.timer = 499;

const groupesDesSons = [
  [ "groupe0",0, "group",20,50,20,"#CF1919",[],1 ],
  [ "groupe1",1, "group",20,200,20,"#008CBA",[],1 ],
  [ "groupe2",2, "group",20,350,20,"#4CAF50",[],1 ],
  [ "groupe3",3, "group",20,500,20,"#5F6262",[],1 ],
  [ "groupe4",4, "group",20,600,20,"#797bbf",[],1 ],
  [ "groupe5",5, "group",200,50,20,"#008CBA",[],1 ],
  [ "groupe6",6, "group",200,200,20,"#E0095F",[],1 ],
  [ "groupe7",7, "group",200,350,20,"#A76611",[],1 ],
  [ "groupe8",8, "group",200,500,20,"#b3712d",[],1 ],
  [ "groupe9",9, "group",200,600,20,"#666633",[],1 ],
  [ "groupe10",10, "group",340,50,20,"#039879",[],1 ],
  [ "groupe11",11, "group",340,200,20,"#315A93",[],1 ],
  [ "groupe12",12, "group",340,350,20,"#BCA104",[],1 ],
  [ "groupe13",13, "group",340,500,20,"#E0095F",[],1 ],
  [ "groupe14",14, "group",480,50,20,"#E0095F",[],1 ],
  [ "groupe15",15, "group",480,200,20,"#E0095F",[],1 ],
  [ "groupe16",16, "group",480,350,20,"#E0095F",[],1 ],
  [ "groupe17",17, "group",480,500,20,"#E0095F",[],1 ],
  [ "groupe18",18, "group",480,600,20,"#E0095F",[],1 ],
  ];
exports.groupesDesSons = groupesDesSons;
