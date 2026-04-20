import { useState, useEffect, useRef } from "react";


const MATIERES_DEFAULT = ["Maths", "Français", "Histoire-Géo", "SVT", "Physique", "Anglais", "Espagnol", "Techno"];
const COULEURS = {
  "Maths": "#c0392b", "Français": "#2e86ab", "Histoire-Géo": "#d4a017",
  "SVT": "#27ae60", "Physique": "#8e44ad", "Anglais": "#e67e22",
  "Espagnol": "#c0392b", "Techno": "#2c3e50",
};

const TRADUCTIONS = {
  fr: {
    titre: "Mindup", planning: "Planning", resumes: "Résumés", quiz: "Quiz",
    reglages: "Réglages", historique: "Historique", profil: "Profil",
    examens: "Tes examens à venir", ajouterExamen: "+ Ajouter un examen", genererPlanning: "Générer mon planning",
    tonCours: "Ton cours", importerFichier: "📎 Importer un fichier (PDF ou .txt)",
    ou: "— ou —", collerCours: "Colle ici le texte de ton cours...", genererResume: "Générer le résumé",
    tonResume: "Ton résumé", genererQuiz: "Générer le Quiz", valider: "Valider mes réponses",
    nouveauQuiz: "Nouveau quiz", generation: "Génération en cours...", erreur: "❌ Erreur. Réessaie.",
    modeSombre: "Mode sombre", modeClairLabel: "Mode clair", langue: "Langue",
    sauvegarder: "Sauvegarder", bonjour: "Bonjour", historiquevide: "Aucun historique pour l'instant.",
    voirPlus: "Voir", reduire: "Réduire", supprimer: "Supprimer",
    quizRealises: "Quiz réalisés", resumesCrees: "Résumés créés", examensPrevus: "Examens prévus", scoreMoyen: "Score moyen",
    evolutionScores: "📈 Évolution de tes scores", modifierProfil: "👤 Modifier mon profil", mesStats: "📊 Mes statistiques",
    mesBadges: "🏅 Mes badges", debloques: "débloqués", predictionNotes: "🎯 Prédiction de notes",
    estimeeDepuis: "Estimé depuis tes quiz, par matière", prenom: "Prénom", nom: "Nom", sauvegarderProfil: "💾 Sauvegarder",
    streakJour: "jour", streakJours: "jours", streakZero: "💤 Fais un quiz ou un résumé aujourd'hui pour démarrer ta streak !",
    streakMsg1: "🌱 C'est parti ! Reviens demain pour commencer ta streak !",
    streakMsg2: "✨ {n} jours d'affilée ! Ne casse pas ta streak !",
    streakMsg3: "🔥 {n} jours d'affilée ! Continue comme ça !",
    streakMsg7: "🏆 {n} jours d'affilée ! Tu es inarrêtable !",
    niveauLabel: "Niveau", xpLabel: "XP",
    clickPhoto: "Clique sur 📷 pour changer ta photo", debloque: "DÉBLOQUÉ ✓", surVingt: "/20 estimé",
    bonneReponse: "bonne réponse", bonnesReponses: "bonnes réponses", sur: "sur",
    excellent: "Excellent ! 🏆", bienJoue: "Bien joué ! 🌸", continuer: "Continue à réviser 💪",
    voirPointsFaibles: "🎯 Voir mes points faibles", erreurLabel: "erreur", erreursLabel: "erreurs",
    aucunPointFaible: "Aucun point faible détecté !", toutBon: "Tu as tout bon, bravo !",
    fermer: "Fermer", validerBtn: "✅ Valider", parfait: "Parfait ! 🌟", continueBtn: "Continue ! 💪",
    nouveauTrous: "🔄 Nouveau texte à trous", verifierReponses: "✅ Vérifier mes réponses",
    questionsBonus: "🔁 3 questions ciblées sur tes lacunes",
    pointsFaiblesLabel: "🎯 Tes points faibles", aucuneErreurMsg: "Aucun point faible détecté !",
    mesMatieresLabel: "📚 Mes matières", ajouterMatiereLabel: "➕ Ajouter une matière",
    couleurLabel: "Couleur :", ajouterBtn: "➕ Ajouter", defautLabel: "défaut",
    recadrerPhoto: "✂️ Recadrer la photo", glisserPhoto: "Glisse pour déplacer · Zoom avec le curseur",
    annuler: "Annuler", validerPhoto: "✓ Valider",
    motsPlacer: "Mots à placer", ordreMelange: "(ordre mélangé)", masquer: "🙈 Masquer", afficher: "👁 Afficher",
    motCorrect: "mot correct", motsCorrects: "mots corrects",
  },
  en: {
    titre: "Mindup", planning: "Schedule", resumes: "Summaries", quiz: "Quiz",
    reglages: "Settings", historique: "History", profil: "Profile",
    examens: "Your upcoming exams", ajouterExamen: "+ Add an exam", genererPlanning: "Generate my schedule",
    tonCours: "Your lesson", importerFichier: "📎 Import a file (PDF or .txt)",
    ou: "— or —", collerCours: "Paste your lesson here...", genererResume: "Generate summary",
    tonResume: "Your summary", genererQuiz: "Generate Quiz", valider: "Submit my answers",
    nouveauQuiz: "New quiz", generation: "Generating...", erreur: "❌ Error. Try again.",
    modeSombre: "Dark mode", modeClairLabel: "Light mode", langue: "Language",
    sauvegarder: "Save", bonjour: "Hello", historiquevide: "No history yet.",
    voirPlus: "View", reduire: "Collapse", supprimer: "Delete",
    quizRealises: "Quizzes done", resumesCrees: "Summaries created", examensPrevus: "Upcoming exams", scoreMoyen: "Average score",
    evolutionScores: "📈 Score evolution", modifierProfil: "👤 Edit my profile", mesStats: "📊 My stats",
    streakJour: "day", streakJours: "days", streakZero: "💤 Do a quiz or summary today to start your streak!",
    streakMsg1: "🌱 Let's go! Come back tomorrow to start your streak!",
    streakMsg2: "✨ {n} days in a row! Don't break your streak!",
    streakMsg3: "🔥 {n} days in a row! Keep it up!",
    streakMsg7: "🏆 {n} days in a row! You're unstoppable!",
    niveauLabel: "Level", xpLabel: "XP",
    mesBadges: "🏅 My badges", debloques: "unlocked", predictionNotes: "🎯 Grade predictions",
    estimeeDepuis: "Estimated from your quizzes, by subject", prenom: "First name", nom: "Last name", sauvegarderProfil: "💾 Save",
    clickPhoto: "Click 📷 to change your photo", debloque: "UNLOCKED ✓", surVingt: "/20 estimated",
    bonneReponse: "correct answer", bonnesReponses: "correct answers", sur: "out of",
    excellent: "Excellent! 🏆", bienJoue: "Well done! 🌸", continuer: "Keep studying 💪",
    voirPointsFaibles: "🎯 See my weak points", erreurLabel: "error", erreursLabel: "errors",
    aucunPointFaible: "No weak points detected!", toutBon: "You got everything right, well done!",
    fermer: "Close", validerBtn: "✅ Submit", parfait: "Perfect! 🌟", continueBtn: "Keep going! 💪",
    nouveauTrous: "🔄 New fill-in-the-blanks", verifierReponses: "✅ Check my answers",
    questionsBonus: "🔁 3 targeted questions on your gaps",
    pointsFaiblesLabel: "🎯 Your weak points", aucuneErreurMsg: "No weak points detected!",
    mesMatieresLabel: "📚 My subjects", ajouterMatiereLabel: "➕ Add a subject",
    couleurLabel: "Color:", ajouterBtn: "➕ Add", defautLabel: "default",
    recadrerPhoto: "✂️ Crop photo", glisserPhoto: "Drag to move · Zoom with slider",
    annuler: "Cancel", validerPhoto: "✓ Confirm",
    motsPlacer: "Words to place", ordreMelange: "(shuffled)", masquer: "🙈 Hide", afficher: "👁 Show",
    motCorrect: "correct word", motsCorrects: "correct words",
  },
  es: {
    titre: "Mindup", planning: "Planificación", resumes: "Resúmenes", quiz: "Quiz",
    reglages: "Ajustes", historique: "Historial", profil: "Perfil",
    examens: "Tus próximos exámenes", ajouterExamen: "+ Añadir examen", genererPlanning: "Generar mi planificación",
    tonCours: "Tu lección", importerFichier: "📎 Importar archivo (PDF o .txt)",
    ou: "— o —", collerCours: "Pega aquí el texto de tu lección...", genererResume: "Generar resumen",
    tonResume: "Tu resumen", genererQuiz: "Generar Quiz", valider: "Validar mis respuestas",
    nouveauQuiz: "Nuevo quiz", generation: "Generando...", erreur: "❌ Error. Inténtalo de nuevo.",
    modeSombre: "Modo oscuro", modeClairLabel: "Modo claro", langue: "Idioma",
    sauvegarder: "Guardar", bonjour: "Hola", historiquevide: "Sin historial por ahora.",
    voirPlus: "Ver", reduire: "Reducir", supprimer: "Eliminar",
    quizRealises: "Quizzes realizados", resumesCrees: "Resúmenes creados", examensPrevus: "Exámenes previstos", scoreMoyen: "Puntuación media",
    evolutionScores: "📈 Evolución de puntuaciones", modifierProfil: "👤 Editar mi perfil", mesStats: "📊 My stats",
    streakJour: "día", streakJours: "días", streakZero: "💤 ¡Haz un quiz o resumen hoy para empezar tu racha!",
    streakMsg1: "🌱 ¡Vamos! ¡Vuelve mañana para empezar tu racha!",
    streakMsg2: "✨ ¡{n} días seguidos! ¡No rompas tu racha!",
    streakMsg3: "🔥 ¡{n} días seguidos! ¡Sigue así!",
    streakMsg7: "🏆 ¡{n} días seguidos! ¡Eres imparable!",
    niveauLabel: "Nivel", xpLabel: "XP",
    mesBadges: "🏅 Mis insignias", debloques: "desbloqueadas", predictionNotes: "🎯 Predicción de notas",
    estimeeDepuis: "Estimado a partir de tus quizzes, por asignatura", prenom: "Nombre", nom: "Apellido", sauvegarderProfil: "💾 Guardar",
    clickPhoto: "Toca 📷 para cambiar tu foto", debloque: "DESBLOQUEADO ✓", surVingt: "/20 estimado",
    bonneReponse: "respuesta correcta", bonnesReponses: "respuestas correctas", sur: "de",
    excellent: "¡Excelente! 🏆", bienJoue: "¡Bien hecho! 🌸", continuer: "Sigue estudiando 💪",
    voirPointsFaibles: "🎯 Ver mis puntos débiles", erreurLabel: "error", erreursLabel: "errores",
    aucunPointFaible: "¡Ningún punto débil detectado!", toutBon: "¡Todo correcto, bravo!",
    fermer: "Cerrar", validerBtn: "✅ Validar", parfait: "¡Perfecto! 🌟", continueBtn: "¡Sigue! 💪",
    nouveauTrous: "🔄 Nuevo texto con huecos", verifierReponses: "✅ Verificar mis respuestas",
    questionsBonus: "🔁 3 preguntas sobre tus lagunas",
    pointsFaiblesLabel: "🎯 Tus puntos débiles", aucuneErreurMsg: "¡Ningún punto débil detectado!",
    mesMatieresLabel: "📚 Mis asignaturas", ajouterMatiereLabel: "➕ Añadir asignatura",
    couleurLabel: "Color:", ajouterBtn: "➕ Añadir", defautLabel: "predeterminado",
    recadrerPhoto: "✂️ Recortar foto", glisserPhoto: "Arrastra para mover · Zoom con el deslizador",
    annuler: "Cancelar", validerPhoto: "✓ Confirmar",
    motsPlacer: "Palabras a colocar", ordreMelange: "(orden mezclado)", masquer: "🙈 Ocultar", afficher: "👁 Mostrar",
    motCorrect: "palabra correcta", motsCorrects: "palabras correctas",
  }
};

const VICHY_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23f5efe0'/%3E%3Crect width='20' height='20' fill='%23ddd0b3' opacity='0.55'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%23ddd0b3' opacity='0.55'/%3E%3C/svg%3E")`;
const ETOILES_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%230d1b2a'/%3E%3Cg fill='white'%3E%3Ccircle cx='20' cy='15' r='1' opacity='0.7'/%3E%3Ccircle cx='75' cy='8' r='1.5' opacity='0.5'/%3E%3Ccircle cx='140' cy='22' r='1' opacity='0.6'/%3E%3Ccircle cx='180' cy='5' r='1' opacity='0.4'/%3E%3Ccircle cx='55' cy='45' r='1' opacity='0.5'/%3E%3Ccircle cx='110' cy='38' r='1.5' opacity='0.7'/%3E%3Ccircle cx='30' cy='80' r='1.5' opacity='0.6'/%3E%3Ccircle cx='90' cy='72' r='1' opacity='0.5'/%3E%3Ccircle cx='150' cy='88' r='1' opacity='0.7'/%3E%3Ccircle cx='10' cy='120' r='1' opacity='0.6'/%3E%3Ccircle cx='65' cy='110' r='1.5' opacity='0.5'/%3E%3Ccircle cx='125' cy='130' r='1' opacity='0.7'/%3E%3Ccircle cx='45' cy='160' r='1' opacity='0.5'/%3E%3Ccircle cx='100' cy='155' r='1.5' opacity='0.6'/%3E%3Ccircle cx='145' cy='180' r='1.5' opacity='0.6'/%3E%3C/g%3E%3C/svg%3E")`;

function getThemeVars(s) {
  return {
    bg: s ? "#0d1b2a" : "#f5efe0",
    bgImage: s ? ETOILES_BG : VICHY_BG,
    bgSize: s ? "200px 200px" : "40px 40px",
    navBg: s ? "rgba(13,27,42,0.97)" : "rgba(245,239,224,0.97)",
    cardBg: s ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.82)",
    cardBorder: s ? "rgba(255,255,255,0.1)" : "rgba(180,160,120,0.3)",
    inputBg: s ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)",
    inputBorder: s ? "rgba(255,255,255,0.15)" : "rgba(180,160,120,0.4)",
    text: s ? "#e8dcc8" : "#3d2b1f",
    textMuted: s ? "rgba(232,220,200,0.5)" : "rgba(61,43,31,0.45)",
    accent: s ? "#7eb8d4" : "#7a5c2e",
    accentBg: s ? "rgba(126,184,212,0.2)" : "rgba(122,92,46,0.1)",
    btnActive: s ? "#7eb8d4" : "#7a5c2e",
    btnActiveTxt: s ? "#0d1b2a" : "#fff",
  };
}

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

// ─── BADGES ──────────────────────────────────────────────────────────────────
// ============ XP SYSTEM ============
function getXpPourNiveau(niveau) {
  if (niveau < 10) return 100;
  if (niveau < 35) return 150;
  if (niveau < 75) return 200;
  return 225;
}
function getNiveauFromXpTotal(xpTotal) {
  let niveau = 1;
  let xpRestant = xpTotal;
  while (true) {
    const requis = getXpPourNiveau(niveau);
    if (xpRestant < requis) break;
    xpRestant -= requis;
    niveau++;
  }
  return { niveau, xpActuel: xpRestant, xpRequis: getXpPourNiveau(niveau) };
}
function getXpGain(type) {
  if (type === "quiz") return 20;
  if (type === "trous") return 25;
  if (type === "resume") return 15;
  return 0;
}
// ====================================


