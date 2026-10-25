// ════════════════════════════════════════
//  LangSpark — mini-langage pour écrire les cours
//  Convention : dans C / F / T / D, la BONNE réponse est toujours la première
//  option — le moteur mélange les options à l'affichage.
// ════════════════════════════════════════

window.BB_CURRICULUM = window.BB_CURRICULUM || {};

const LS = {
  // Fiche de grammaire : titre, explication (HTML simple autorisé), exemples [[langue, fr]], piège pour francophones
  G: (title, body, examples = [], tip = '') => ({ title, body, examples, tip }),

  // Nouveau mot / expression
  I: (word, tr, ex, exTr) => ({ type: 'intro', word, tr, ex, exTr }),

  // QCM — opts[0] est la bonne réponse
  C: (q, opts, expl = '') => ({ type: 'choice', q, opts, expl }),

  // Phrase à trous — '___' marque le trou, opts[0] est la bonne réponse
  F: (sentence, opts, tr = '', expl = '') => ({ type: 'fill', sentence, opts, tr, expl }),

  // Traduction FR → langue cible en QCM — opts[0] est la bonne réponse
  T: (fr, opts, expl = '') => ({ type: 'translate', fr, opts, expl }),

  // Remettre les mots dans l'ordre — extra = mots pièges en plus
  O: (fr, answer, extra = []) => ({ type: 'order', fr, answer, extra }),

  // Écrire soi-même — plusieurs réponses acceptées séparées par « | »
  W: (fr, answers, hint = '') => ({ type: 'write', fr, answers: answers.split('|'), hint }),

  // Dictée : écouter et écrire
  L: (text, fr) => ({ type: 'listen', text, fr }),

  // Dialogue : lignes [locuteur, texte, traduction], questions [question, [bonne, ...autres]]
  D: (title, lines, questions = []) => ({ type: 'dialogue', title, lines, questions }),

  // Leçon (l'id est généré automatiquement à partir de l'unité)
  lesson: (title, titleFr, grammar, exercises) => ({ title, titleFr, grammar, exercises }),

  // Unité
  unit: (id, level, title, titleFr, icon, color, lessons) => ({
    id, level, title, titleFr, icon, color,
    lessons: lessons.map((l, i) => ({ id: `${id}_${i + 1}`, ...l })),
  }),

  // Déclare (ou complète) un cours
  course: (lang, meta, units) => {
    const cur = window.BB_CURRICULUM[lang] || (window.BB_CURRICULUM[lang] = { ...meta, units: [] });
    cur.units.push(...units);
  },
};
