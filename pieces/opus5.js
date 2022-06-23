"use hopscript"


/***************** OPUS 5 - 2020 *****************************

© Copyright 2019-2020, B. Petit-Heidelein

==============================================================*/
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

exports.reactOnPlay = true;

exports.soundFilesPath1 = "opus5";

exports.avecMusicien = false; // Pour mettre en place les spécificités au jeu avec des musiciens.
exports.decalageFIFOavecMusicien = 4; // Décalage de la FIFO vide avant le premier pattern dans une FIFO.

exports.patternScorePath1 = "";

exports.algoGestionFifo = 0;
exports.shufflePatterns = false;

exports.nbeDeGroupesClients = 2;
function setnbeDeGroupesClients(num) {
  this.nbeDeGroupesClients = num;
}
exports.setnbeDeGroupesClients = setnbeDeGroupesClients;

exports.simulatorInAseperateGroup = false; // Si true, le dernier groupe client est réservé au simulateur.
// Pour un contrôle des Raspberries
exports.useRaspberries = true;
exports.playBufferMessage = "test";
exports.raspOSCPort = 4000;

exports.synchoOnMidiClock = false;
exports.synchroLink = true;
exports.synchroSkini = false;
exports.timer = 499;

const bleu = "#008CBA";
const rouge = '#CF1919';
const vert = "#4CAF50";
const marron = '#666633';
const violet = '#797bbf';
const orange = '#b3712d';
const rose = '#E0095F';
const gris = '#5F6262';
const ocre = '#BCA104';
const terre = '#A76611';
const grisvert = '#039879';
const grisbleu = '#315A93';

// Pour group: nom du groupe (0), index du groupe (1), type (2), x(3), y(4), nbe d'éléments(5), color(6), prédécesseurs(7), n° de scène graphique
// Pour tank:  nom du groupe(0), index du groupe(1), type(2), x(3), y(4), numéro du tank(5), color(6), prédécesseurs(7), n° de scène graphique
// Les pédécésseurs sont les index en commentaires.