// ============ DONNÉES JEUX PAUSE ============
const CAPITALES = [
  ["France","Paris"],["Allemagne","Berlin"],["Espagne","Madrid"],["Italie","Rome"],["Portugal","Lisbonne"],
  ["Belgique","Bruxelles"],["Pays-Bas","Amsterdam"],["Suisse","Berne"],["Autriche","Vienne"],["Pologne","Varsovie"],
  ["Suède","Stockholm"],["Norvège","Oslo"],["Danemark","Copenhague"],["Finlande","Helsinki"],["Grèce","Athènes"],
  ["Russie","Moscou"],["Ukraine","Kiev"],["Turquie","Ankara"],["Maroc","Rabat"],["Algérie","Alger"],
  ["Tunisie","Tunis"],["Égypte","Le Caire"],["Sénégal","Dakar"],["Côte d'Ivoire","Yamoussoukro"],["Nigeria","Abuja"],
  ["Afrique du Sud","Pretoria"],["Kenya","Nairobi"],["Éthiopie","Addis-Abeba"],["États-Unis","Washington"],
  ["Canada","Ottawa"],["Mexique","Mexico"],["Brésil","Brasilia"],["Argentine","Buenos Aires"],["Chili","Santiago"],
  ["Colombie","Bogota"],["Pérou","Lima"],["Japon","Tokyo"],["Chine","Pékin"],["Inde","New Delhi"],
  ["Australie","Canberra"],["Corée du Sud","Séoul"],["Thaïlande","Bangkok"],["Vietnam","Hanoi"],["Indonésie","Jakarta"],
  ["Pakistan","Islamabad"],["Arabie Saoudite","Riyad"],["Iran","Téhéran"],["Irak","Bagdad"],["Israël","Jérusalem"],
];

const FLASHCARDS = {
  fr: {
    en: [
      ["Bonjour","Hello"],["Merci","Thank you"],["Au revoir","Goodbye"],["S'il vous plaît","Please"],
      ["Oui","Yes"],["Non","No"],["Comment allez-vous ?","How are you?"],["Je ne comprends pas","I don't understand"],
      ["Où est...?","Where is...?"],["Combien ça coûte ?","How much is it?"],["Je m'appelle...","My name is..."],
      ["J'ai faim","I'm hungry"],["J'ai soif","I'm thirsty"],["Aide-moi","Help me"],["Je suis perdu","I'm lost"],
    ],
    es: [
      ["Bonjour","Hola"],["Merci","Gracias"],["Au revoir","Adiós"],["S'il vous plaît","Por favor"],
      ["Oui","Sí"],["Non","No"],["Comment allez-vous ?","¿Cómo está usted?"],["Je ne comprends pas","No entiendo"],
      ["Où est...?","¿Dónde está...?"],["Combien ça coûte ?","¿Cuánto cuesta?"],["Je m'appelle...","Me llamo..."],
      ["J'ai faim","Tengo hambre"],["J'ai soif","Tengo sed"],["Aide-moi","Ayúdame"],["Je suis perdu","Estoy perdido"],
    ],
    de: [
      ["Bonjour","Guten Tag"],["Merci","Danke"],["Au revoir","Auf Wiedersehen"],["S'il vous plaît","Bitte"],
      ["Oui","Ja"],["Non","Nein"],["Comment allez-vous ?","Wie geht es Ihnen?"],["Je ne comprends pas","Ich verstehe nicht"],
      ["Où est...?","Wo ist...?"],["Combien ça coûte ?","Was kostet das?"],["Je m'appelle...","Ich heiße..."],
      ["J'ai faim","Ich habe Hunger"],["J'ai soif","Ich habe Durst"],["Aide-moi","Hilf mir"],["Je suis perdu","Ich bin verloren"],
    ],
  },
  en: {
    fr: [
      ["Hello","Bonjour"],["Thank you","Merci"],["Goodbye","Au revoir"],["Please","S'il vous plaît"],
      ["Yes","Oui"],["No","Non"],["How are you?","Comment allez-vous ?"],["I don't understand","Je ne comprends pas"],
      ["Where is...?","Où est...?"],["How much is it?","Combien ça coûte ?"],["My name is...","Je m'appelle..."],
      ["I'm hungry","J'ai faim"],["I'm thirsty","J'ai soif"],["Help me","Aide-moi"],["I'm lost","Je suis perdu"],
    ],
    es: [
      ["Hello","Hola"],["Thank you","Gracias"],["Goodbye","Adiós"],["Please","Por favor"],
      ["Yes","Sí"],["No","No"],["How are you?","¿Cómo estás?"],["I don't understand","No entiendo"],
      ["Where is...?","¿Dónde está...?"],["How much is it?","¿Cuánto cuesta?"],["My name is...","Me llamo..."],
      ["I'm hungry","Tengo hambre"],["I'm thirsty","Tengo sed"],["Help me","Ayúdame"],["I'm lost","Estoy perdido"],
    ],
  },
  es: {
    fr: [
      ["Hola","Bonjour"],["Gracias","Merci"],["Adiós","Au revoir"],["Por favor","S'il vous plaît"],
      ["Sí","Oui"],["No","Non"],["¿Cómo estás?","Comment vas-tu ?"],["No entiendo","Je ne comprends pas"],
      ["¿Dónde está...?","Où est...?"],["¿Cuánto cuesta?","Combien ça coûte ?"],["Me llamo...","Je m'appelle..."],
      ["Tengo hambre","J'ai faim"],["Tengo sed","J'ai soif"],["Ayúdame","Aide-moi"],["Estoy perdido","Je suis perdu"],
    ],
    en: [
      ["Hola","Hello"],["Gracias","Thank you"],["Adiós","Goodbye"],["Por favor","Please"],
      ["Sí","Yes"],["No","No"],["¿Cómo estás?","How are you?"],["No entiendo","I don't understand"],
      ["¿Dónde está...?","Where is...?"],["¿Cuánto cuesta?","How much is it?"],["Me llamo...","My name is..."],
      ["Tengo hambre","I'm hungry"],["Tengo sed","I'm thirsty"],["Ayúdame","Help me"],["Estoy perdido","I'm lost"],
    ],
  },
};

const PHRASES_QUOTIDIEN = {
  fr: {
    en: [
      ["Peux-tu répéter s'il te plaît ?","Could you repeat that please?"],
      ["Je voudrais réserver une table","I'd like to book a table"],
      ["À quelle heure ouvre le musée ?","What time does the museum open?"],
      ["Pouvez-vous m'aider ?","Can you help me?"],
      ["C'est trop cher","It's too expensive"],
      ["Je cherche la gare","I'm looking for the train station"],
      ["L'addition s'il vous plaît","The bill please"],
      ["Je suis allergique à...","I'm allergic to..."],
      ["Appelez une ambulance !","Call an ambulance!"],
      ["Parlez-vous français ?","Do you speak French?"],
    ],
    es: [
      ["Peux-tu répéter s'il te plaît ?","¿Puedes repetir por favor?"],
      ["Je voudrais réserver une table","Quisiera reservar una mesa"],
      ["À quelle heure ouvre le musée ?","¿A qué hora abre el museo?"],
      ["Pouvez-vous m'aider ?","¿Puede ayudarme?"],
      ["C'est trop cher","Es demasiado caro"],
      ["Je cherche la gare","Estoy buscando la estación"],
      ["L'addition s'il vous plaît","La cuenta por favor"],
      ["Je suis allergique à...","Soy alérgico a..."],
      ["Appelez une ambulance !","¡Llame a una ambulancia!"],
      ["Parlez-vous français ?","¿Habla usted francés?"],
    ],
  },
  en: {
    fr: [
      ["Could you repeat that please?","Peux-tu répéter s'il te plaît ?"],
      ["I'd like to book a table","Je voudrais réserver une table"],
      ["What time does the museum open?","À quelle heure ouvre le musée ?"],
      ["Can you help me?","Pouvez-vous m'aider ?"],
      ["It's too expensive","C'est trop cher"],
      ["I'm looking for the train station","Je cherche la gare"],
      ["The bill please","L'addition s'il vous plaît"],
      ["I'm allergic to...","Je suis allergique à..."],
      ["Call an ambulance!","Appelez une ambulance !"],
      ["Do you speak English?","Parlez-vous anglais ?"],
    ],
    es: [
      ["Could you repeat that please?","¿Puedes repetir por favor?"],
      ["I'd like to book a table","Quisiera reservar una mesa"],
      ["What time does the museum open?","¿A qué hora abre el museo?"],
      ["Can you help me?","¿Puede ayudarme?"],
      ["It's too expensive","Es demasiado caro"],
      ["I'm looking for the train station","Estoy buscando la estación"],
      ["The bill please","La cuenta por favor"],
      ["I'm allergic to...","Soy alérgico a..."],
      ["Call an ambulance!","¡Llame a una ambulancia!"],
      ["Do you speak English?","¿Habla usted inglés?"],
    ],
  },
  es: {
    fr: [
      ["¿Puedes repetir por favor?","Peux-tu répéter s'il te plaît ?"],
      ["Quisiera reservar una mesa","Je voudrais réserver une table"],
      ["¿A qué hora abre el museo?","À quelle heure ouvre le musée ?"],
      ["¿Puede ayudarme?","Pouvez-vous m'aider ?"],
      ["Es demasiado caro","C'est trop cher"],
      ["Estoy buscando la estación","Je cherche la gare"],
      ["La cuenta por favor","L'addition s'il vous plaît"],
      ["Soy alérgico a...","Je suis allergique à..."],
      ["¡Llame a una ambulancia!","Appelez une ambulance !"],
      ["¿Habla usted español?","Parlez-vous espagnol ?"],
    ],
    en: [
      ["¿Puedes repetir por favor?","Could you repeat that please?"],
      ["Quisiera reservar una mesa","I'd like to book a table"],
      ["¿A qué hora abre el museo?","What time does the museum open?"],
      ["¿Puede ayudarme?","Can you help me?"],
      ["Es demasiado caro","It's too expensive"],
      ["Estoy buscando la estación","I'm looking for the train station"],
      ["La cuenta por favor","The bill please"],
      ["Soy alérgico a...","I'm allergic to..."],
      ["¡Llame a una ambulancia!","Call an ambulance!"],
      ["¿Habla usted español?","Do you speak Spanish?"],
    ],
  },
};

function normaliserReponse(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[-\s]/g, "")
    .trim();
}
// =============================================

const BADGES_TRADUCTIONS = {
  premiere_revision: { fr: ["Première étincelle", "Tu as fait ta première révision !"], en: ["First spark", "You did your first study session!"], es: ["Primera chispa", "¡Hiciste tu primera revisión!"] },
  quiz_x5: { fr: ["Quiz addict", "5 quiz réalisés"], en: ["Quiz addict", "5 quizzes done"], es: ["Quiz addict", "5 quizzes realizados"] },
  resume_x5: { fr: ["Plume studieuse", "5 résumés créés"], en: ["Studious pen", "5 summaries created"], es: ["Pluma estudiosa", "5 resúmenes creados"] },
  perfect: { fr: ["Perfectionniste", "100% à un quiz !"], en: ["Perfectionist", "100% on a quiz!"], es: ["Perfeccionista", "¡100% en un quiz!"] },
  dix_revisions: { fr: ["Travailleur acharné", "10 révisions au total"], en: ["Hard worker", "10 study sessions total"], es: ["Trabajador incansable", "10 revisiones en total"] },
  champion: { fr: ["Champion", "100% trois fois d'affilée !"], en: ["Champion", "100% three times in a row!"], es: ["Campeón", "¡100% tres veces seguidas!"] },
};

const BADGES_DEF = [
  {
    id: "premiere_revision", nom: "Première étincelle", description: "Tu as fait ta première révision !",
    condition: (h) => h.length >= 1, gradient: ["#f6d365", "#fda085"],
    icon: <svg viewBox="0 0 40 40" width="36" height="36"><polygon points="20,4 24,15 36,15 27,23 30,35 20,28 10,35 13,23 4,15 16,15" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><polygon points="20,8 23,16 32,16 25,22 28,31 20,26 12,31 15,22 8,16 17,16" fill="white" opacity="0.3"/></svg>,
  },
  {
    id: "quiz_x5", nom: "Quiz addict", description: "5 quiz réalisés",
    condition: (h) => h.filter(x => x.type === "quiz").length >= 5, gradient: ["#a18cd1", "#fbc2eb"],
    icon: <svg viewBox="0 0 40 40" width="36" height="36"><circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="2"/><text x="20" y="26" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">?</text></svg>,
  },
  {
    id: "resume_x5", nom: "Plume studieuse", description: "5 résumés créés",
    condition: (h) => h.filter(x => x.type === "resume").length >= 5, gradient: ["#84fab0", "#8fd3f4"],
    icon: <svg viewBox="0 0 40 40" width="36" height="36"><path d="M28 6 C32 10 32 18 20 22 L14 34 L12 32 L24 20 C14 18 10 10 14 6 C18 2 24 2 28 6Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><line x1="14" y1="28" x2="18" y2="32" stroke="white" strokeWidth="2"/></svg>,
  },
  {
    id: "perfect", nom: "Perfectionniste", description: "100% à un quiz !",
    condition: (h) => h.some(x => x.type === "quiz" && x.score / (x.questions?.length || 5) === 1),
    gradient: ["#f9d423", "#f83600"],
    icon: <svg viewBox="0 0 40 40" width="36" height="36"><path d="M20 6 L23 14 L32 14 L25 20 L28 29 L20 23 L12 29 L15 20 L8 14 L17 14Z" fill="white" opacity="0.9"/></svg>,
  },
  {
    id: "dix_revisions", nom: "Travailleur acharné", description: "10 révisions au total",
    condition: (h) => h.length >= 10, gradient: ["#30cfd0", "#330867"],
    icon: <svg viewBox="0 0 40 40" width="36" height="36"><rect x="8" y="10" width="24" height="20" rx="3" fill="none" stroke="white" strokeWidth="2"/><line x1="13" y1="17" x2="27" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="22" x2="27" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="27" x2="20" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  {
    id: "champion", nom: "Champion", description: "100% trois fois d'affilée !",
    condition: (h) => {
      const quiz = h.filter(x => x.type === "quiz");
      let streak = 0;
      for (let i = quiz.length - 1; i >= 0; i--) {
        if (quiz[i].score / (quiz[i].questions?.length || 5) === 1) { streak++; if (streak >= 3) return true; }
        else streak = 0;
      }
      return false;
    },
    gradient: ["#f9d423", "#e040fb"],
    icon: <svg viewBox="0 0 40 40" width="36" height="36"><path d="M10 8 L10 20 C10 28 20 34 20 34 C20 34 30 28 30 20 L30 8Z" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/><path d="M4 8 L10 8 L10 18 C8 16 4 12 4 8Z" fill="white" opacity="0.4"/><path d="M36 8 L30 8 L30 18 C32 16 36 12 36 8Z" fill="white" opacity="0.4"/></svg>,
  },
];

async function callGroq(prompt) {
  if (!prompt || prompt.trim().length < 10) throw new Error("Texte trop court");
  const response = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "user", content: prompt }], max_tokens: 4000, temperature: 0.7 })
  });
  if (!response.ok) { const err = await response.json(); throw new Error(JSON.stringify(err)); }
  const data = await response.json();
  return data.choices[0].message.content;
}

async function lireFichier(file) {
  return new Promise((resolve, reject) => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    } else if (file.type === "application/pdf") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = async () => {
        const pdfjsLib = window["pdfjs-dist/build/pdf"];
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const reader2 = new FileReader();
        reader2.onload = async e => {
          try {
            const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(e.target.result) }).promise;
            let texte = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              texte += content.items.map(item => item.str).join(" ") + "\n";
            }
            resolve(texte);
          } catch { reject(new Error("Impossible de lire ce PDF")); }
        };
        reader2.readAsArrayBuffer(file);
      };
      document.head.appendChild(script);
    } else {
      reject(new Error("Format non supporté. Utilise un PDF ou .txt"));
    }
  });
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
function Card({ children, v, style = {} }) {
  return (
    <div style={{ background: v.cardBg, borderRadius: 20, padding: "1.2rem", border: `1px solid ${v.cardBorder}`, backdropFilter: "blur(8px)", marginBottom: "1rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, disabled, full, outline, danger, small, v, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: full ? "100%" : "auto", padding: small ? "0.4rem 0.8rem" : "0.7rem 1.1rem", borderRadius: 50, border: danger ? "1px solid rgba(180,80,80,0.4)" : outline ? `1px solid ${v.inputBorder}` : "none", background: danger ? "rgba(180,80,80,0.1)" : outline ? "transparent" : v.btnActive, color: danger ? "#c0392b" : outline ? v.accent : v.btnActiveTxt, fontWeight: 600, cursor: disabled ? "wait" : "pointer", fontSize: small ? "0.78rem" : "0.88rem", fontFamily: "inherit", opacity: disabled ? 0.6 : 1, ...style }}>
      {children}
    </button>
  );
}

function InputStyle({ v, ...props }) {
  return <input {...props} style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 50, border: `1px solid ${v.inputBorder}`, background: v.inputBg, color: v.text, fontSize: "0.9rem", boxSizing: "border-box", outline: "none", ...(props.style || {}) }} />;
}

