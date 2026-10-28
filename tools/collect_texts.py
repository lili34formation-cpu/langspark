#!/usr/bin/env python3
"""
Liste toutes les phrases que l'app peut lire à voix haute (cours, dialogues, verbes, flashcards)
en ouvrant l'app dans un navigateur sans écran et en affichant chaque écran.

Usage (l'app doit être servie, ex. : python3 -m http.server 8080 dans english-app) :
    python3 tools/collect_texts.py http://localhost:8080/index.html tools/texts.json
"""
import json
import sys
from playwright.sync_api import sync_playwright

URL, OUT = sys.argv[1], sys.argv[2]

COLLECT = r"""() => {
  const out = new Set();
  // même nettoyage que l'app (speechText) : c'est ce texte-là qui est lu et dont on calcule la clé
  const add = (lang, text) => { if (text && text.trim()) out.add(JSON.stringify([lang, speechText(text)])); };
  const grab = lang => bbState.audio.forEach(a => add(bbTTS(lang), a.text));

  for (const lang of BB_LANGS) {
    showView('bb-' + lang);
    // Toutes les étapes de toutes les leçons
    for (const unit of BB_CURRICULUM[lang].units) for (const lesson of unit.lessons) {
      bbStartLesson(lang, unit.id, lesson.id);
      for (let i = 0; i < bbState.steps.length; i++) { bbState.idx = i; bbRender(); grab(lang); }
      bbStopAudio();
    }
    // Conjugaison : fiches verbes, fiches temps, irréguliers
    const d = CJ[lang];
    d.verbs.forEach(v => { cjVerb(lang, v.id); grab(lang); });
    d.tenses.forEach(t => { cjTense(lang, t.id); grab(lang); });
    if (d.irregulars) { cjIrregulars(lang); grab(lang); }
    // Correction du conjugueur : « pronom + forme » pour chaque verbe, temps et personne
    d.verbs.forEach(v => d.tenses.forEach(t => t.forms(v).forEach((f, i) =>
      add(bbTTS(lang), `${(t.persons || d.persons)[i].split('/')[0].trim()} ${f}`))));
  }
  // Vocabulaire essentiel (même texte lu que vocSpeak)
  for (const lang of BB_LANGS) if (window.VOC && VOC[lang]) VOC[lang].themes.forEach(t => t.words.forEach(w => add(bbTTS(lang), vocSpeak(w[0]))));
  // Flashcards et phrases utiles
  vocabulary.forEach(c => {
    add('en-US', c.word);
    const ex = (c.example || '').replace(/^"|"$/g, '');
    if (ex) add('en-US', ex);
  });
  phrases.forEach(p => add('en-US', p.english));
  ptVocab.forEach(c => { add('pt-PT', c.pt); if (c.ex) add('pt-PT', c.ex); });
  ptPhrases.forEach(p => add('pt-PT', p.pt));
  return [...out].map(s => JSON.parse(s));
}"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(URL)
    page.wait_for_timeout(800)
    texts = page.evaluate(COLLECT)
    browser.close()

json.dump(texts, open(OUT, 'w'), ensure_ascii=False, indent=0)
by_lang = {}
for lang, _ in texts:
    by_lang[lang] = by_lang.get(lang, 0) + 1
print(f"{len(texts)} phrases → {OUT}", by_lang)