const groupesDesSons = [
  ["Piano1Intro1", 10, "tank", 22, 151, 1, orange, [], 1],
  ["Piano1Intro2", 11, "tank", , , 1, orange, []],
  ["Piano1Intro3", 12, "tank", , , 1, orange, []],
  ["Piano1Intro4", 13, "tank", , , 1, orange, []],
  ["Piano1Intro5", 14, "tank", , , 1, orange, []],
  ["Piano1Milieu1", 17, "tank", , , 1, orange, []],
  ["Piano1Milieu2", 18, "tank", , , 1, orange, []],
  ["Piano1Milieu3", 19, "tank", , , 1, orange, []],
  ["Piano1Milieu4", 20, "tank", , , 1, orange, []],
  ["Piano1Milieu5", 21, "tank", , , 1, orange, []],
  ["Piano1Milieu6", 22, "tank", , , 1, orange, []],
  ["Piano1Milieu7", 23, "tank", , , 1, orange, []],
  ["Piano1Fin1", 24, "tank", , , 1, orange, []],
  ["Piano1Fin2", 25, "tank", , , 1, orange, []],
  ["Piano1Fin3", 26, "tank", , , 1, orange, []],
  ["Piano1Fin4", 27, "tank", , , 1, orange, []],
  ["Piano1Fin5", 28, "tank", , , 1, orange, []],

  ["ViolonsIntro1", 31, "tank", 290, 517, 2, gris, [], 1],
  ["ViolonsIntro2", 32, "tank", , , 2, gris, []],
  ["ViolonsIntro3", 33, "tank", , , 2, gris, []],
  ["ViolonsIntro4", 34, "tank", , , 2, gris, []],
  ["ViolonsIntro5", 35, "tank", , , 2, gris, []],
  ["ViolonsIntro6", 36, "tank", , , 2, gris, []],
  ["ViolonsMilieu1", 38, "tank", , , 2, gris, []],
  ["ViolonsMilieu2", 39, "tank", , , 2, gris, []],
  ["ViolonsMilieu3", 40, "tank", , , 2, gris, []],
  ["ViolonsMilieu4", 41, "tank", , , 2, gris, []],
  ["ViolonsFin1", 45, "tank", , , 2, gris, []],
  ["ViolonsFin2", 46, "tank", , , 2, gris, []],
  ["ViolonsFin3", 47, "tank", , , 2, gris, []],
  ["ViolonsFin4", 48, "tank", , , 2, gris, []],
  ["ViolonsFin5", 49, "tank", , , 2, gris, []],

  ["NappeViolons", 50, "group", 292, 419, 15, bleu, [], 1],
  ["NappeAlto", 2, "group", 443, 428, 15, bleu, [], 1],
  ["NappeCello", 3, "group", 601, 503, 15, bleu, [], 1],
  ["NappeCelloRythme", 4, "group", 791, 503, 15, bleu, [], 1],
  ["NappeCTB", 5, "group", 845, 308, 15, bleu, [], 1],
  ["NappeCTBRythme", 6, "group", 845, 393, 15, bleu, [], 1],
  ["S1Action", 7, "group", 167, 418, 15, bleu, [], 1],
  ["S2Action", 8, "group", 167, 517, 15, bleu, [], 1],

  ["Trompette1", 60, "tank", 867, 70, 3, rouge, [], 1],
  ["Trompette2", 61, "tank", , , 3, rouge, []],
  ["Trompette3", 62, "tank", , , 3, rouge, []],
  ["Trompette4", 63, "tank", , , 3, rouge, []],
  ["Trompette5", 64, "tank", , , 3, rouge, []],
  ["Trompette6", 65, "tank", , , 3, rouge, []],
  ["Trompette7", 66, "tank", , , 3, rouge, []],
  ["Trompette8", 67, "tank", , , 3, rouge, []],
  ["Trompette9", 68, "tank", , , 3, rouge, []],

  ["Cors1", 73, "tank", 202, 45, 4, marron, [], 1],
  ["Cors2", 74, "tank", , , 4, grisvert, []],
  ["Cors3", 75, "tank", , , 4, grisvert, []],
  ["Cors4", 76, "tank", , , 4, grisvert, []],

  ["FluteDebut1", 87, "tank", 458, 203, 5, grisvert, [], 1],
  ["FluteDebut2", 88, "tank", , , 5, grisvert, []],
  ["FluteDebut3", 89, "tank", , , 5, grisvert, []],
  ["FluteDebut4", 90, "tank", , , 5, grisvert, []],
  ["FluteMilieu1", 94, "tank", , , 5, grisvert, []],
  ["FluteMilieu2", 95, "tank", , , 5, grisvert, []],
  ["FluteMilieu3", 96, "tank", , , 5, grisvert, []],
  ["FluteFin1", 100, "tank", , , 5, grisvert, []],
  ["FluteFin2", 101, "tank", , , 5, grisvert, []],
  ["FluteFin3", 102, "tank", , , 5, grisvert, []],
  ["FluteFin4", 103, "tank", , , 5, grisvert, []],
  ["FluteFin5", 104, "tank", , , 5, grisvert, []],
  ["FluteFin6", 105, "tank", , , 5, grisvert, []],
  ["FluteNeutre1", 110, "tank", , , 5, grisvert, []],
  ["FluteNeutre2", 111, "tank", , , 5, grisvert, []],
  ["FluteNeutre3", 112, "tank", , , 5, grisvert, []],

  ["ClarinetteDebut1", 115, "tank", 676, 204, 6, violet, [], 1],
  ["ClarinetteDebut2", 116, "tank", , , 6, violet, []],
  ["ClarinetteDebut3", 117, "tank", , , 6, violet, []],
  ["ClarinetteMilieu1", 120, "tank", , , 6, violet, []],
  ["ClarinetteMilieu2", 121, "tank", , , 6, violet, []],
  ["ClarinetteMilieu3", 122, "tank", , , 6, violet, []],
  ["ClarinetteMilieu4", 123, "tank", , , 6, violet, []],
  ["ClarinetteMilieu5", 124, "tank", , , 6, violet, []],
  ["ClarinetteFin1", 125, "tank", , , 6, violet, []],
  ["ClarinetteFin2", 126, "tank", , , 6, violet, []],
  ["ClarinetteFin3", 127, "tank", , , 6, violet, []],

  ["BassonDebut1", 130, "tank", 246, 204, 7, ocre, [], 1],
  ["BassonDebut2", 131, "tank", , , 7, ocre, []],
  ["BassonDebut3", 132, "tank", , , 7, ocre, []],
  ["BassonDebut4", 133, "tank", , , 7, ocre, []],
  ["BassonMilieu1", 135, "tank", , , 7, ocre, []],
  ["BassonMilieu2", 136, "tank", , , 7, ocre, []],
  ["BassonMilieu3", 137, "tank", , , 7, ocre, []],
  ["BassonMilieu4", 138, "tank", , , 7, ocre, []],
  ["BassonMilieu5", 139, "tank", , , 7, ocre, []],
  ["BassonNeutre1", 140, "tank", , , 7, ocre, []],
  ["BassonNeutre2", 141, "tank", , , 7, ocre, []],

  ["Percu1", 150, "tank", 449, 22, 8, grisvert, [], 1],
  ["Percu2", 151, "tank", , , 8, grisvert, []],
  ["Percu3", 152, "tank", , , 8, grisvert, []],
  ["Percu4", 153, "tank", , , 8, grisvert, []],
  ["Percu5", 154, "tank", , , 8, grisvert, []],
  ["Percu6", 155, "tank", , , 8, grisvert, []],
  ["Percu7", 156, "tank", , , 8, grisvert, []],

  ["RiseHit", 160, "group", 603, 22, 7, bleu, [], 1]
];
exports.groupesDesSons = groupesDesSons;