function SelectStyle({ v, children, ...props }) {
  return <select {...props} style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: 50, border: `1px solid ${v.inputBorder}`, background: v.inputBg, color: v.text, fontSize: "0.9rem", boxSizing: "border-box", outline: "none", ...(props.style || {}) }}>{children}</select>;
}

function ZoneSaisie({ texte, setTexte, placeholder, t, v }) {
  const [loading, setLoading] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setLoading(true);
    try { setTexte(await lireFichier(file)); } catch (err) { alert("❌ " + err.message); }
    setLoading(false); e.target.value = "";
  };
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.7rem", borderRadius: 50, border: `1px dashed ${v.inputBorder}`, background: "transparent", color: v.accent, cursor: "pointer", marginBottom: "0.6rem", fontSize: "0.88rem", boxSizing: "border-box" }}>
        {loading ? "⏳" : t.importerFichier}
        <input type="file" accept=".txt,.pdf" onChange={handleFile} style={{ display: "none" }} />
      </label>
      <div style={{ textAlign: "center", color: v.textMuted, fontSize: "0.8rem", marginBottom: "0.6rem" }}>{t.ou}</div>
      <textarea value={texte} onChange={e => setTexte(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", minHeight: 120, padding: "0.9rem", borderRadius: 16, border: `1px solid ${v.inputBorder}`, background: v.inputBg, color: v.text, fontSize: "0.9rem", resize: "vertical", boxSizing: "border-box", outline: "none", fontFamily: "inherit" }} />
    </div>
  );
}

