// ════════════════════════════════════════
//  CONJUGAISON — ANGLAIS
//  Chaque verbe est saisi avec ses formes de base (3e pers., -ing, prétérit, participe) ;
//  les temps composés sont construits à partir de ces formes.
// ════════════════════════════════════════
window.CJ = window.CJ || {};
(() => {

const P = ['I', 'you', 'he/she/it', 'we', 'they'];
const BE_PRES = ['am', 'are', 'is', 'are', 'are'];
const HAVE = ['have', 'have', 'has', 'have', 'have'];

const verbs = [];
// v(base, traduction, 3e pers., -ing, prétérit, participe, irrégulier ?, top ?, exemples [présent, passé, autre])
const v = (base, fr, s, ing, past, pp, irr, top, examples) => verbs.push({ id: base, inf: base, fr, s, ing, past, pp, irr, top, examples });

v('be', 'être', 'is', 'being', 'was', 'been', true, true, [['I\'m tired today.', 'Je suis fatigué aujourd\'hui.'], ['We were in London last week.', 'Nous étions à Londres la semaine dernière.'], ['It will be sunny tomorrow.', 'Il fera beau demain.']]);
v('have', 'avoir', 'has', 'having', 'had', 'had', true, true, [['She has two children.', 'Elle a deux enfants.'], ['We had a great time.', 'Nous nous sommes bien amusés.'], ['I\'ve had this car for ten years.', 'J\'ai cette voiture depuis dix ans.']]);
v('do', 'faire', 'does', 'doing', 'did', 'done', true, true, [['What do you do?', 'Que faites-vous dans la vie ?'], ['I did my homework.', 'J\'ai fait mes devoirs.'], ['Have you done the shopping?', 'Tu as fait les courses ?']]);
v('go', 'aller', 'goes', 'going', 'went', 'gone', true, true, [['He goes to work by bus.', 'Il va au travail en bus.'], ['We went to Scotland.', 'Nous sommes allés en Écosse.'], ['I\'m going to go to bed.', 'Je vais aller me coucher.']]);
v('get', 'obtenir, recevoir, devenir, arriver', 'gets', 'getting', 'got', 'got', true, true, [['I get up at seven.', 'Je me lève à sept heures.'], ['We got home late.', 'Nous sommes rentrés tard.'], ['It\'s getting cold.', 'Il commence à faire froid.']]);
v('make', 'faire, fabriquer', 'makes', 'making', 'made', 'made', true, true, [['She makes great cakes.', 'Elle fait de super gâteaux.'], ['I made a mistake.', 'J\'ai fait une erreur.'], ['Have you made a reservation?', 'Avez-vous fait une réservation ?']]);
v('say', 'dire', 'says', 'saying', 'said', 'said', true, true, [['What does it say?', 'Qu\'est-ce que ça dit ?'], ['He said he was sorry.', 'Il a dit qu\'il était désolé.'], ['I would say yes.', 'Je dirais oui.']]);
v('take', 'prendre', 'takes', 'taking', 'took', 'taken', true, true, [['It takes two hours.', 'Ça prend deux heures.'], ['We took a taxi.', 'Nous avons pris un taxi.'], ['Have you taken your medicine?', 'Tu as pris ton médicament ?']]);
v('come', 'venir', 'comes', 'coming', 'came', 'come', true, true, [['Are you coming tonight?', 'Tu viens ce soir ?'], ['She came back yesterday.', 'Elle est revenue hier.'], ['They will come by train.', 'Ils viendront en train.']]);
v('see', 'voir', 'sees', 'seeing', 'saw', 'seen', true, true, [['I see what you mean.', 'Je vois ce que tu veux dire.'], ['We saw a great film.', 'Nous avons vu un super film.'], ['Have you ever seen the sea?', 'As-tu déjà vu la mer ?']]);
v('know', 'savoir, connaître', 'knows', 'knowing', 'knew', 'known', true, false, [['Do you know her?', 'Tu la connais ?'], ['I knew it!', 'Je le savais !'], ['I\'ve known him for years.', 'Je le connais depuis des années.']]);
v('think', 'penser', 'thinks', 'thinking', 'thought', 'thought', true, false, [['I think it\'s a good idea.', 'Je pense que c\'est une bonne idée.'], ['I thought you were French.', 'Je pensais que tu étais français.'], ['I\'m thinking about it.', 'J\'y réfléchis.']]);
v('give', 'donner', 'gives', 'giving', 'gave', 'given', true, false, [['Can you give me a hand?', 'Tu peux me donner un coup de main ?'], ['She gave me a present.', 'Elle m\'a donné un cadeau.'], ['I\'ll give you a call.', 'Je te passerai un coup de fil.']]);
v('find', 'trouver', 'finds', 'finding', 'found', 'found', true, false, [['I can\'t find my keys.', 'Je ne trouve pas mes clés.'], ['We found a nice hotel.', 'Nous avons trouvé un bel hôtel.'], ['Have you found a job?', 'As-tu trouvé un travail ?']]);
v('tell', 'dire (à qqn), raconter', 'tells', 'telling', 'told', 'told', true, false, [['Tell me the truth.', 'Dis-moi la vérité.'], ['She told me a secret.', 'Elle m\'a dit un secret.'], ['I\'ll tell you later.', 'Je te le dirai plus tard.']]);
v('feel', 'se sentir, ressentir', 'feels', 'feeling', 'felt', 'felt', true, false, [['I feel much better.', 'Je me sens bien mieux.'], ['She felt sick on the boat.', 'Elle a eu le mal de mer sur le bateau.'], ['How are you feeling?', 'Comment te sens-tu ?']]);
v('leave', 'partir, quitter, laisser', 'leaves', 'leaving', 'left', 'left', true, false, [['The train leaves at nine.', 'Le train part à neuf heures.'], ['I left my phone at home.', 'J\'ai laissé mon téléphone à la maison.'], ['We\'re leaving tomorrow.', 'Nous partons demain.']]);
v('bring', 'apporter, amener', 'brings', 'bringing', 'brought', 'brought', true, false, [['Bring a jacket, it\'s cold.', 'Prends une veste, il fait froid.'], ['He brought some wine.', 'Il a apporté du vin.'], ['I\'ll bring the kids.', 'J\'amènerai les enfants.']]);
v('buy', 'acheter', 'buys', 'buying', 'bought', 'bought', true, false, [['Where do you buy your bread?', 'Où achètes-tu ton pain ?'], ['I bought a new dress.', 'J\'ai acheté une nouvelle robe.'], ['We\'re going to buy a house.', 'Nous allons acheter une maison.']]);
v('pay', 'payer', 'pays', 'paying', 'paid', 'paid', true, false, [['Can I pay by card?', 'Je peux payer par carte ?'], ['I paid too much.', 'J\'ai payé trop cher.'], ['Have you paid the bill?', 'As-tu payé l\'addition ?']]);
v('eat', 'manger', 'eats', 'eating', 'ate', 'eaten', true, false, [['We eat at eight.', 'Nous mangeons à vingt heures.'], ['I ate too much!', 'J\'ai trop mangé !'], ['Have you eaten yet?', 'Tu as déjà mangé ?']]);
v('drink', 'boire', 'drinks', 'drinking', 'drank', 'drunk', true, false, [['I don\'t drink coffee.', 'Je ne bois pas de café.'], ['We drank some local wine.', 'Nous avons bu du vin local.'], ['What would you like to drink?', 'Que voulez-vous boire ?']]);
v('speak', 'parler', 'speaks', 'speaking', 'spoke', 'spoken', true, false, [['Do you speak French?', 'Parlez-vous français ?'], ['I spoke to the manager.', 'J\'ai parlé au responsable.'], ['English is spoken here.', 'On parle anglais ici.']]);
v('write', 'écrire', 'writes', 'writing', 'wrote', 'written', true, false, [['She writes every morning.', 'Elle écrit tous les matins.'], ['I wrote him an email.', 'Je lui ai écrit un e-mail.'], ['Have you written to her?', 'Tu lui as écrit ?']]);
v('read', 'lire', 'reads', 'reading', 'read', 'read', true, false, [['I read before bed.', 'Je lis avant de dormir.'], ['I read it yesterday (/rɛd/).', 'Je l\'ai lu hier.'], ['Have you read this book?', 'As-tu lu ce livre ?']]);
v('meet', 'rencontrer, retrouver', 'meets', 'meeting', 'met', 'met', true, false, [['Let\'s meet at six.', 'Retrouvons-nous à dix-huit heures.'], ['We met in Lisbon.', 'Nous nous sommes rencontrés à Lisbonne.'], ['Nice to meet you!', 'Enchanté !']]);
v('sleep', 'dormir', 'sleeps', 'sleeping', 'slept', 'slept', true, false, [['I sleep eight hours a night.', 'Je dors huit heures par nuit.'], ['Did you sleep well?', 'Tu as bien dormi ?'], ['The baby is sleeping.', 'Le bébé dort.']]);
v('understand', 'comprendre', 'understands', 'understanding', 'understood', 'understood', true, false, [['I don\'t understand.', 'Je ne comprends pas.'], ['I understood everything!', 'J\'ai tout compris !'], ['Do you understand me?', 'Tu me comprends ?']]);
v('want', 'vouloir', 'wants', 'wanting', 'wanted', 'wanted', false, true, [['What do you want?', 'Qu\'est-ce que tu veux ?'], ['I wanted to call you.', 'Je voulais t\'appeler.'], ['She wants to travel.', 'Elle veut voyager.']]);
v('work', 'travailler, fonctionner', 'works', 'working', 'worked', 'worked', false, false, [['I work in a restaurant.', 'Je travaille dans un restaurant.'], ['The wifi doesn\'t work.', 'Le wifi ne marche pas.'], ['I\'ve worked here since 2019.', 'Je travaille ici depuis 2019.']]);
v('like', 'aimer (bien)', 'likes', 'liking', 'liked', 'liked', false, false, [['I like jazz.', 'J\'aime le jazz.'], ['Did you like the film?', 'Le film t\'a plu ?'], ['I\'d like a coffee.', 'Je voudrais un café.']]);
v('live', 'vivre, habiter', 'lives', 'living', 'lived', 'lived', false, false, [['She lives in Sète.', 'Elle habite à Sète.'], ['They lived in Paris for years.', 'Ils ont vécu à Paris pendant des années.'], ['I\'ve lived here for five years.', 'J\'habite ici depuis cinq ans.']]);
v('try', 'essayer, goûter', 'tries', 'trying', 'tried', 'tried', false, false, [['Try this cheese!', 'Goûte ce fromage !'], ['I tried to call you.', 'J\'ai essayé de t\'appeler.'], ['Have you tried the fish?', 'Tu as goûté le poisson ?']]);
v('travel', 'voyager', 'travels', 'travelling', 'travelled', 'travelled', false, false, [['I love travelling.', 'J\'adore voyager.'], ['We travelled around Portugal.', 'Nous avons voyagé à travers le Portugal.'], ['They will travel by car.', 'Ils voyageront en voiture.']]);
v('stay', 'rester, séjourner', 'stays', 'staying', 'stayed', 'stayed', false, false, [['Where are you staying?', 'Où logez-vous ?'], ['We stayed at a lovely hotel.', 'Nous avons séjourné dans un hôtel charmant.'], ['I\'ll stay at home.', 'Je resterai à la maison.']]);

const each = f => P.map((_, i) => f(i));
const pres = vb => vb.id === 'be' ? BE_PRES : vb.id === 'have' ? HAVE : each(i => i === 2 ? vb.s : vb.inf);
const past = vb => vb.id === 'be' ? ['was', 'were', 'was', 'were', 'were'] : each(() => vb.past);

const tenses = [
  {
    id: 'present', level: 'A1', name: 'Présent simple', short: 'Présent',
    forms: pres,
    usage: 'Les habitudes, les vérités générales, les horaires : <b>I work</b> in a hotel. The train <b>leaves</b> at 9.',
    formation: `Verbe à la forme de base, <b>+ -s</b> à la 3e personne (he/she/it).<br>-es après s, sh, ch, x, o (watch<b>es</b>, go<b>es</b>) · consonne + y → <b>-ies</b> (stud<b>ies</b>).<br>Question : <b>Do / Does</b> + sujet + base. Négation : <b>don\'t / doesn\'t</b> + base.<br>Irréguliers : be → am / are / is · have → has.`,
    tip: 'Après does / doesn\'t, le -s disparaît : « Does she work? », jamais « Does she works? ».',
    examples: [['She works in Lisbon.', 'Elle travaille à Lisbonne.'], ['Do you like fish?', 'Tu aimes le poisson ?'], ['He doesn\'t drink coffee.', 'Il ne boit pas de café.']],
    lessons: ['en_a1_1_1', 'en_a1_1_2', 'en_a1_3_3', 'en_a1_4_1', 'en_a1_4_2', 'en_a2_2_2'],
  },
  {
    id: 'continuous', level: 'A2', name: 'Présent continu', short: 'Présent continu',
    forms: vb => each(i => `${BE_PRES[i]} ${vb.ing}`),
    usage: 'Ce qui se passe <b>en ce moment</b> (I\'m cooking) ou un projet déjà <b>organisé</b> (I\'m meeting Sam tomorrow).',
    formation: `<b>am / are / is + verbe-ing</b>.<br>-e final disparaît (make → mak<b>ing</b>) · consonne doublée après voyelle courte accentuée (get → get<b>ting</b>, travel → travel<b>ling</b> en anglais britannique).`,
    tip: 'Les verbes d\'état (know, like, want, understand, believe) ne se mettent presque jamais en -ing : « I know », pas « I\'m knowing ».',
    examples: [['It\'s raining.', 'Il pleut.'], ['What are you doing?', 'Qu\'est-ce que tu fais ?'], ['We\'re leaving on Friday.', 'Nous partons vendredi.']],
    lessons: ['en_a2_4_1', 'en_a2_4_3'],
  },
  {
    id: 'past', level: 'A2', name: 'Prétérit (past simple)', short: 'Prétérit',
    forms: past,
    usage: 'Une action <b>terminée</b> à un moment <b>précis</b> du passé : yesterday, last week, in 2019, two days ago. = passé composé ou passé simple français.',
    formation: `Réguliers : <b>+ -ed</b> (worked, stayed, tried, travelled).<br>Irréguliers : à apprendre (went, had, saw…) — voir la liste des irréguliers.<br>Même forme à toutes les personnes (sauf be : was / were).<br>Question : <b>Did</b> + sujet + base. Négation : <b>didn\'t</b> + base.`,
    tip: 'Après did / didn\'t, on revient à la base : « Did you go? », « I didn\'t see », jamais « didn\'t saw ».',
    examples: [['We went to the beach yesterday.', 'Nous sommes allés à la plage hier.'], ['Did you enjoy it?', 'Ça t\'a plu ?'], ['I didn\'t have time.', 'Je n\'ai pas eu le temps.']],
    lessons: ['en_a2_3_1', 'en_a2_3_2', 'en_a2_3_3', 'en_b2_2_1'],
  },
  {
    id: 'perfect', level: 'B1', name: 'Present perfect', short: 'Present perfect',
    forms: vb => each(i => `${HAVE[i]} ${vb.pp}`),
    usage: 'Une expérience <b>sans date</b> (Have you ever…?), un résultat <b>visible maintenant</b> (I\'ve lost my keys), une durée qui <b>continue</b> (« depuis » : I\'ve lived here for 5 years).',
    formation: `<b>have / has + participe passé</b>.<br>Avec : ever, never, already, yet, just, for, since, this week…`,
    tip: 'Jamais avec un moment passé précis : « I saw him yesterday », pas « I have seen him yesterday ». Et « depuis » = present perfect : « I\'ve known her since 2010 ».',
    examples: [['Have you ever been to Ireland?', 'Es-tu déjà allé en Irlande ?'], ['I\'ve just arrived.', 'Je viens d\'arriver.'], ['We\'ve lived here for ten years.', 'Nous habitons ici depuis dix ans.']],
    lessons: ['en_b1_2_1', 'en_b1_2_2', 'en_b1_2_3'],
  },
  {
    id: 'will', level: 'B1', name: 'Futur avec « will »', short: 'Futur (will)',
    forms: vb => each(() => `will ${vb.inf}`),
    usage: 'Une décision <b>prise sur le moment</b> (I\'ll get it!), une promesse, une prédiction, une offre.',
    formation: `<b>will + base</b>, identique à toutes les personnes. Contraction : I<b>\'ll</b>, she<b>\'ll</b>… Négation : <b>won\'t</b>.`,
    tip: 'Après « if / when » on met le présent, pas will : « When I arrive, I\'ll call you ».',
    examples: [['I\'ll call you back.', 'Je te rappelle.'], ['It will be fine.', 'Ça ira.'], ['I won\'t forget.', 'Je n\'oublierai pas.']],
    lessons: ['en_b1_3_1', 'en_b1_3_3'],
  },
  {
    id: 'goingto', level: 'A2', name: 'Futur proche « going to »', short: 'Going to',
    forms: vb => each(i => `${BE_PRES[i]} going to ${vb.inf}`),
    usage: 'Une <b>intention déjà décidée</b> (I\'m going to learn Portuguese) ou une prédiction évidente (Look, it\'s going to rain).',
    formation: `<b>am / are / is + going to + base</b>. À l\'oral : « gonna ».`,
    tip: 'C\'est l\'équivalent direct de « je vais + infinitif » — le plus naturel pour parler de ses projets.',
    examples: [['We\'re going to visit Porto.', 'Nous allons visiter Porto.'], ['What are you going to do?', 'Que vas-tu faire ?'], ['She isn\'t going to come.', 'Elle ne va pas venir.']],
    lessons: ['en_a2_4_2'],
  },
  {
    id: 'would', level: 'B1', name: 'Conditionnel « would »', short: 'Conditionnel',
    forms: vb => each(() => `would ${vb.inf}`),
    usage: 'Situations <b>imaginaires</b> (I would travel), politesse (I\'d like, Would you…?), conseil (I would call her).',
    formation: `<b>would + base</b>, identique à toutes les personnes. Contraction : I<b>\'d</b>. Négation : <b>wouldn\'t</b>.<br>Avec if : <b>If</b> + prétérit, <b>would</b> + base : If I had time, I would travel.`,
    tip: 'Pas de would après « if » : « If I had money », jamais « If I would have money ».',
    examples: [['I\'d like a table for two.', 'Je voudrais une table pour deux.'], ['What would you do?', 'Que ferais-tu ?'], ['If I were you, I wouldn\'t go.', 'À ta place, je n\'irais pas.']],
    lessons: ['en_a2_1_2', 'en_b2_1_2', 'en_b2_1_3'],
  },
];

// Irréguliers supplémentaires (liste de référence + entraînement base → prétérit → participe)
const moreIrregulars = [
  ['become', 'became', 'become', 'devenir'], ['begin', 'began', 'begun', 'commencer'], ['break', 'broke', 'broken', 'casser'],
  ['build', 'built', 'built', 'construire'], ['catch', 'caught', 'caught', 'attraper'], ['choose', 'chose', 'chosen', 'choisir'],
  ['cost', 'cost', 'cost', 'coûter'], ['cut', 'cut', 'cut', 'couper'], ['drive', 'drove', 'driven', 'conduire'],
  ['fall', 'fell', 'fallen', 'tomber'], ['fly', 'flew', 'flown', 'voler (en avion)'], ['forget', 'forgot', 'forgotten', 'oublier'],
  ['hear', 'heard', 'heard', 'entendre'], ['hold', 'held', 'held', 'tenir'], ['keep', 'kept', 'kept', 'garder'],
  ['lend', 'lent', 'lent', 'prêter'], ['lose', 'lost', 'lost', 'perdre'], ['mean', 'meant', 'meant', 'signifier'],
  ['put', 'put', 'put', 'mettre'], ['run', 'ran', 'run', 'courir'], ['sell', 'sold', 'sold', 'vendre'],
  ['send', 'sent', 'sent', 'envoyer'], ['show', 'showed', 'shown', 'montrer'], ['shut', 'shut', 'shut', 'fermer'],
  ['sing', 'sang', 'sung', 'chanter'], ['sit', 'sat', 'sat', 's\'asseoir'], ['spend', 'spent', 'spent', 'dépenser, passer (du temps)'],
  ['stand', 'stood', 'stood', 'être debout'], ['steal', 'stole', 'stolen', 'voler (dérober)'], ['swim', 'swam', 'swum', 'nager'],
  ['teach', 'taught', 'taught', 'enseigner'], ['throw', 'threw', 'thrown', 'lancer'], ['wake', 'woke', 'woken', 'se réveiller'],
  ['wear', 'wore', 'worn', 'porter (vêtement)'], ['win', 'won', 'won', 'gagner'], ['ride', 'rode', 'ridden', 'monter (à vélo, cheval)'],
];
const irregulars = [
  ...verbs.filter(vb => vb.irr && vb.id !== 'be').map(vb => [vb.inf, vb.past, vb.pp, vb.fr]),
  ['be', 'was / were', 'been', 'être'],
  ...moreIrregulars,
].sort((a, b) => a[0].localeCompare(b[0]));

// ── Forme « régulière » attendue par la règle : sert à repérer les irréguliers (temps par temps)
// et à proposer la faute typique dans les choix multiples (ex. « goed » au lieu de « went »).
const regS = b => /(s|sh|ch|x|z|o)$/.test(b) ? b + 'es' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ies' : b + 's';
const regEd = b => /e$/.test(b) ? b + 'd' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ied' : b + 'ed';
const regPast = vb => vb.past === vb.inf + vb.inf.slice(-1) + 'ed' ? vb.past : regEd(vb.inf);  // stop → stopped
const regPP = vb => vb.pp === vb.inf + vb.inf.slice(-1) + 'ed' ? vb.pp : regEd(vb.inf);
function ruleForm(vb, tid, pi) {
  const t = tenses.find(x => x.id === tid);
  if (tid === 'present') return pi === 2 ? regS(vb.inf) : vb.inf;
  if (tid === 'past') return regPast(vb);
  if (tid === 'perfect') return `${HAVE[pi]} ${regPP(vb)}`;
  return t.forms(vb)[pi];   // les autres temps n'ont pas d'irréguliers
}

window.CJ.en = {
  ruleForm,
  persons: P,
  personNote: '« you » = tu et vous · « he/she/it » = il / elle / ça.',
  verbs, tenses, irregulars,
  inputHint: 'Écrivez la forme complète, sans contraction (ex. « have gone », « am going to eat »).',
  pronounsToStrip: ['i', 'you', 'he', 'she', 'it', 'we', 'they'],
};
})();