// ─── MINI POMODORO ────────────────────────────────────────────────────────────
function usePomodoroTimer() {
  const WORK = 25 * 60, PAUSE = 5 * 60;
  const [secondes, setSecondes] = useState(WORK);
  const [actif, setActif] = useState(false);
  const [mode, setMode] = useState("work");
  const intervalRef = useRef(null);
  useEffect(() => {
    if (actif) {
      intervalRef.current = setInterval(() => {
        setSecondes(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current); setActif(false);
            const p = mode === "work" ? "pause" : "work";
            setMode(p); setSecondes(p === "work" ? WORK : PAUSE); return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else { clearInterval(intervalRef.current); }
    return () => clearInterval(intervalRef.current);
  }, [actif, mode]);
  const reset = () => { setActif(false); setSecondes(mode === "work" ? WORK : PAUSE); };
  const switchMode = (m) => { setActif(false); setMode(m); setSecondes(m === "work" ? WORK : PAUSE); };
  const mm = String(Math.floor(secondes / 60)).padStart(2, "0");
  const ss = String(secondes % 60).padStart(2, "0");
  const total = mode === "work" ? WORK : PAUSE;
  const progress = (total - secondes) / total;
  const couleur = mode === "work" ? "#e74c3c" : "#27ae60";
  return { mm, ss, actif, setActif, mode, switchMode, reset, progress, couleur };
}

function MiniPomodoro({ v, visible, onClose }) {
  const { mm, ss, actif, setActif, mode, switchMode, reset, progress, couleur } = usePomodoroTimer();
  const size = 28, r = 11, circ = 2 * Math.PI * r;
  if (!visible) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: `${couleur}15`, border: `1px solid ${couleur}50`, borderRadius: 50, padding: "0.25rem 0.6rem 0.25rem 0.4rem" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${couleur}25`} strokeWidth="3"/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={couleur} strokeWidth="3" strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }}/>
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "0.5rem", color: couleur, lineHeight: 1 }}>{mode === "work" ? "🍅" : "☕"}</div>
      </div>
      <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: couleur, letterSpacing: "0.05em" }}>{mm}:{ss}</span>
      <button onClick={() => setActif(a => !a)} style={{ background: couleur, border: "none", borderRadius: 50, color: "white", width: 20, height: 20, fontSize: "0.55rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{actif ? "⏸" : "▶"}</button>
      <button onClick={reset} style={{ background: "transparent", border: "none", color: couleur, fontSize: "0.75rem", cursor: "pointer", padding: 0, opacity: 0.7 }}>↺</button>
      <button onClick={() => switchMode(mode === "work" ? "pause" : "work")} style={{ background: "transparent", border: `1px solid ${couleur}40`, borderRadius: 50, color: couleur, fontSize: "0.62rem", cursor: "pointer", padding: "0.1rem 0.4rem", opacity: 0.8 }}>{mode === "work" ? "☕" : "🍅"}</button>
      <button onClick={onClose} style={{ background: "transparent", border: "none", color: v.textMuted, fontSize: "0.75rem", cursor: "pointer", padding: 0, marginLeft: "0.1rem" }}>✕</button>
    </div>
  );
}

// ─── GRAPHIQUE SCORES ─────────────────────────────────────────────────────────
function GraphiqueScores({ historique, v, langue }) {
  const quiz = historique.filter(h => h.type === "quiz").slice(-10);
  if (quiz.length < 2) return <div style={{ textAlign: "center", color: v.textMuted, fontSize: "0.85rem", padding: "1.5rem 0" }}>{langue === "en" ? "Do at least 2 quizzes to see your graph 📈" : langue === "es" ? "Haz al menos 2 quizzes para ver tu gráfico 📈" : "Fais au moins 2 quiz pour voir ton graphique 📈"}</div>;
  const scores = quiz.map(q => Math.round(q.score / (q.questions?.length || 5) * 100));
  const W = 280, H = 120, pad = 20;
  const stepX = (W - pad * 2) / (scores.length - 1);
  const points = scores.map((s, i) => ({ x: pad + i * stepX, y: H - pad - (s / 100) * (H - pad * 2), score: s }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length-1].x} ${H-pad} L ${pad} ${H-pad} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={v.accent} stopOpacity="0.8"/><stop offset="100%" stopColor={v.accent} stopOpacity="0"/></linearGradient></defs>
        {[0,25,50,75,100].map(pct => (
          <g key={pct}>
            <line x1={pad} y1={H-pad-(pct/100)*(H-pad*2)} x2={W-pad} y2={H-pad-(pct/100)*(H-pad*2)} stroke={v.cardBorder} strokeWidth="1" strokeDasharray="3,3"/>
            <text x={pad-4} y={H-pad-(pct/100)*(H-pad*2)+4} textAnchor="end" fill={v.textMuted} fontSize="8">{pct}%</text>
          </g>
        ))}
        <path d={areaD} fill="url(#grad)" opacity="0.3"/>
        <path d={pathD} fill="none" stroke={v.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill={v.accent} stroke={v.cardBg} strokeWidth="2"/>
            <text x={p.x} y={p.y-10} textAnchor="middle" fill={v.accent} fontSize="9" fontWeight="bold">{p.score}%</text>
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
        {quiz.map((q, i) => <div key={i} style={{ fontSize: "0.65rem", color: v.textMuted, textAlign: "center", flex: 1 }}>{q.matiere.slice(0,3)}</div>)}
      </div>

    </div>
  );
}

// ─── PRÉDICTION DE NOTE PAR MATIÈRE ──────────────────────────────────────────
function PredictionNotes({ historique, v, langue }) {
  const quizParMatiere = {};
  historique.filter(h => h.type === "quiz").forEach(q => {
    if (!quizParMatiere[q.matiere]) quizParMatiere[q.matiere] = [];
    quizParMatiere[q.matiere].push(Math.round(q.score / (q.questions?.length || 5) * 100));
  });
  const matieres = Object.keys(quizParMatiere);
  if (matieres.length === 0) return (
    <div style={{ textAlign: "center", color: v.textMuted, fontSize: "0.85rem", padding: "1rem 0" }}>
      {langue === "en" ? "Do quizzes to see your grade prediction 🎯" : langue === "es" ? "Haz quizzes para ver tu predicción de nota 🎯" : "Fais des quiz pour voir ta prédiction de note 🎯"}
    </div>
  );

  const predireNote = (scores) => {
    const moy = scores.reduce((a, b) => a + b, 0) / scores.length;
    // Tendance : les derniers scores comptent plus
    const poids = scores.map((_, i) => i + 1);
    const total = poids.reduce((a, b) => a + b, 0);
    const moyPonderee = scores.reduce((acc, s, i) => acc + s * poids[i], 0) / total;
    // Conversion en note /20
    const note = (moyPonderee / 100) * 20;
    return { note: Math.round(note * 10) / 10, moy: Math.round(moy), tendance: scores.length >= 2 ? scores[scores.length-1] - scores[scores.length-2] : 0 };
  };

  const getEmoji = (note) => {
    if (note >= 16) return "🏆";
    if (note >= 14) return "🌟";
    if (note >= 12) return "😊";
    if (note >= 10) return "📚";
    return "💪";
  };

  const getColor = (note) => {
    if (note >= 14) return "#27ae60";
    if (note >= 10) return "#d4a017";
    return "#c0392b";
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.7rem" }}>
      {matieres.map(matiere => {
        const scores = quizParMatiere[matiere];
        const { note, moy, tendance } = predireNote(scores);
        const couleur = COULEURS[matiere] || v.accent;
        const noteColor = getColor(note);
        return (
          <div key={matiere} style={{ background: v.cardBg, border: `1px solid ${couleur}40`, borderRadius: 16, padding: "1rem 0.8rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${couleur}, ${couleur}80)`, borderRadius: "16px 16px 0 0" }} />
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: couleur, marginBottom: "0.4rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{matiere}</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: noteColor, lineHeight: 1 }}>{note}</div>
            <div style={{ fontSize: "0.65rem", color: v.textMuted, marginBottom: "0.4rem" }}>/20 estimé</div>
            <div style={{ fontSize: "0.7rem", color: v.textMuted }}>{scores.length} quiz • moy {moy}%</div>
            {scores.length >= 2 && (
              <div style={{ fontSize: "0.68rem", marginTop: "0.3rem", color: tendance > 0 ? "#27ae60" : tendance < 0 ? "#c0392b" : v.textMuted, fontWeight: 600 }}>
                {tendance > 0 ? `↑ +${tendance}%` : tendance < 0 ? `↓ ${tendance}%` : "→ stable"}
              </div>
            )}
            <div style={{ fontSize: "1.1rem", marginTop: "0.3rem" }}>{getEmoji(note)}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── TEXTE À TROUS ────────────────────────────────────────────────────────────
function TexteATrous({ texte, matiere, v, t, onClose, langue, ajouterHistorique }) {
  const [trous, setTrous] = useState(null);
  const [reponses, setReponses] = useState({});
  const [valide, setValide] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { generer(); }, []);

  const generer = async () => {
    setLoading(true); setTrous(null); setReponses({}); setValide(false);
    try {
      const result = await callGroq(`Tu es un professeur de ${matiere} au collège. Crée un exercice de texte à trous.

RÈGLES STRICTES :
1. Écris un RÉSUMÉ clair du cours en 6 à 8 phrases bien construites (ne recopie pas le cours mot pour mot).
2. Cache exactement 8 mots-clés avec le format _MOT_ : uniquement des notions essentielles (noms communs ou verbes importants), jamais des chiffres, sigles, noms propres, articles ou mots grammaticaux.
3. Maximum 1 trou par phrase pour que le texte reste lisible et logique.
4. Les mots cachés doivent être des concepts clés du cours, pas des mots anodins.

Retourne UNIQUEMENT ce JSON valide, sans markdown, sans texte avant ou après :
{"texte":"Phrase 1 avec _MOT1_. Phrase 2 avec _MOT2_. Etc.","mots":["MOT1","MOT2",...]}

Les mots dans "mots" doivent être EXACTEMENT identiques (même casse) aux trous.

Cours de ${matiere} :
${texte.slice(0, 3000)}`);
      const data = JSON.parse(result.replace(/```json|```/g, "").trim());
      // Découpe le texte en segments
      const segments = [];
      let reste = data.texte;
      let idx = 0;
      const regex = /_([^_]+)_/g;
      let match;
      let lastIndex = 0;
      while ((match = regex.exec(data.texte)) !== null) {
        if (match.index > lastIndex) segments.push({ type: "text", content: data.texte.slice(lastIndex, match.index) });
        segments.push({ type: "trou", mot: match[1], id: idx++ });
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < data.texte.length) segments.push({ type: "text", content: data.texte.slice(lastIndex) });
      // Mélange aléatoire Fisher-Yates
      const motsMelanges = [...data.mots].sort(() => Math.random() - 0.5);
      setTrous({ segments, mots: motsMelanges });
    } catch (e) { alert(t.erreur); onClose(); }
    setLoading(false);
  };

  const [motsVisibles, setMotsVisibles] = useState(true);

  if (loading) return <div style={{ textAlign: "center", padding: "2rem", color: v.textMuted }}>✨ {t.generation}</div>;
  if (!trous) return null;

  const score = trous.segments.filter(s => s.type === "trou" && reponses[s.id]?.toLowerCase().trim() === s.mot.toLowerCase()).length;
  const total = trous.segments.filter(s => s.type === "trou").length;
  const pct = Math.round(score / total * 100);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ fontWeight: 700, color: v.accent, fontSize: "1rem" }}>✍️ Texte à trous — {matiere}</div>
        <button onClick={onClose} style={{ background: "transparent", border: "none", color: v.textMuted, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
      </div>

      {/* Banque de mots */}
      {!valide && (
        <div style={{ background: v.accentBg, border: `1px solid ${v.accent}30`, borderRadius: 12, padding: "0.7rem 1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: motsVisibles ? "0.6rem" : 0 }}>
            <div style={{ fontSize: "0.78rem", color: v.textMuted, fontWeight: 600 }}>
              📋 Mots à placer <span style={{ opacity: 0.55 }}>(ordre mélangé)</span>
            </div>
            <button onClick={() => setMotsVisibles(m => !m)} style={{ background: "transparent", border: `1px solid ${v.accent}60`, borderRadius: 50, padding: "0.15rem 0.65rem", color: v.accent, cursor: "pointer", fontSize: "0.72rem", fontWeight: 600, fontFamily: "inherit" }}>
              {motsVisibles ? "🙈 Masquer" : "👁 Afficher"}
            </button>
          </div>
          {motsVisibles && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {trous.mots.map((mot, i) => {
                const dejaPose = Object.values(reponses).some(r => r.toLowerCase().trim() === mot.toLowerCase());
                return (
                  <span key={i} style={{ padding: "0.2rem 0.7rem", borderRadius: 50, background: dejaPose ? "transparent" : v.cardBg, border: `1px solid ${dejaPose ? v.inputBorder : v.accent}`, color: dejaPose ? v.textMuted : v.accent, fontSize: "0.82rem", fontWeight: 600, textDecoration: dejaPose ? "line-through" : "none", opacity: dejaPose ? 0.4 : 1, transition: "all 0.2s" }}>
                    {mot}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Texte */}
      <div style={{ lineHeight: 2.2, fontSize: "0.92rem", color: v.text, marginBottom: "1rem" }}>
        {trous.segments.map((seg, i) => {
          if (seg.type === "text") return <span key={i}>{seg.content}</span>;
          const correct = reponses[seg.id]?.toLowerCase().trim() === seg.mot.toLowerCase();
          const rempli = reponses[seg.id] !== undefined && reponses[seg.id] !== "";
          let borderColor = v.inputBorder;
          let bgColor = v.inputBg;
          if (valide) { borderColor = correct ? "#27ae60" : "#c0392b"; bgColor = correct ? "rgba(39,174,96,0.12)" : "rgba(192,57,43,0.1)"; }
          else if (rempli) { borderColor = v.accent; bgColor = v.accentBg; }
          return (
            <span key={i} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", position: "relative" }}>
              <input
                disabled={valide}
                value={reponses[seg.id] || ""}
                onChange={e => setReponses({ ...reponses, [seg.id]: e.target.value })}
                style={{ width: Math.max(seg.mot.length * 10, 80) + "px", padding: "0.15rem 0.5rem", borderRadius: 8, border: `1.5px solid ${borderColor}`, background: bgColor, color: valide ? (correct ? "#27ae60" : "#c0392b") : v.text, fontSize: "0.9rem", fontFamily: "inherit", outline: "none", fontWeight: 600, textAlign: "center" }}
              />
              {valide && !correct && (
                <span style={{ fontSize: "0.65rem", color: "#27ae60", whiteSpace: "nowrap", fontWeight: 700, marginTop: "1px", lineHeight: 1 }}>✓ {seg.mot}</span>
              )}
            </span>
          );
        })}
      </div>

      {!valide ? (
        <Btn v={v} full onClick={() => { setValide(true); if (ajouterHistorique) ajouterHistorique({ type: "trous", matiere, date: new Date().toLocaleDateString("fr-FR") }); }}>{langue === "en" ? "✅ Check my answers" : langue === "es" ? "✅ Verificar mis respuestas" : "✅ Vérifier mes réponses"}</Btn>
      ) : (
        <div>
          <div style={{ textAlign: "center", background: v.cardBg, border: `1px solid ${v.cardBorder}`, borderRadius: 16, padding: "1rem", marginBottom: "0.8rem" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: pct >= 80 ? "#27ae60" : pct >= 50 ? "#d4a017" : "#c0392b" }}>{pct}%</div>
            <div style={{ color: v.textMuted, fontSize: "0.88rem" }}>{score} {score > 1 ? t.motsCorrects : t.motCorrect} {t.sur} {total}</div>
            <div style={{ marginTop: "0.3rem" }}>{pct >= 80 ? (langue === "en" ? "Excellent! 🏆" : langue === "es" ? "¡Excelente! 🏆" : "Excellent ! 🏆") : pct >= 50 ? (langue === "en" ? "Well done! 🌸" : langue === "es" ? "¡Bien hecho! 🌸" : "Bien joué ! 🌸") : (langue === "en" ? "Keep studying 💪" : langue === "es" ? "Sigue estudiando 💪" : "Continue à réviser 💪")}</div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Btn v={v} outline full onClick={generer}>{t.nouveauTrous}</Btn>
            <Btn v={v} outline full onClick={onClose}>✕ Fermer</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── POINTS FAIBLES (après quiz) ─────────────────────────────────────────────
function PointsFaibles({ questions, reponses, matiere, texteOriginal, v, t, onClose, langue }) {
  const [analyse, setAnalyse] = useState(null);
  const [questionsBonus, setQuestionsBonus] = useState([]);
  const [reponsesBonus, setReponsesBonus] = useState({});
  const [valideBonus, setValideBonus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { analyser(); }, []);

  const analyser = async () => {
    setLoading(true);
    const erreurs = questions.filter((q, i) => reponses[i] !== q.correct);
    if (erreurs.length === 0) {
      setAnalyse({ aucuneErreur: true });
      setLoading(false);
      return;
    }
    try {
      const listeErreurs = erreurs.map(q => `• ${q.question}\n  → Bonne réponse : ${q.options[q.correct]}\n  → Explication : ${q.explication}`).join("\n\n");
      const extraitCours = texteOriginal ? texteOriginal.slice(0, 2000) : "";
      const result = await callGroq(`Tu es un professeur bienveillant en ${matiere}. Un élève de collège a raté ces questions :

${listeErreurs}

${extraitCours ? `Extrait du cours original :\n${extraitCours}` : ""}

Génère une analyse et 3 questions de remédiation VARIÉES (mélange Vrai/Faux, compléter une phrase, QCM classique) basées exactement sur les notions que l'élève n'a pas comprises, en t'appuyant sur le cours.

Réponds UNIQUEMENT en JSON valide sans markdown :
{
  "points_faibles": ["notion précise non maîtrisée 1", "notion 2", "notion 3"],
  "conseil": "conseil motivant et concret en 1-2 phrases",
  "questions_bonus": [
    {"type":"Vrai ou Faux","question":"...","options":["A) Vrai","B) Faux","C) Plutôt vrai","D) Plutôt faux"],"correct":0,"explication":"..."},
    {"type":"Compléter","question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explication":"..."},
    {"type":"QCM","question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explication":"..."}
  ]
}`);
      const data = JSON.parse(result.replace(/```json|```/g, "").trim());
      setAnalyse(data);
      setQuestionsBonus(data.questions_bonus || []);
    } catch { setAnalyse({ erreur: true }); }
    setLoading(false);
  };

  if (loading) return <div style={{ textAlign: "center", padding: "2rem", color: v.textMuted }}>🔍 Analyse de tes erreurs...</div>;
  if (!analyse) return null;

  if (analyse.aucuneErreur) return (
    <div style={{ textAlign: "center", padding: "1.5rem" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
      <div style={{ fontWeight: 700, color: "#27ae60", marginBottom: "0.3rem" }}>{t.aucunPointFaible}</div>
      <div style={{ color: v.textMuted, fontSize: "0.88rem", marginBottom: "1rem" }}>Tu as tout bon, bravo !</div>
      <Btn v={v} outline onClick={onClose}>{t.fermer}</Btn>
    </div>
  );

  if (analyse.erreur) return (
    <div style={{ textAlign: "center", padding: "1.5rem" }}>
      <div style={{ color: v.textMuted }}>{t.erreur}</div>
      <Btn v={v} outline onClick={onClose} style={{ marginTop: "0.8rem" }}>Fermer</Btn>
    </div>
  );

  const scoreBonus = questionsBonus.filter((q, i) => reponsesBonus[i] === q.correct).length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ fontWeight: 700, color: "#c0392b", fontSize: "1rem" }}>{langue === "en" ? "🎯 Your weak points" : langue === "es" ? "🎯 Tus puntos débiles" : "🎯 Tes points faibles"} — {matiere}</div>
        <button onClick={onClose} style={{ background: "transparent", border: "none", color: v.textMuted, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
      </div>

      {/* Points faibles */}
      <div style={{ marginBottom: "1rem" }}>
        {analyse.points_faibles?.map((pt, i) => (
          <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", padding: "0.6rem 0.8rem", borderRadius: 12, background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.15)", marginBottom: "0.4rem" }}>
            <span style={{ color: "#c0392b", fontWeight: 700, flexShrink: 0 }}>✗</span>
            <span style={{ color: v.text, fontSize: "0.88rem" }}>{pt}</span>
          </div>
        ))}
      </div>

      {/* Conseil */}
      {analyse.conseil && (
        <div style={{ padding: "0.8rem 1rem", borderRadius: 12, background: "rgba(39,174,96,0.08)", border: "1px solid rgba(39,174,96,0.2)", marginBottom: "1.2rem" }}>
          <span style={{ fontSize: "0.88rem", color: v.text, fontStyle: "italic" }}>💡 {analyse.conseil}</span>
        </div>
      )}

      {/* Questions bonus */}
      {questionsBonus.length > 0 && (
        <div>
          <div style={{ fontWeight: 700, color: v.accent, marginBottom: "0.8rem", fontSize: "0.92rem" }}>{langue === "en" ? "🔁 3 targeted questions on your gaps" : langue === "es" ? "🔁 3 preguntas sobre tus lagunas" : "🔁 3 questions ciblées sur tes lacunes"}</div>
          {questionsBonus.map((q, i) => (
            <div key={i} style={{ background: v.cardBg, border: `1px solid ${v.cardBorder}`, borderRadius: 14, padding: "0.9rem", marginBottom: "0.7rem" }}>
              {q.type && (
                <div style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: 50, marginBottom: "0.4rem", background: "rgba(192,57,43,0.08)", color: "#c0392b", border: "1px solid rgba(192,57,43,0.2)" }}>
                  {q.type.includes("Vrai") ? "✓✗ Vrai ou Faux" : q.type.includes("Compléter") ? "✏️ Compléter" : q.type.includes("intrus") ? "🔍 Intrus" : "❓ QCM"}
                </div>
              )}
              <div style={{ fontWeight: 600, color: v.text, fontSize: "0.9rem", marginBottom: "0.6rem" }}>Q{i+1}. {q.question}</div>
              {q.options.map((opt, j) => {
                let bg = v.inputBg, border = `1px solid ${v.inputBorder}`, color = v.text;
                if (valideBonus) {
                  if (j === q.correct) { bg = "rgba(39,174,96,0.15)"; border = "1px solid #27ae60"; color = "#1a7a40"; }
                  else if (reponsesBonus[i] === j) { bg = "rgba(192,57,43,0.12)"; border = "1px solid #c0392b"; color = "#c0392b"; }
                } else if (reponsesBonus[i] === j) { bg = v.accentBg; border = `1px solid ${v.accent}`; }
                return <button key={j} onClick={() => !valideBonus && setReponsesBonus({ ...reponsesBonus, [i]: j })} style={{ display: "block", width: "100%", padding: "0.5rem 0.9rem", borderRadius: 50, border, background: bg, color, textAlign: "left", cursor: valideBonus ? "default" : "pointer", marginBottom: "0.3rem", fontSize: "0.85rem", fontFamily: "inherit" }}>{opt}</button>;
              })}
              {valideBonus && <div style={{ marginTop: "0.5rem", color: v.textMuted, fontSize: "0.8rem", fontStyle: "italic" }}>💡 {q.explication}</div>}
            </div>
          ))}
          {!valideBonus ? (
            <Btn v={v} full onClick={() => setValideBonus(true)} disabled={Object.keys(reponsesBonus).length < questionsBonus.length}>{t.validerBtn}</Btn>
          ) : (
            <div style={{ textAlign: "center", padding: "0.8rem", background: v.cardBg, borderRadius: 14, border: `1px solid ${v.cardBorder}` }}>
              <span style={{ fontWeight: 700, fontSize: "1.3rem", color: scoreBonus === questionsBonus.length ? "#27ae60" : "#d4a017" }}>{scoreBonus}/{questionsBonus.length}</span>
              <span style={{ color: v.textMuted, fontSize: "0.85rem", marginLeft: "0.5rem" }}>{scoreBonus === questionsBonus.length ? t.parfait : t.continueBtn}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── BADGE CARD ───────────────────────────────────────────────────────────────
function BadgeCard({ badge, debloque, langue }) {
  const lang = langue || "fr";
  const tr = BADGES_TRADUCTIONS[badge.id]?.[lang] || [badge.nom, badge.description];
  return (
    <div style={{ borderRadius: 18, padding: "1rem 0.8rem", textAlign: "center", position: "relative", overflow: "hidden", background: debloque ? `linear-gradient(135deg, ${badge.gradient[0]}, ${badge.gradient[1]})` : "rgba(150,150,150,0.1)", border: debloque ? "none" : "1px solid rgba(150,150,150,0.2)", boxShadow: debloque ? `0 4px 20px ${badge.gradient[0]}55` : "none", filter: debloque ? "none" : "grayscale(1)", opacity: debloque ? 1 : 0.45 }}>
      {debloque && <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 56, height: 56, borderRadius: "50%", background: debloque ? "rgba(255,255,255,0.2)" : "rgba(150,150,150,0.15)", margin: "0 auto 0.6rem" }}>{badge.icon}</div>
      <div style={{ fontWeight: 700, fontSize: "0.82rem", color: debloque ? "white" : "#aaa", marginBottom: "0.25rem", lineHeight: 1.2 }}>{tr[0]}</div>
      <div style={{ fontSize: "0.7rem", color: debloque ? "rgba(255,255,255,0.85)" : "#bbb", lineHeight: 1.3 }}>{tr[1]}</div>
      {debloque && <div style={{ marginTop: "0.5rem", fontSize: "0.65rem", background: "rgba(255,255,255,0.25)", borderRadius: 50, padding: "0.15rem 0.5rem", display: "inline-block", color: "white", fontWeight: 600 }}>{langue === "en" ? "UNLOCKED ✓" : langue === "es" ? "DESBLOQUEADO ✓" : "DÉBLOQUÉ ✓"}</div>}
    </div>
  );
}

function StatBox({ label, value, color, v }) {
  return (
    <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 14, padding: "0.9rem", textAlign: "center" }}>
      <div style={{ fontSize: "1.6rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.75rem", color: v.textMuted, marginTop: "0.3rem" }}>{label}</div>
    </div>
  );
}

// ─── PROFIL ───────────────────────────────────────────────────────────────────
// ─── CROP MODAL ───────────────────────────────────────────────────────────────
function CropModal({ src, onConfirm, onCancel, v }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(0.1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const SIZE = 280; // aperçu carré

  // Calcule le scale minimum pour que l'image couvre toujours le cercle
  const handleImgLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const sc = Math.max(SIZE / img.naturalWidth, SIZE / img.naturalHeight);
    setMinScale(sc);
    setScale(sc);
    setOffset({ x: 0, y: 0 });
  };

  const clampOffset = (ox, oy, sc, imgW, imgH) => {
    const displayW = imgW * sc;
    const displayH = imgH * sc;
    const maxX = Math.max(0, (displayW - SIZE) / 2);
    const maxY = Math.max(0, (displayH - SIZE) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, ox)), y: Math.max(-maxY, Math.min(maxY, oy)) };
  };

  const getImg = () => imgRef.current;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const handleMouseMove = (e) => {
    if (!dragging || !getImg()) return;
    const img = getImg();
    const newOffset = clampOffset(e.clientX - dragStart.x, e.clientY - dragStart.y, scale, img.naturalWidth, img.naturalHeight);
    setOffset(newOffset);
  };
  const handleMouseUp = () => setDragging(false);

  // Touch support
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ x: t.clientX - offset.x, y: t.clientY - offset.y });
  };
  const handleTouchMove = (e) => {
    if (!dragging || !getImg()) return;
    const t = e.touches[0];
    const img = getImg();
    const newOffset = clampOffset(t.clientX - dragStart.x, t.clientY - dragStart.y, scale, img.naturalWidth, img.naturalHeight);
    setOffset(newOffset);
  };

  const handleScale = (e) => {
    const newScale = parseFloat(e.target.value);
    if (!getImg()) return;
    const img = getImg();
    const clamped = clampOffset(offset.x, offset.y, newScale, img.naturalWidth, img.naturalHeight);
    setScale(newScale);
    setOffset(clamped);
  };

  const handleConfirm = () => {
    const img = getImg();
    if (!img) return;
    const canvas = document.createElement("canvas");
    const OUT = 300;
    canvas.width = OUT; canvas.height = OUT;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(OUT/2, OUT/2, OUT/2, 0, Math.PI*2);
    ctx.clip();
    const displayW = img.naturalWidth * scale;
    const displayH = img.naturalHeight * scale;
    const drawX = (SIZE/2 + offset.x - displayW/2) / SIZE * OUT;
    const drawY = (SIZE/2 + offset.y - displayH/2) / SIZE * OUT;
    const drawW = displayW / SIZE * OUT;
    const drawH = displayH / SIZE * OUT;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    onConfirm(canvas.toDataURL("image/jpeg", 0.92));
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: v.navBg, borderRadius: 24, padding: "1.5rem", maxWidth: 360, width: "100%", backdropFilter: "blur(20px)", border: `1px solid ${v.cardBorder}` }}>
        <div style={{ fontWeight: 700, color: v.accent, fontSize: "1rem", marginBottom: "0.4rem", textAlign: "center" }}>✂️ Recadrer la photo</div>
        <div style={{ fontSize: "0.78rem", color: v.textMuted, textAlign: "center", marginBottom: "1rem" }}>Glisse pour déplacer · Zoom avec le curseur</div>

        {/* Zone de prévisualisation */}
        <div ref={containerRef}
          style={{ width: SIZE, height: SIZE, borderRadius: "50%", overflow: "hidden", margin: "0 auto 1rem", cursor: dragging ? "grabbing" : "grab", border: `3px solid ${v.accent}`, position: "relative", userSelect: "none", boxShadow: `0 0 0 9999px rgba(0,0,0,0.45)` }}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleMouseUp}
        >
          <img ref={imgRef} src={src} alt="crop" onLoad={handleImgLoad}
            style={{ position: "absolute", width: "auto", height: "auto",
              transform: `translate(-50%, -50%) scale(${scale})`,
              top: `calc(50% + ${offset.y}px)`, left: `calc(50% + ${offset.x}px)`,
              maxWidth: "none", pointerEvents: "none", transformOrigin: "center center"
            }}
            draggable={false}
          />
        </div>

        {/* Slider zoom */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}>
          <span style={{ fontSize: "0.9rem" }}>🔍</span>
          <input type="range" min={minScale} max={minScale * 4} step="0.001" value={scale} onChange={handleScale}
            style={{ flex: 1, accentColor: v.accent }} />
          <span style={{ fontSize: "0.75rem", color: v.textMuted, minWidth: 38 }}>×{(scale/minScale).toFixed(1)}</span>
        </div>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "0.7rem", borderRadius: 50, border: `1px solid ${v.inputBorder}`, background: "transparent", color: v.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }}>{t.annuler}</button>
          <button onClick={handleConfirm} style={{ flex: 1, padding: "0.7rem", borderRadius: 50, border: "none", background: v.btnActive, color: v.btnActiveTxt, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", fontWeight: 700 }}>{t.validerPhoto}</button>
        </div>
      </div>
    </div>
  );
}

function Profil({ nom, setNom, prenom, setPrenom, photo, setPhoto, historique, examens, v, langue, t, streakActuel, xpActuel, xpRequis, niveau, isPremium, onPremium }) {
  const [nomTemp, setNomTemp] = useState(nom);
  const [prenomTemp, setPrenomTemp] = useState(prenom);
  const [cropSrc, setCropSrc] = useState(null);
  const nbQuiz = historique.filter(h => h.type === "quiz").length;
  const nbResumes = historique.filter(h => h.type === "resume").length;
  const nbExamens = examens.filter(e => e.date).length;
  const moy = (() => {
    const quiz = historique.filter(h => h.type === "quiz");
    if (quiz.length === 0) return null;
    return Math.round((quiz.reduce((a, q) => a + (q.score / (q.questions?.length || 5)), 0) / quiz.length) * 100);
  })();
  const handlePhoto = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCropSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const initiales = `${(prenomTemp || "?")[0]}${(nomTemp || "")[0] || ""}`.toUpperCase();
  const badgesDebloques = BADGES_DEF.filter(b => b.condition(historique));

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Modal recadrage */}
      {cropSrc && (
        <CropModal
          src={cropSrc}
          v={v}
          onConfirm={(dataUrl) => { setPhoto(dataUrl); setCropSrc(null); }}
          onCancel={() => setCropSrc(null)}
        />
      )}

      {/* Avatar */}
      <Card v={v} style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", border: `3px solid ${v.accent}`, background: v.accentBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
            {photo ? <img src={photo} alt="profil" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "2rem", fontWeight: 700, color: v.accent }}>{initiales}</span>}
          </div>
          <label style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: v.btnActive, border: `2px solid ${v.bg}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.8rem" }}>
            📷<input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
          </label>
        </div>
        {(prenom || nom) && <div style={{ fontWeight: 700, fontSize: "1.3rem", color: v.text }}>{prenom} {nom}</div>}
        <div style={{ fontSize: "0.8rem", color: v.textMuted, marginTop: "0.2rem" }}>{langue === "en" ? "Click 📷 to change your photo" : langue === "es" ? "Haz clic en 📷 para cambiar tu foto" : "Clique sur 📷 pour changer ta photo"}</div>
      </Card>

      {/* Badge premium */}
      {isPremium ? (
        <div style={{ textAlign: "center", padding: "0.6rem", marginBottom: "0.5rem" }}>
          <span style={{ background: "linear-gradient(135deg,#f6d365,#fda085)", borderRadius: 50, padding: "0.4rem 1.2rem", fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>⭐ Premium</span>
        </div>
      ) : (
        <button type="button" onClick={onPremium} style={{ width: "100%", marginBottom: "0.5rem", background: "linear-gradient(135deg,#f6d365,#fda085)", border: "none", borderRadius: 50, padding: "0.7rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>
          ⭐ {langue === "en" ? "Upgrade to Premium" : langue === "es" ? "Obtener Premium" : "Passer en Premium"}
        </button>
      )}

      {/* Modifier profil */}
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "1rem" }}>{langue === "en" ? "👤 Edit my profile" : langue === "es" ? "👤 Editar mi perfil" : "👤 Modifier mon profil"}</div>
        <div style={{ marginBottom: "0.6rem" }}>
          <div style={{ fontSize: "0.82rem", color: v.textMuted, marginBottom: "0.3rem" }}>{t.prenom}</div>
          <InputStyle v={v} value={prenomTemp} onChange={e => setPrenomTemp(e.target.value)} placeholder="Ex: Julia" />
        </div>
        <div style={{ marginBottom: "0.8rem" }}>
          <div style={{ fontSize: "0.82rem", color: v.textMuted, marginBottom: "0.3rem" }}>{t.nom}</div>
          <InputStyle v={v} value={nomTemp} onChange={e => setNomTemp(e.target.value)} placeholder="Ex: Olivin" />
        </div>
        <Btn v={v} full onClick={() => { setNom(nomTemp); setPrenom(prenomTemp); }}>{t.sauvegarderProfil}</Btn>
      </Card>

      {/* Stats */}
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "1rem" }}>{langue === "en" ? "📊 My stats" : langue === "es" ? "📊 Mis estadísticas" : "📊 Mes statistiques"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginBottom: "1rem" }}>
          <StatBox label={t.quizRealises} value={nbQuiz} color="#8e44ad" v={v} />
          <StatBox label={"🔥 Streak"} value={streakActuel > 0 ? `${streakActuel} ${streakActuel > 1 ? t.streakJours : t.streakJour}` : `0 ${t.streakJour}`} color="#e67e22" v={v} />
          <StatBox label={`⭐ ${t.niveauLabel}`} value={`${t.niveauLabel} ${niveau}`} color="#f39c12" v={v} />
          <StatBox label={t.resumesCrees} value={nbResumes} color="#2e86ab" v={v} />
          <StatBox label={t.examensPrevus} value={nbExamens} color="#d4a017" v={v} />
          {moy !== null && <StatBox label={t.scoreMoyen} value={`${moy}%`} color="#27ae60" v={v} />}
        </div>
        {streakActuel > 0 && (
          <div style={{ textAlign: "center", padding: "0.7rem 1rem", borderRadius: 12, background: "rgba(230,126,34,0.12)", border: "1px solid rgba(230,126,34,0.3)", marginBottom: "0.8rem", fontSize: "0.88rem", color: "#e67e22", fontWeight: 600 }}>
            {streakActuel >= 7 ? t.streakMsg7.replace("{n}", streakActuel) :
             streakActuel >= 3 ? t.streakMsg3.replace("{n}", streakActuel) :
             streakActuel >= 2 ? t.streakMsg2.replace("{n}", streakActuel) :
             t.streakMsg1}
          </div>
        )}
        {streakActuel === 0 && <div style={{ textAlign: "center", padding: "0.5rem", fontSize: "0.82rem", color: "#e67e22", marginBottom: "0.5rem" }}>{t.streakZero}</div>}
        {/* XP Bar */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: v.textMuted, marginBottom: "0.3rem" }}>
            <span>⭐ {t.niveauLabel} {niveau}</span>
            <span>{xpActuel}{t.xpLabel}/{xpRequis}{t.xpLabel}</span>
          </div>
          <div style={{ height: 10, borderRadius: 99, background: v.inputBorder, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.round(xpActuel / xpRequis * 100)}%`, background: "linear-gradient(90deg, #f6d365, #fda085)", borderRadius: 99, transition: "width 0.6s ease" }} />
          </div>
        </div>
        {nbQuiz >= 2 && (
          isPremium ? (
            <>
              <div style={{ fontWeight: 600, color: v.text, fontSize: "0.88rem", marginBottom: "0.8rem" }}>📈 Évolution de tes scores</div>
              <GraphiqueScores historique={historique} v={v} langue={langue} />
            </>
          ) : (
            <div onClick={onPremium} style={{ cursor: "pointer", textAlign: "center", padding: "1.2rem", borderRadius: 16, background: "rgba(246,211,101,0.1)", border: "2px dashed #f6d365", color: "#e67e22", fontSize: "0.88rem" }}>
              🔒 {langue === "en" ? "Score graph — Premium only" : langue === "es" ? "Gráfico de puntuaciones — Solo Premium" : "Graphique des scores — Premium uniquement"} <br/><span style={{ fontSize: "0.78rem", opacity: 0.8 }}>👆 {langue === "en" ? "Tap to upgrade" : langue === "es" ? "Toca para mejorar" : "Appuie pour activer"}</span>
            </div>
          )
        )}
        {nbQuiz === 0 && nbResumes === 0 && <div style={{ textAlign: "center", color: v.textMuted, fontSize: "0.85rem" }}>{langue === "en" ? "Do your first quiz or summary to see your stats! 🌿" : langue === "es" ? "Haz tu primer quiz o resumen para ver tus estadísticas! 🌿" : "Fais ton premier quiz ou résumé pour voir tes stats ! 🌿"}</div>}
      </Card>

      {/* Prédiction de notes */}
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "0.4rem" }}>{langue === "en" ? "🎯 Grade predictions" : langue === "es" ? "🎯 Predicción de notas" : "🎯 Prédiction de notes"}</div>
        <div style={{ fontSize: "0.78rem", color: v.textMuted, marginBottom: "1rem" }}>{langue === "en" ? "Estimated from your quizzes, by subject" : langue === "es" ? "Estimado a partir de tus quizzes" : "Estimée d'après tes quiz, par matière"}</div>
        <PredictionNotes historique={historique} v={v} langue={langue} />
      </Card>

      {/* Badges */}
      <Card v={v}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ fontWeight: 700, color: v.accent }}>{langue === "en" ? "🏅 My badges" : langue === "es" ? "🏅 Mis insignias" : "🏅 Mes badges"}</div>
          <div style={{ fontSize: "0.8rem", color: v.textMuted }}>{badgesDebloques.length}/{BADGES_DEF.length} {langue === "en" ? "unlocked" : langue === "es" ? "desbloqueadas" : "débloqués"}</div>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: v.inputBorder, marginBottom: "1.2rem", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #f6d365, #fda085)", width: `${(badgesDebloques.length / BADGES_DEF.length) * 100}%`, transition: "width 0.5s" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.7rem" }}>
          {BADGES_DEF.map(badge => <BadgeCard key={badge.id} badge={badge} debloque={badgesDebloques.some(b => b.id === badge.id)} langue={langue} />)}
        </div>
      </Card>
    </div>
  );
}

// ─── PLANNING ─────────────────────────────────────────────────────────────────
function Planning({ t, v, examens, setExamens, genere, setGenere, moisActuel, setMoisActuel, matieres }) {
  const isMobile = useIsMobile();
  const addExamen = () => setExamens([...examens, { matiere: "Français", date: "", nom: "" }]);
  const removeExamen = (i) => setExamens(examens.filter((_, idx) => idx !== i));
  const updateExamen = (i, field, value) => { const u = [...examens]; u[i][field] = value; setExamens(u); };
  // Helper : formate une date en YYYY-MM-DD en heure locale (évite le décalage UTC)
  const dateKey = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const j = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${j}`;
  };

  const toutesLesSessions = {};
  if (genere) {
    examens.filter(e => e.date).forEach(exam => {
      const examDate = new Date(exam.date + "T12:00:00");
      const today = new Date(); today.setHours(0,0,0,0);
      const daysLeft = Math.round((examDate - today) / (1000*60*60*24));

      // Sessions AVANT l'exam
      let sessions = [];
      if (daysLeft > 8) {
        sessions = [{joursAvant:20,type:"📖"},{joursAvant:15,type:"📖"},{joursAvant:10,type:"✏️"},{joursAvant:7,type:"✏️"},{joursAvant:4,type:"🔁"},{joursAvant:2,type:"📝"},{joursAvant:1,type:"🔥"}];
      } else {
        for (let i = daysLeft; i >= 1; i--) sessions.push({ joursAvant: i, type: i > Math.floor(daysLeft*0.6) ? "📖" : i > Math.floor(daysLeft*0.3) ? "✏️" : "📝" });
      }
      sessions.forEach(({ joursAvant, type }) => {
        const d = new Date(examDate); d.setDate(d.getDate() - joursAvant);
        const key = dateKey(d);
        if (!toutesLesSessions[key]) toutesLesSessions[key] = [];
        toutesLesSessions[key].push({ matiere: exam.matiere, type });
      });

      // Jour de l'exam
      const examKey = dateKey(examDate);
      if (!toutesLesSessions[examKey]) toutesLesSessions[examKey] = [];
      toutesLesSessions[examKey].push({ matiere: exam.matiere, nom: exam.nom || "", type: "🎯", isExam: true });

      // Répétition espacée APRÈS l'exam : J+2, J+4, J+7, J+12
      [{joursApres:2,type:"🔁"},{joursApres:4,type:"🔁"},{joursApres:7,type:"📖"},{joursApres:12,type:"📖"}].forEach(({ joursApres, type }) => {
        const d = new Date(examDate); d.setDate(d.getDate() + joursApres);
        const key = dateKey(d);
        if (!toutesLesSessions[key]) toutesLesSessions[key] = [];
        toutesLesSessions[key].push({ matiere: exam.matiere, type, isRepet: true });
      });
    });
  }
  const annee = moisActuel.getFullYear(), mois = moisActuel.getMonth();
  const premierJour = new Date(annee, mois, 1);
  const dernierJour = new Date(annee, mois+1, 0);
  const debutCalendrier = new Date(premierJour);
  debutCalendrier.setDate(1 - (premierJour.getDay() === 0 ? 6 : premierJour.getDay() - 1));
  const jours = []; const cursor = new Date(debutCalendrier);
  while (cursor <= dernierJour || jours.length % 7 !== 0) { jours.push(new Date(cursor)); cursor.setDate(cursor.getDate()+1); if (jours.length > 42) break; }
  const nomsMois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const today = new Date(); today.setHours(0,0,0,0);
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "1rem" }}>🌸 {t.examens}</div>
        {examens.map((exam, i) => (
          <div key={i} style={{ marginBottom: "0.8rem", border: `1px solid ${v.cardBorder}`, borderRadius: 16, padding: "0.7rem", background: v.cardBg }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
              <SelectStyle v={v} value={exam.matiere} onChange={e => updateExamen(i,"matiere",e.target.value)} style={{ flex: "0 0 130px", minWidth: 0 }}>{matieres.map(m => <option key={m} value={m}>{m}</option>)}</SelectStyle>
              {examens.length > 1 && <button onClick={() => removeExamen(i)} style={{ background: "rgba(180,80,80,0.1)", border: "1px solid rgba(180,80,80,0.3)", borderRadius: "50%", color: "#c0392b", width: 32, height: 32, cursor: "pointer", flexShrink: 0, fontSize: "0.8rem" }}>✕</button>}
            </div>
            <InputStyle v={v} value={exam.nom || ""} onChange={e => updateExamen(i,"nom",e.target.value)} placeholder="Nom (ex: Contrôle ch.3)" style={{ marginBottom: "0.5rem" }} />
            <InputStyle v={v} type="date" value={exam.date} onChange={e => updateExamen(i,"date",e.target.value)} style={{ colorScheme: "light" }} />
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "0.5rem", marginTop: "0.8rem" }}>
          <Btn v={v} outline onClick={addExamen} full={isMobile}>{t.ajouterExamen}</Btn>
          <Btn v={v} onClick={() => setGenere(true)} full={isMobile}>✨ {t.genererPlanning}</Btn>
        </div>
      </Card>
      {genere && (
        <Card v={v} style={{ padding: isMobile ? "0.8rem" : "1.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <Btn v={v} outline small onClick={() => { const d = new Date(moisActuel); d.setMonth(d.getMonth()-1); setMoisActuel(d); }}>←</Btn>
            <div style={{ fontWeight: 700, fontSize: isMobile ? "1rem" : "1.1rem", color: v.text }}>{nomsMois[mois]} {annee}</div>
            <Btn v={v} outline small onClick={() => { const d = new Date(moisActuel); d.setMonth(d.getMonth()+1); setMoisActuel(d); }}>→</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: isMobile ? "2px" : "0.3rem", marginBottom: "0.3rem" }}>
            {["L","M","M","J","V","S","D"].map((j,i) => <div key={i} style={{ textAlign: "center", fontSize: isMobile ? "0.7rem" : "0.78rem", fontWeight: 600, color: v.accent, padding: "0.2rem" }}>{j}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: isMobile ? "2px" : "0.3rem" }}>
            {jours.map((jour, i) => {
              const key = dateKey(jour);
              const sessions = toutesLesSessions[key] || [];
              const estMoisActuel = jour.getMonth() === mois;
              const estAujourdhui = jour.getTime() === today.getTime();
              return (
                <div key={i} style={{ minHeight: isMobile ? 38 : 70, borderRadius: isMobile ? 6 : 12, padding: isMobile ? "2px" : "0.35rem", background: estAujourdhui ? v.accentBg : v.cardBg, border: `1px solid ${estAujourdhui ? v.accent : v.cardBorder}`, opacity: estMoisActuel ? 1 : 0.35, overflow: "hidden" }}>
                  <div style={{ fontSize: isMobile ? "0.65rem" : "0.78rem", fontWeight: estAujourdhui ? 700 : 400, color: estAujourdhui ? v.accent : v.text }}>{jour.getDate()}</div>
                  {sessions.map((session, j) => (
                    <div key={j} style={{ fontSize: isMobile ? "0.55rem" : "0.6rem", padding: isMobile ? "1px 2px" : "0.1rem 0.25rem", borderRadius: 4, marginTop: "1px", background: session.isExam ? "rgba(212,160,23,0.2)" : session.isRepet ? `${COULEURS[session.matiere]}10` : `${COULEURS[session.matiere]}20`, border: `1px solid ${session.isExam ? "#d4a017" : COULEURS[session.matiere]}${session.isRepet ? "40" : "60"}`, borderStyle: session.isRepet ? "dashed" : "solid", color: session.isExam ? "#b8860b" : COULEURS[session.matiere], fontWeight: session.isRepet ? 400 : 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", opacity: session.isRepet ? 0.85 : 1 }}>
                      {isMobile ? session.type : session.isRepet ? `${session.matiere} 🔁` : session.nom ? `${session.matiere} · ${session.nom} ${session.type}` : `${session.matiere} ${session.type}`}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.8rem" }}>
            {examens.filter(e => e.date).map((exam, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: v.textMuted, background: v.cardBg, padding: "0.25rem 0.7rem", borderRadius: 50, border: `1px solid ${v.cardBorder}` }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: COULEURS[exam.matiere] }} />
                {exam.matiere}{exam.nom ? ` · ${exam.nom}` : ""} — {exam.date}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.6rem" }}>
            {[["🎯 Exam", "solid"], ["📖✏️📝🔥 Révision", "solid"], ["🔁 Répétition espacée", "dashed"]].map(([label, style]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: v.textMuted }}>
                <div style={{ width: 18, height: 7, borderRadius: 3, border: `1.5px ${style} ${v.accent}60`, background: `${v.accent}15` }} />
                {label}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── RÉSUMÉ ───────────────────────────────────────────────────────────────────

// ============ COMPOSANTS JEUX ============

function JeuCalculMental({ v, t, langue, onClose }) {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [reponse, setReponse] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [termine, setTermine] = useState(false);
  const [nb, setNb] = useState(0);
  const MAX = 10;

  const genererQuestion = () => {
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b;
    if (op === "+") { a = Math.floor(Math.random()*50)+1; b = Math.floor(Math.random()*50)+1; }
    else if (op === "-") { a = Math.floor(Math.random()*50)+20; b = Math.floor(Math.random()*a)+1; }
    else { a = Math.floor(Math.random()*12)+2; b = Math.floor(Math.random()*12)+2; }
    const rep = op === "+" ? a+b : op === "-" ? a-b : a*b;
    setQuestion({ texte: `${a} ${op} ${b} = ?`, reponse: rep });
    setReponse(""); setFeedback(null);
  };

  useEffect(() => { genererQuestion(); }, []);

  const valider = () => {
    if (!question || reponse === "") return;
    const correct = parseInt(reponse) === question.reponse;
    setFeedback(correct ? "✅" : `❌ ${question.reponse}`);
    if (correct) setScore(s => s+1);
    setNb(n => n+1);
    setTimeout(() => {
      if (nb+1 >= MAX) setTermine(true);
      else genererQuestion();
    }, 900);
  };

  if (termine) return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{score >= 8 ? "🏆" : score >= 5 ? "👍" : "💪"}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: v.accent }}>{score}/{MAX}</div>
      <div style={{ color: v.textMuted, marginBottom: "1.5rem" }}>{langue === "en" ? "Good job!" : langue === "es" ? "¡Bien hecho!" : "Bien joué !"}</div>
      <button onClick={() => { setScore(0); setNb(0); setTermine(false); genererQuestion(); }} style={{ background: v.btnActive, color: "#fff", border: "none", borderRadius: 50, padding: "0.6rem 1.5rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{langue === "en" ? "Retry" : langue === "es" ? "Reintentar" : "Rejouer"}</button>
    </div>
  );

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <div style={{ fontSize: "0.82rem", color: v.textMuted, marginBottom: "0.5rem" }}>{nb+1}/{MAX} — Score: {score}</div>
      <div style={{ fontSize: "2rem", fontWeight: 800, color: v.text, marginBottom: "1.2rem" }}>{question?.texte}</div>
      {feedback && <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{feedback}</div>}
      <input
        type="number" value={reponse} onChange={e => setReponse(e.target.value)}
        onKeyDown={e => e.key === "Enter" && valider()}
        placeholder="?" autoFocus
        style={{ width: 100, textAlign: "center", fontSize: "1.4rem", padding: "0.5rem", borderRadius: 12, border: `2px solid ${v.accent}`, background: v.inputBg, color: v.text, fontFamily: "inherit", outline: "none" }}
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={valider} style={{ background: v.btnActive, color: "#fff", border: "none", borderRadius: 50, padding: "0.6rem 1.5rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{langue === "en" ? "Validate" : langue === "es" ? "Validar" : "Valider"}</button>
      </div>
    </div>
  );
}

function JeuCapitales({ v, t, langue, onClose }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random()*CAPITALES.length));
  const [reponse, setReponse] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [nb, setNb] = useState(0);
  const MAX = 10;
  const [termine, setTermine] = useState(false);

  const suivant = () => {
    setIdx(Math.floor(Math.random()*CAPITALES.length));
    setReponse(""); setFeedback(null);
  };

  const valider = () => {
    if (!reponse.trim()) return;
    const correct = normaliserReponse(reponse) === normaliserReponse(CAPITALES[idx][1]);
    setFeedback(correct ? "✅" : `❌ ${CAPITALES[idx][1]}`);
    if (correct) setScore(s => s+1);
    setNb(n => n+1);
    setTimeout(() => {
      if (nb+1 >= MAX) setTermine(true);
      else suivant();
    }, 1000);
  };

  if (termine) return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{score >= 8 ? "🌍" : score >= 5 ? "👍" : "💪"}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: v.accent }}>{score}/{MAX}</div>
      <div style={{ color: v.textMuted, marginBottom: "1.5rem" }}>{langue === "en" ? "Good job!" : langue === "es" ? "¡Bien hecho!" : "Bien joué !"}</div>
      <button onClick={() => { setScore(0); setNb(0); setTermine(false); suivant(); }} style={{ background: v.btnActive, color: "#fff", border: "none", borderRadius: 50, padding: "0.6rem 1.5rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{langue === "en" ? "Retry" : langue === "es" ? "Reintentar" : "Rejouer"}</button>
    </div>
  );

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <div style={{ fontSize: "0.82rem", color: v.textMuted, marginBottom: "0.5rem" }}>{nb+1}/{MAX} — Score: {score}</div>
      <div style={{ fontSize: "1.1rem", color: v.textMuted, marginBottom: "0.3rem" }}>{langue === "en" ? "Capital of" : langue === "es" ? "Capital de" : "Capitale de"}</div>
      <div style={{ fontSize: "2rem", fontWeight: 800, color: v.text, marginBottom: "1.2rem" }}>🌍 {CAPITALES[idx][0]}</div>
      {feedback && <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{feedback}</div>}
      <input
        value={reponse} onChange={e => setReponse(e.target.value)}
        onKeyDown={e => e.key === "Enter" && valider()}
        placeholder={langue === "en" ? "Your answer..." : langue === "es" ? "Tu respuesta..." : "Ta réponse..."}
        autoFocus
        style={{ width: "80%", textAlign: "center", fontSize: "1.1rem", padding: "0.5rem", borderRadius: 12, border: `2px solid ${v.accent}`, background: v.inputBg, color: v.text, fontFamily: "inherit", outline: "none" }}
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={valider} style={{ background: v.btnActive, color: "#fff", border: "none", borderRadius: 50, padding: "0.6rem 1.5rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{langue === "en" ? "Validate" : langue === "es" ? "Validar" : "Valider"}</button>
      </div>
    </div>
  );
}

function JeuFlashcards({ v, langue, onClose, type }) {
  const langues = Object.keys(FLASHCARDS[langue] || FLASHCARDS["fr"]);
  const [langCible, setLangCible] = useState(langues[0]);
  const data = type === "phrases" ? (PHRASES_QUOTIDIEN[langue]?.[langCible] || PHRASES_QUOTIDIEN["fr"][langCible] || []) : (FLASHCARDS[langue]?.[langCible] || FLASHCARDS["fr"][langCible] || []);
  const [idx, setIdx] = useState(0);
  const [retourne, setRetourne] = useState(false);
  const [sus, setSus] = useState(0);
  const [pas, setPas] = useState(0);

  const langNoms = { fr: "Français", en: "English", es: "Español", de: "Deutsch" };

  const suivant = (ok) => {
    if (ok) setSus(s => s+1); else setPas(p => p+1);
    setRetourne(false);
    setTimeout(() => setIdx(i => (i+1) % data.length), 150);
  };

  if (!data.length) return <div style={{ textAlign: "center", color: v.textMuted, padding: "2rem" }}>Pas de données disponibles</div>;

  return (
    <div style={{ textAlign: "center", padding: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {langues.map(l => (
          <button key={l} onClick={() => { setLangCible(l); setIdx(0); setRetourne(false); }}
            style={{ padding: "0.3rem 0.8rem", borderRadius: 50, border: `1px solid ${langCible === l ? v.accent : v.inputBorder}`, background: langCible === l ? v.accentBg : "transparent", color: langCible === l ? v.accent : v.textMuted, cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}>
            {langNoms[l] || l}
          </button>
        ))}
      </div>
      <div style={{ fontSize: "0.8rem", color: v.textMuted, marginBottom: "0.8rem" }}>✅ {sus} / ❌ {pas}</div>
      <div
        onClick={() => setRetourne(r => !r)}
        style={{ cursor: "pointer", minHeight: 120, background: retourne ? v.accentBg : v.cardBg, border: `2px solid ${v.accent}`, borderRadius: 20, padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 600, color: retourne ? v.accent : v.text, transition: "all 0.3s", marginBottom: "1rem" }}>
        {retourne ? data[idx][1] : data[idx][0]}
      </div>
      <div style={{ fontSize: "0.78rem", color: v.textMuted, marginBottom: "1rem" }}>👆 {langue === "en" ? "Tap to reveal" : langue === "es" ? "Toca para revelar" : "Appuie pour retourner"}</div>
      {retourne && (
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center" }}>
          <button onClick={() => suivant(false)} style={{ background: "#e74c3c", color: "#fff", border: "none", borderRadius: 50, padding: "0.6rem 1.3rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>❌ {langue === "en" ? "Wrong" : langue === "es" ? "Mal" : "Raté"}</button>
          <button onClick={() => suivant(true)} style={{ background: "#27ae60", color: "#fff", border: "none", borderRadius: 50, padding: "0.6rem 1.3rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>✅ {langue === "en" ? "Got it" : langue === "es" ? "Lo sé" : "Je savais"}</button>
        </div>
      )}
    </div>
  );
}


function PremiumModal({ v, langue, onClose, onActivate }) {
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState(false);
  const CODE_SECRET = "MINDUP2024";
  const prix = langue === "en" ? "$3.29/mo" : langue === "es" ? "2,99€/mes" : "2,99€/mois";

  const tenter = () => {
    if (code.trim().toUpperCase() === CODE_SECRET) {
      onActivate();
      onClose();
    } else {
      setErreur(true);
      setTimeout(() => setErreur(false), 2000);
    }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: v.cardBg, borderRadius: 24, width: "100%", maxWidth: 400, boxShadow: "0 16px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⭐</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>Mindup Premium</div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", marginTop: "0.3rem" }}>{prix}</div>
        </div>
        <div style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            {["✅ Quiz & résumés illimités", "✅ Graphique d'évolution", "✅ Pomodoro", "✅ Espace pause 🎮", "✅ Badge premium"].map(f => (
              <div key={f} style={{ fontSize: "0.88rem", color: v.text, marginBottom: "0.4rem" }}>{f}</div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${v.cardBorder}`, paddingTop: "1rem" }}>
            <div style={{ fontSize: "0.82rem", color: v.textMuted, marginBottom: "0.5rem" }}>
              {langue === "en" ? "Have a code?" : langue === "es" ? "¿Tienes un código?" : "Tu as un code ?"}
            </div>
            <input
              value={code} onChange={e => setCode(e.target.value)}
              onKeyDown={e => e.key === "Enter" && tenter()}
              placeholder={langue === "en" ? "Enter your code" : langue === "es" ? "Introduce tu código" : "Entre ton code"}
              style={{ width: "100%", padding: "0.6rem 1rem", borderRadius: 12, border: `2px solid ${erreur ? "#e74c3c" : v.inputBorder}`, background: v.inputBg, color: v.text, fontFamily: "inherit", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }}
            />
            {erreur && <div style={{ color: "#e74c3c", fontSize: "0.8rem", marginTop: "0.3rem" }}>❌ Code invalide</div>}
            <button onClick={tenter} style={{ width: "100%", marginTop: "0.8rem", background: "linear-gradient(135deg, #f6d365, #fda085)", color: "#fff", border: "none", borderRadius: 50, padding: "0.7rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: "0.95rem" }}>
              {langue === "en" ? "Activate" : langue === "es" ? "Activar" : "Activer"}
            </button>
          </div>
          <button onClick={onClose} style={{ width: "100%", marginTop: "0.5rem", background: "transparent", border: "none", color: v.textMuted, cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem" }}>
            {langue === "en" ? "Maybe later" : langue === "es" ? "Quizás después" : "Plus tard"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EspacePause({ v, langue, onClose }) {
  const [jeu, setJeu] = useState(null);
  const jeux = [
    { id: "calcul", emoji: "🔢", label: langue === "en" ? "Mental math" : langue === "es" ? "Cálculo mental" : "Calcul mental" },
    { id: "capitales", emoji: "🌍", label: langue === "en" ? "World capitals" : langue === "es" ? "Capitales del mundo" : "Capitales du monde" },
    { id: "flashcards", emoji: "🃏", label: langue === "en" ? "Vocabulary" : langue === "es" ? "Vocabulario" : "Vocabulaire" },
    { id: "phrases", emoji: "💬", label: langue === "en" ? "Daily phrases" : langue === "es" ? "Frases cotidianas" : "Phrases du quotidien" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: v.cardBg, borderRadius: 24, width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 16px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ padding: "1.2rem 1.5rem", borderBottom: `1px solid ${v.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", color: v.accent }}>🎮 {langue === "en" ? "Pause zone" : langue === "es" ? "Zona pausa" : "Espace pause"}</div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: "1.3rem", cursor: "pointer", color: v.textMuted }}>✕</button>
        </div>
        <div style={{ padding: "1.2rem" }}>
          {!jeu ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {jeux.map(j => (
                <button key={j.id} onClick={() => setJeu(j.id)}
                  style={{ background: v.accentBg, border: `1px solid ${v.cardBorder}`, borderRadius: 16, padding: "1.2rem 0.8rem", cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>{j.emoji}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: v.text }}>{j.label}</div>
                </button>
              ))}
            </div>
          ) : (
            <>
              <button onClick={() => setJeu(null)} style={{ background: "transparent", border: "none", color: v.textMuted, cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", fontFamily: "inherit" }}>← {langue === "en" ? "Back" : langue === "es" ? "Volver" : "Retour"}</button>
              {jeu === "calcul" && <JeuCalculMental v={v} langue={langue} onClose={() => setJeu(null)} />}
              {jeu === "capitales" && <JeuCapitales v={v} langue={langue} onClose={() => setJeu(null)} />}
              {jeu === "flashcards" && <JeuFlashcards v={v} langue={langue} onClose={() => setJeu(null)} type="flashcards" />}
              {jeu === "phrases" && <JeuFlashcards v={v} langue={langue} onClose={() => setJeu(null)} type="phrases" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================

function Resume({ t, v, ajouterHistorique, matieres, langue, peutGenerer, isPremium, usageAujourdhui, limiteJour, onPremium }) {
  const [texte, setTexte] = useState("");
  const [matiere, setMatiere] = useState(matieres[0] || "Maths");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const generer = async () => {
    if (!peutGenerer) { onPremium && onPremium(); return; }
    if (!texte.trim()) return;
    setLoading(true); setResume("");
    try {
      const result = await callGroq(`Tu es un assistant scolaire pour collégien. Fais un résumé clair de ce cours de ${matiere} avec des titres et points clés. Réponds en français. Cours : ${texte}`);
      setResume(result);
      ajouterHistorique({ type: "resume", matiere, contenu: result, date: new Date().toLocaleDateString("fr-FR") });
    } catch { setResume(t.erreur); }
    setLoading(false);
  };

  const limiteBannerR = !isPremium && (
    <div style={{ padding: "0.6rem 1rem", borderRadius: 12, background: usageAujourdhui >= limiteJour ? "rgba(231,76,60,0.12)" : "rgba(253,160,133,0.12)", border: `1px solid ${usageAujourdhui >= limiteJour ? "#e74c3c" : "#fda085"}`, marginBottom: "0.8rem", fontSize: "0.83rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
      <span style={{ color: usageAujourdhui >= limiteJour ? "#e74c3c" : "#e67e22" }}>
        {usageAujourdhui >= limiteJour ? "🔒 Limite atteinte" : `📊 ${usageAujourdhui}/${limiteJour} aujourd'hui`}
      </span>
      <button onClick={onPremium} style={{ background: "linear-gradient(135deg,#f6d365,#fda085)", border: "none", borderRadius: 50, padding: "0.3rem 0.8rem", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>⭐ Premium</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "1rem" }}>🌿 {t.tonCours}</div>
        <SelectStyle v={v} value={matiere} onChange={e => setMatiere(e.target.value)} style={{ marginBottom: "0.8rem" }}>
          {matieres.map(m => <option key={m} value={m}>{m}</option>)}
        </SelectStyle>
        <ZoneSaisie texte={texte} setTexte={setTexte} placeholder={t.collerCours} t={t} v={v} />

        <Btn v={v} full onClick={generer} disabled={loading || !texte.trim()}>
          {loading ? t.generation : `✨ ${t.genererResume}`}
        </Btn>
      </Card>
      {resume && (
        <Card v={v}>
          <div style={{ fontWeight: 700, color: v.accent, marginBottom: "0.8rem" }}>🌸 {t.tonResume}</div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: v.text, fontSize: "0.92rem" }}>{resume}</div>
        </Card>
      )}
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function Quiz({ t, v, ajouterHistorique, matieres, langue, peutGenerer, isPremium, usageAujourdhui, limiteJour, onPremium }) {
  const [texte, setTexte] = useState("");
  const [matiere, setMatiere] = useState(matieres[0] || "Maths");
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState({});
  const [valide, setValide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("quiz"); // "quiz" | "trous"
  const [showTrous, setShowTrous] = useState(false);
  const [showPointsFaibles, setShowPointsFaibles] = useState(false);

  const generer = async () => {
    if (!peutGenerer) { onPremium && onPremium(); return; }
    if (!texte.trim()) return;
    if (mode === "trous") { setShowTrous(true); return; }
    setLoading(true); setQuestions([]); setReponses({}); setValide(false);
    try {
      const result = await callGroq(`Tu es un professeur expert en ${matiere} pour collégiens. Génère exactement 20 questions VARIÉES et ORIGINALES à partir de ce cours. 

IMPORTANT : Mélange obligatoirement ces types de questions (environ 5 de chaque) :
1. "Vrai ou Faux" — une affirmation à valider (options : ["A) Vrai","B) Faux","C) Plutôt vrai","D) Plutôt faux"])
2. "Compléter la phrase" — une phrase avec un blanc à remplir parmi 4 propositions très différentes
3. "Question de logique/déduction" — une question qui demande de raisonner, pas juste de mémoriser
4. "QCM" — question directe avec 4 réponses clairement différentes les unes des autres

NE GÉNÈRE JAMAIS de questions "Trouver l'intrus".

Les questions doivent être PRÉCISES et basées strictement sur le contenu du cours fourni.
Les 4 options de réponse doivent être clairement différentes entre elles (pas de reformulations similaires).
Indique le TYPE de la question dans le champ "type".

Réponds UNIQUEMENT en JSON valide sans markdown ni texte autour :
[{"type":"Vrai ou Faux","question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"correct":0,"explication":"..."}]

Cours de ${matiere} :
${texte.slice(0, 4000)}`);
      setQuestions(JSON.parse(result.replace(/```json|```/g, "").trim()));
    } catch { alert(t.erreur); }
    setLoading(false);
  };

  const handleValider = () => {
    const scoreFinal = questions.filter((q, i) => reponses[i] === q.correct).length;
    setValide(true);
    ajouterHistorique({ type: "quiz", matiere, questions, reponses, score: scoreFinal, date: new Date().toLocaleDateString("fr-FR") });
  };

  const getPct = () => Math.round(questions.filter((q, i) => reponses[i] === q.correct).length / questions.length * 100);
  const getNbErreurs = () => questions.filter((q, i) => reponses[i] !== q.correct).length;

  if (showTrous) return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Card v={v}>
        <TexteATrous texte={texte} matiere={matiere} v={v} t={t} onClose={() => setShowTrous(false)} langue={langue} ajouterHistorique={ajouterHistorique} />
      </Card>
    </div>
  );

  if (showPointsFaibles) return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Card v={v}>
        <PointsFaibles questions={questions} reponses={reponses} matiere={matiere} texteOriginal={texte} v={v} t={t} onClose={() => setShowPointsFaibles(false)} langue={langue} />
      </Card>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {questions.length === 0 ? (
        <Card v={v}>
          <div style={{ fontWeight: 700, color: v.accent, marginBottom: "1rem" }}>🌿 {t.tonCours}</div>
          <SelectStyle v={v} value={matiere} onChange={e => setMatiere(e.target.value)} style={{ marginBottom: "0.8rem" }}>
            {matieres.map(m => <option key={m} value={m}>{m}</option>)}
          </SelectStyle>
  const limiteBannerQ = !isPremium && (
    <div style={{ padding: "0.6rem 1rem", borderRadius: 12, background: usageAujourdhui >= limiteJour ? "rgba(231,76,60,0.12)" : "rgba(253,160,133,0.12)", border: `1px solid ${usageAujourdhui >= limiteJour ? "#e74c3c" : "#fda085"}`, marginBottom: "0.8rem", fontSize: "0.83rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
      <span style={{ color: usageAujourdhui >= limiteJour ? "#e74c3c" : "#e67e22" }}>
        {usageAujourdhui >= limiteJour ? "🔒 Limite atteinte" : `📊 ${usageAujourdhui}/${limiteJour} aujourd'hui`}
      </span>
      <button onClick={onPremium} style={{ background: "linear-gradient(135deg,#f6d365,#fda085)", border: "none", borderRadius: 50, padding: "0.3rem 0.8rem", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>⭐ Premium</button>
    </div>
  );

          <ZoneSaisie texte={texte} setTexte={setTexte} placeholder={t.collerCours} t={t} v={v} />

          {/* Mode selector */}
          <div style={{ display: "flex", gap: "0.5rem", margin: "0.8rem 0" }}>
            {[["quiz","✨ Quiz"], ["trous","✍️ Texte à trous"]].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "0.55rem", borderRadius: 50, border: `1px solid ${mode === m ? v.accent : v.inputBorder}`, background: mode === m ? v.accentBg : "transparent", color: mode === m ? v.accent : v.textMuted, fontWeight: mode === m ? 700 : 400, cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" }}>{label}</button>
            ))}
          </div>

          <Btn v={v} full onClick={generer} disabled={loading || !texte.trim()}>
            {loading ? t.generation : mode === "trous" ? "✍️ Générer le texte à trous" : `✨ ${t.genererQuiz}`}
          </Btn>
        </Card>
      ) : (
        <div>
          {questions.map((q, i) => (
            <Card key={i} v={v}>
              {q.type && (
                <div style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, padding: "0.15rem 0.6rem", borderRadius: 50, marginBottom: "0.5rem", background: q.type.includes("Vrai") ? "rgba(39,174,96,0.12)" : q.type.includes("intrus") ? "rgba(142,68,173,0.12)" : q.type.includes("Compléter") ? "rgba(41,128,185,0.12)" : q.type.includes("logique") ? "rgba(243,156,18,0.12)" : "rgba(122,92,46,0.1)", color: q.type.includes("Vrai") ? "#27ae60" : q.type.includes("intrus") ? "#8e44ad" : q.type.includes("Compléter") ? "#2980b9" : q.type.includes("logique") ? "#d4a017" : "#7a5c2e", border: `1px solid currentColor`, opacity: 0.85 }}>
                  {q.type.includes("Vrai") ? "✓✗ Vrai ou Faux" : q.type.includes("intrus") ? "🔍 Trouver l'intrus" : q.type.includes("Compléter") ? "✏️ Compléter" : q.type.includes("logique") ? "🧠 Logique" : "❓ QCM"}
                </div>
              )}
              <div style={{ fontWeight: 600, marginBottom: "0.8rem", color: v.text, fontSize: "0.95rem" }}>Q{i+1}. {q.question}</div>
              {q.options.map((opt, j) => {
                let bg = v.inputBg, border = `1px solid ${v.inputBorder}`, color = v.text;
                if (valide) {
                  if (j === q.correct) { bg = "rgba(39,174,96,0.15)"; border = "1px solid #27ae60"; color = "#1a7a40"; }
                  else if (reponses[i] === j) { bg = "rgba(192,57,43,0.12)"; border = "1px solid #c0392b"; color = "#c0392b"; }
                } else if (reponses[i] === j) { bg = v.accentBg; border = `1px solid ${v.accent}`; }
                return <button key={j} onClick={() => !valide && setReponses({...reponses,[i]:j})} style={{ display: "block", width: "100%", padding: "0.65rem 1rem", borderRadius: 50, border, background: bg, color, textAlign: "left", cursor: valide ? "default" : "pointer", marginBottom: "0.4rem", fontSize: "0.88rem", fontFamily: "inherit" }}>{opt}</button>;
              })}
              {valide && <div style={{ marginTop: "0.6rem", color: v.textMuted, fontSize: "0.83rem", fontStyle: "italic" }}>💡 {q.explication}</div>}
            </Card>
          ))}
          {!valide ? (
            <Btn v={v} full onClick={handleValider}>✅ {t.valider}</Btn>
          ) : (
            <Card v={v} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: getPct() >= 80 ? "#27ae60" : getPct() >= 50 ? "#d4a017" : "#c0392b", marginBottom: "0.3rem" }}>{getPct()}%</div>
              <div style={{ fontSize: "0.9rem", color: v.textMuted, marginBottom: "0.3rem" }}>
                {questions.filter((q,i) => reponses[i] === q.correct).length} {questions.filter((q,i) => reponses[i] === q.correct).length > 1 ? t.bonnesReponses : t.bonneReponse} {t.sur} {questions.length}
              </div>
              <div style={{ color: v.textMuted, marginBottom: "1.2rem" }}>{getPct() >= 80 ? t.excellent : getPct() >= 50 ? t.bienJoue : t.continuer}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {getNbErreurs() > 0 && (
                  <Btn v={v} full onClick={() => setShowPointsFaibles(true)} style={{ background: "rgba(192,57,43,0.12)", color: "#c0392b", border: "1px solid rgba(192,57,43,0.3)" }}>
                    {t.voirPointsFaibles} ({getNbErreurs()} {getNbErreurs() > 1 ? t.erreursLabel : t.erreurLabel})
                  </Btn>
                )}
                <Btn v={v} outline full onClick={() => { setQuestions([]); setTexte(""); setValide(false); setReponses({}); }}>🔄 {t.nouveauQuiz}</Btn>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// ─── HISTORIQUE ───────────────────────────────────────────────────────────────
function Historique({ historique, setHistorique, t, v }) {
  const [ouvert, setOuvert] = useState(null);
  if (historique.length === 0) return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Card v={v} style={{ textAlign: "center", padding: "3rem", color: v.textMuted }}>🌿 {t.historiquevide}</Card>
    </div>
  );
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {[...historique].reverse().map((item, i) => {
        const idx = historique.length - 1 - i;
        const isOuvert = ouvert === idx;
        const pct = item.type === "quiz" ? Math.round(item.score / (item.questions?.length || 5) * 100) : null;
        return (
          <Card key={idx} v={v}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: 1, minWidth: 0 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: COULEURS[item.matiere] || v.accent, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: v.text, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.type === "resume" ? "🌸 Résumé" : "✨ Quiz"} — {item.matiere}</div>
                  <div style={{ fontSize: "0.78rem", color: v.textMuted }}>{item.date}
                    {pct !== null && <span style={{ marginLeft: "0.5rem", padding: "0.1rem 0.5rem", borderRadius: 50, background: pct >= 80 ? "rgba(39,174,96,0.15)" : pct >= 50 ? "rgba(212,160,23,0.15)" : "rgba(192,57,43,0.12)", color: pct >= 80 ? "#27ae60" : pct >= 50 ? "#b8860b" : "#c0392b", fontWeight: 700 }}>{pct}%</span>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
                <Btn v={v} outline small onClick={() => setOuvert(isOuvert ? null : idx)}>{isOuvert ? t.reduire : t.voirPlus}</Btn>
                <Btn v={v} danger small onClick={() => setHistorique(historique.filter((_,j) => j !== idx))}>{t.supprimer}</Btn>
              </div>
            </div>
            {isOuvert && (
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${v.cardBorder}` }}>
                {item.type === "resume"
                  ? <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: v.text, fontSize: "0.88rem" }}>{item.contenu}</div>
                  : item.questions.map((q, j) => (
                      <div key={j} style={{ marginBottom: "0.8rem" }}>
                        <div style={{ fontWeight: 600, color: v.text, fontSize: "0.88rem", marginBottom: "0.3rem" }}>Q{j+1}. {q.question}</div>
                        {q.options.map((opt, k) => (
                          <div key={k} style={{ padding: "0.3rem 0.8rem", borderRadius: 50, marginBottom: "0.2rem", fontSize: "0.83rem", background: k === q.correct ? "rgba(39,174,96,0.12)" : item.reponses[j] === k && k !== q.correct ? "rgba(192,57,43,0.1)" : v.inputBg, color: k === q.correct ? "#27ae60" : item.reponses[j] === k ? "#c0392b" : v.text, border: `1px solid ${k === q.correct ? "#27ae6050" : item.reponses[j] === k ? "#c0392b50" : v.inputBorder}` }}>{opt}</div>
                        ))}
                        <div style={{ fontSize: "0.78rem", color: v.textMuted, marginTop: "0.2rem", fontStyle: "italic" }}>💡 {q.explication}</div>
                      </div>
                    ))
                }
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ─── RÉGLAGES ─────────────────────────────────────────────────────────────────
const PALETTE = ["#c0392b","#2e86ab","#d4a017","#27ae60","#8e44ad","#e67e22","#2c3e50","#e91e8c","#00897b","#f06292","#5c6bc0","#ff7043","#26a69a","#8d6e63","#78909c"];

function Reglages({ theme, setTheme, langue, setLangue, matieres, setMatieres, t, v }) {
  const [nouvelleMatiere, setNouvelleMatiere] = useState("");
  const [couleurChoisie, setCouleurChoisie] = useState(PALETTE[8]);
  const [erreur, setErreur] = useState("");

  const getCouleurCustom = (m) => {
    try { return JSON.parse(localStorage.getItem("couleurs_custom") || "{}")[m]; } catch { return null; }
  };

  const ajouter = () => {
    const nom = nouvelleMatiere.trim();
    if (!nom) { setErreur("Entre un nom de matière."); return; }
    if (matieres.includes(nom)) { setErreur("Cette matière existe déjà."); return; }
    setMatieres([...matieres, nom]);
    try {
      const couleurs = JSON.parse(localStorage.getItem("couleurs_custom") || "{}");
      couleurs[nom] = couleurChoisie;
      localStorage.setItem("couleurs_custom", JSON.stringify(couleurs));
    } catch {}
    setNouvelleMatiere(""); setErreur("");
  };

  const supprimer = (m) => { if (matieres.length > 1) setMatieres(matieres.filter(x => x !== m)); };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "0.8rem" }}>🌙 Mode</div>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {["light","dark"].map(m => (
            <button key={m} onClick={() => setTheme(m)} style={{ flex: 1, padding: "0.7rem", borderRadius: 50, border: `1px solid ${theme === m ? v.accent : v.inputBorder}`, background: theme === m ? v.accentBg : "transparent", color: theme === m ? v.accent : v.textMuted, fontWeight: theme === m ? 700 : 400, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem" }}>
              {m === "light" ? "☀️ " + t.modeClairLabel : "🌙 " + t.modeSombre}
            </button>
          ))}
        </div>
      </Card>
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "0.8rem" }}>🌍 {t.langue}</div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[["fr","🇫🇷 Français"],["en","🇬🇧 English"],["es","🇪🇸 Español"]].map(([code, label]) => (
            <button key={code} onClick={() => setLangue(code)} style={{ flex: 1, padding: "0.6rem 0.3rem", borderRadius: 50, border: `1px solid ${langue === code ? v.accent : v.inputBorder}`, background: langue === code ? v.accentBg : "transparent", color: langue === code ? v.accent : v.textMuted, fontWeight: langue === code ? 700 : 400, cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem" }}>{label}</button>
          ))}
        </div>
      </Card>
      <Card v={v}>
        <div style={{ fontWeight: 700, color: v.accent, marginBottom: "1rem" }}>{langue === "en" ? "📚 My subjects" : langue === "es" ? "📚 Mis asignaturas" : "📚 Mes matières"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.2rem" }}>
          {matieres.map(m => {
            const couleur = COULEURS[m] || getCouleurCustom(m) || v.accent;
            return (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.8rem", borderRadius: 50, background: v.inputBg, border: `1px solid ${v.inputBorder}` }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: couleur, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: "0.9rem", color: v.text, fontWeight: 600 }}>{m}</span>
                <button onClick={() => supprimer(m)} style={{ background: "rgba(180,80,80,0.1)", border: "1px solid rgba(180,80,80,0.3)", borderRadius: "50%", color: "#c0392b", width: 26, height: 26, cursor: "pointer", fontSize: "0.7rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
            );
          })}
        </div>
        <div style={{ borderTop: `1px solid ${v.cardBorder}`, paddingTop: "1rem" }}>
          <div style={{ fontWeight: 600, color: v.text, fontSize: "0.88rem", marginBottom: "0.7rem" }}>{langue === "en" ? "➕ Add a subject" : langue === "es" ? "➕ Añadir asignatura" : "➕ Ajouter une matière"}</div>
          <InputStyle v={v} value={nouvelleMatiere} onChange={e => { setNouvelleMatiere(e.target.value); setErreur(""); }} placeholder="Ex: Philosophie, Latin..." style={{ marginBottom: "0.6rem" }} onKeyDown={e => e.key === "Enter" && ajouter()} />
          <div style={{ fontSize: "0.75rem", color: v.textMuted, marginBottom: "0.4rem" }}>Couleur :</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.8rem" }}>
            {PALETTE.map(c => (
              <button key={c} onClick={() => setCouleurChoisie(c)} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: couleurChoisie === c ? `3px solid ${v.text}` : "2px solid transparent", cursor: "pointer", flexShrink: 0, padding: 0 }} />
            ))}
          </div>
          {erreur && <div style={{ color: "#c0392b", fontSize: "0.8rem", marginBottom: "0.5rem" }}>⚠️ {erreur}</div>}
          <Btn v={v} full onClick={ajouter}>{t.ajouterBtn}</Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── APP PRINCIPALE ───────────────────────────────────────────────────────────
export default function App() {
  const [onglet, setOnglet] = useLocalStorage("onglet", "planning");
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [langue, setLangue] = useLocalStorage("langue", "fr");
  const [nom, setNom] = useLocalStorage("nom", "");
  const [prenom, setPrenom] = useLocalStorage("prenom", "");
  const [photo, setPhoto] = useLocalStorage("photo", null);
  const [historique, setHistorique] = useLocalStorage("historique", []);
  const [examens, setExamens] = useLocalStorage("examens", [{ matiere: "Maths", date: "" }]);
  const [genere, setGenere] = useLocalStorage("genere", false);
  const [matieres, setMatieres] = useLocalStorage("matieres", MATIERES_DEFAULT);
  const [moisActuel, setMoisActuel] = useState(new Date());
  const [pomodoroVisible, setPomodoroVisible] = useState(false);
  const isMobile = useIsMobile();

  const t = TRADUCTIONS[langue];
  const s = theme === "dark";
  const v = getThemeVars(s);
  const [streakData, setStreakData] = useLocalStorage("streakData", { count: 0, lastDate: null });
  const [isPremium, setIsPremium] = useLocalStorage("isPremium", false);
  const [pauseVisible, setPauseVisible] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const LIMITE_JOUR = 3;
  const getUsageAujourdhui = () => {
    const today = new Date().toLocaleDateString("fr-FR");
    return historique.filter(h => h.date === today && (h.type === "quiz" || h.type === "resume" || h.type === "trous")).length;
  };
  const usageAujourdhui = getUsageAujourdhui();
  const peutGenerer = isPremium || usageAujourdhui < LIMITE_JOUR;
  const [xpTotal, setXpTotal] = useLocalStorage("xpTotal", 0);
  const [levelUpAnim, setLevelUpAnim] = useState(null); // { niveau }

  const ajouterHistorique = (item) => {
    setHistorique(prev => [...prev, item]);
    // Streak
    if (item.type === "quiz" || item.type === "resume" || item.type === "trous") {
      const today = new Date().toLocaleDateString("fr-FR");
      setStreakData(prev => {
        if (prev.lastDate === today) return prev;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yest = yesterday.toLocaleDateString("fr-FR");
        const newCount = prev.lastDate === yest ? prev.count + 1 : 1;
        return { count: newCount, lastDate: today };
      });
    }
    // XP
    const gain = getXpGain(item.type);
    if (gain > 0) {
      setXpTotal(prev => {
        const ancienNiveau = getNiveauFromXpTotal(prev).niveau;
        const newXp = prev + gain;
        const nouveauNiveau = getNiveauFromXpTotal(newXp).niveau;
        if (nouveauNiveau > ancienNiveau) {
          setTimeout(() => {
            setLevelUpAnim({ niveau: nouveauNiveau });
            setTimeout(() => setLevelUpAnim(null), 3000);
          }, 300);
        }
        return newXp;
      });
    }
  };

  const getStreakActuel = () => {
    if (!streakData.lastDate) return 0;
    const today = new Date().toLocaleDateString("fr-FR");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yest = yesterday.toLocaleDateString("fr-FR");
    if (streakData.lastDate === today || streakData.lastDate === yest) return streakData.count;
    return 0;
  };
  const streakActuel = getStreakActuel();

  const ONGLETS = [
    { id: "profil", label: "👤 " + t.profil },
    { id: "planning", label: t.planning },
    { id: "resume", label: t.resumes },
    { id: "quiz", label: t.quiz },
    { id: "historique", label: t.historique },
    { id: "reglages", label: t.reglages },
  ];

  const { niveau, xpActuel, xpRequis } = getNiveauFromXpTotal(xpTotal);

  return (
    <div style={{ minHeight: "100vh", background: v.bg, backgroundImage: v.bgImage, backgroundRepeat: "repeat", backgroundSize: v.bgSize, color: v.text, fontFamily: "'Georgia', serif", overflowX: "hidden", width: "100%", maxWidth: "100vw", position: "relative" }}>
      {/* LEVEL UP ANIMATION */}
      {levelUpAnim && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", borderRadius: 24, padding: "2rem 3rem", textAlign: "center", boxShadow: "0 8px 40px rgba(253,160,133,0.5)", animation: "levelUpPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🎉</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>{t.niveauLabel} {levelUpAnim.niveau} !</div>
            <div style={{ fontSize: "1rem", color: "rgba(255,255,255,0.9)", marginTop: "0.3rem" }}>Tu montes de niveau !</div>
          </div>
          <style>{`@keyframes levelUpPop { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`}</style>
        </div>
      )}
      {/* NAVBAR */}
      <div style={{ background: v.navBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${v.cardBorder}`, padding: isMobile ? "0.8rem 1rem" : "0.9rem 2rem", position: "sticky", top: 0, zIndex: 100, overflowX: "hidden", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
        {isMobile ? (
          <div style={{ width: "100%", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem", width: "100%", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", minWidth: 0, flex: 1 }}>
                {photo
                  ? <img src={photo} alt="profil" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: `2px solid ${v.accent}`, flexShrink: 0 }} />
                  : <div style={{ width: 36, height: 36, borderRadius: "50%", background: v.accentBg, border: `2px solid ${v.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: v.accent, flexShrink: 0 }}>{prenom ? prenom[0].toUpperCase() : "🎓"}</div>}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: v.accent, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>🎓 {t.titre}</div>
                  {prenom && <div style={{ fontSize: "0.72rem", color: v.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.bonjour}, {prenom} 🌸</div>}
                </div>
              </div>
              {isPremium ? (
                !pomodoroVisible
                  ? <button onClick={() => setPomodoroVisible(true)} style={{ background: "transparent", border: `1px solid ${v.inputBorder}`, borderRadius: 50, padding: "0.3rem 0.6rem", color: v.textMuted, cursor: "pointer", fontSize: "0.75rem", fontFamily: "inherit", flexShrink: 0 }}>⏱️</button>
                  : <MiniPomodoro v={v} visible={true} onClose={() => setPomodoroVisible(false)} />
              ) : (
                <button onClick={() => setShowPremiumModal(true)} style={{ background: "transparent", border: `1px solid ${v.inputBorder}`, borderRadius: 50, padding: "0.3rem 0.6rem", color: v.textMuted, cursor: "pointer", fontSize: "0.75rem", fontFamily: "inherit", flexShrink: 0, opacity: 0.6 }}>🔒</button>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.3rem", overflowX: "auto", paddingBottom: "2px", width: "100%", boxSizing: "border-box", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {ONGLETS.map(o => (
                <button key={o.id} onClick={() => setOnglet(o.id)} style={{ padding: "0.35rem 0.75rem", borderRadius: 50, border: `1px solid ${onglet === o.id ? v.accent : "transparent"}`, background: onglet === o.id ? v.accentBg : "transparent", color: onglet === o.id ? v.accent : v.textMuted, fontWeight: onglet === o.id ? 700 : 400, cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>{o.label}</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              {photo
                ? <img src={photo} alt="profil" style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: `2px solid ${v.accent}` }} />
                : <div style={{ width: 42, height: 42, borderRadius: "50%", background: v.accentBg, border: `2px solid ${v.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 700, color: v.accent }}>{prenom ? prenom[0].toUpperCase() : "🎓"}</div>}
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.2rem", color: v.accent }}>🎓 {t.titre}</div>
                {prenom && <div style={{ fontSize: "0.8rem", color: v.textMuted }}>{t.bonjour}, {prenom} 🌸</div>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
              {ONGLETS.map(o => (
                <button key={o.id} onClick={() => setOnglet(o.id)} style={{ padding: "0.45rem 1rem", borderRadius: 50, border: `1px solid ${onglet === o.id ? v.accent : "transparent"}`, background: onglet === o.id ? v.accentBg : "transparent", color: onglet === o.id ? v.accent : v.textMuted, fontWeight: onglet === o.id ? 700 : 400, cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit" }}>{o.label}</button>
              ))}
              {isPremium ? (
                !pomodoroVisible
                  ? <button onClick={() => setPomodoroVisible(true)} style={{ background: "transparent", border: `1px solid ${v.inputBorder}`, borderRadius: 50, padding: "0.45rem 0.9rem", color: v.textMuted, cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit" }}>⏱️ Pomodoro</button>
                  : <MiniPomodoro v={v} visible={true} onClose={() => setPomodoroVisible(false)} />
              ) : (
                <button onClick={() => setShowPremiumModal(true)} style={{ background: "transparent", border: `1px solid ${v.inputBorder}`, borderRadius: 50, padding: "0.45rem 0.9rem", color: v.textMuted, cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit", opacity: 0.6 }}>🔒 Pomodoro</button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div style={{ padding: isMobile ? "0.75rem" : "2rem", maxWidth: "100%", overflowX: "hidden" }}>
        {onglet === "profil"    && <Profil nom={nom} setNom={setNom} prenom={prenom} setPrenom={setPrenom} photo={photo} setPhoto={setPhoto} historique={historique} examens={examens} v={v} langue={langue} t={t} streakActuel={streakActuel} xpActuel={xpActuel} xpRequis={xpRequis} niveau={niveau} isPremium={isPremium} onPremium={() => setShowPremiumModal(true)} />}
        {onglet === "planning"  && <Planning t={t} v={v} examens={examens} setExamens={setExamens} genere={genere} setGenere={setGenere} moisActuel={moisActuel} setMoisActuel={setMoisActuel} matieres={matieres} />}
        {onglet === "resume"    && <Resume t={t} v={v} ajouterHistorique={ajouterHistorique} matieres={matieres} langue={langue} peutGenerer={peutGenerer} isPremium={isPremium} usageAujourdhui={usageAujourdhui} limiteJour={LIMITE_JOUR} onPremium={() => setShowPremiumModal(true)} />}
        {onglet === "quiz"      && <Quiz t={t} v={v} ajouterHistorique={ajouterHistorique} matieres={matieres} langue={langue} peutGenerer={peutGenerer} isPremium={isPremium} usageAujourdhui={usageAujourdhui} limiteJour={LIMITE_JOUR} onPremium={() => setShowPremiumModal(true)} />}
        {onglet === "historique"&& <Historique historique={historique} setHistorique={setHistorique} t={t} v={v} />}
        {onglet === "reglages"  && <Reglages theme={theme} setTheme={setTheme} langue={langue} setLangue={setLangue} matieres={matieres} setMatieres={setMatieres} t={t} v={v} />}
      </div>

      {/* BOUTON PAUSE PREMIUM */}
      {isPremium && (
        <button
          onClick={() => setPauseVisible(true)}
          style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #f6d365, #fda085)", border: "none", fontSize: "1.4rem", cursor: "pointer", boxShadow: "0 4px 16px rgba(253,160,133,0.5)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" }}
          title="Espace pause"
        >🎮</button>
      )}

      {/* MODALES */}
      {pauseVisible && <EspacePause v={v} langue={langue} onClose={() => setPauseVisible(false)} />}
      {showPremiumModal && <PremiumModal v={v} langue={langue} onClose={() => setShowPremiumModal(false)} onActivate={() => setIsPremium(true)} />}
    </div>
  );
}