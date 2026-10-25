// ════════════════════════════════════════
//  CONJUGAISON — PORTUGAIS EUROPÉEN
//  Présent, passé (perfeito) et subjonctif sont saisis à la main pour chaque verbe.
//  Imparfait, futur, conditionnel, impératif et participe sont dérivés de l'infinitif
//  (ils sont réguliers en portugais), avec les exceptions saisies explicitement.
// ════════════════════════════════════════
window.CJ = window.CJ || {};
(() => {

const P = ['eu', 'tu', 'ele/ela', 'nós', 'eles/elas'];
const sp = s => s.split(' ');

const verbs = [];
// v(infinitif, traduction, { pr, pf, cj, [imp], [fut], [pp], [impT] }, irrégulier ?, top ?, exemples)
const v = (inf, fr, f, irr, top, examples) => verbs.push({ id: inf, inf, fr, ...f, irr, top, examples });

v('ser', 'être (identité, caractère)', { pr: 'sou és é somos são', pf: 'fui foste foi fomos foram', cj: 'seja sejas seja sejamos sejam', imp: 'era eras era éramos eram', impT: 'sê' }, true, true,
  [['Sou francesa.', 'Je suis française.'], ['Foi uma noite incrível.', 'C\'était une soirée incroyable.'], ['Espero que sejas feliz.', 'J\'espère que tu seras heureux.']]);
v('estar', 'être (état, lieu)', { pr: 'estou estás está estamos estão', pf: 'estive estiveste esteve estivemos estiveram', cj: 'esteja estejas esteja estejamos estejam' }, true, true,
  [['Estou cansada.', 'Je suis fatiguée.'], ['Estive em Lisboa três dias.', 'J\'ai passé trois jours à Lisbonne.'], ['Está a chover.', 'Il pleut.']]);
v('ter', 'avoir', { pr: 'tenho tens tem temos têm', pf: 'tive tiveste teve tivemos tiveram', cj: 'tenha tenhas tenha tenhamos tenham', imp: 'tinha tinhas tinha tínhamos tinham' }, true, true,
  [['Tenho trinta anos.', 'J\'ai trente ans.'], ['Tive muita sorte.', 'J\'ai eu beaucoup de chance.'], ['Tens de vir!', 'Tu dois venir !']]);
v('ir', 'aller', { pr: 'vou vais vai vamos vão', pf: 'fui foste foi fomos foram', cj: 'vá vás vá vamos vão' }, true, true,
  [['Vou à praia.', 'Je vais à la plage.'], ['Fomos ao Porto ontem.', 'Nous sommes allés à Porto hier.'], ['Vamos jantar fora?', 'On va dîner dehors ?']]);
v('fazer', 'faire', { pr: 'faço fazes faz fazemos fazem', pf: 'fiz fizeste fez fizemos fizeram', cj: 'faça faças faça façamos façam', fut: 'far', pp: 'feito' }, true, true,
  [['O que fazes?', 'Qu\'est-ce que tu fais ?'], ['Fiz uma caminhada.', 'J\'ai fait une randonnée.'], ['Hoje faz anos.', 'Aujourd\'hui c\'est son anniversaire.']]);
v('poder', 'pouvoir', { pr: 'posso podes pode podemos podem', pf: 'pude pudeste pôde pudemos puderam', cj: 'possa possas possa possamos possam' }, true, true,
  [['Posso pagar com cartão?', 'Je peux payer par carte ?'], ['Não pude ir.', 'Je n\'ai pas pu y aller.'], ['Pode ajudar-me?', 'Pouvez-vous m\'aider ?']]);
v('querer', 'vouloir', { pr: 'quero queres quer queremos querem', pf: 'quis quiseste quis quisemos quiseram', cj: 'queira queiras queira queiramos queiram' }, true, true,
  [['Queres um café?', 'Tu veux un café ?'], ['Não quis incomodar.', 'Je n\'ai pas voulu déranger.'], ['Queria a conta, se faz favor.', 'Je voudrais l\'addition, s\'il vous plaît.']]);
v('dizer', 'dire', { pr: 'digo dizes diz dizemos dizem', pf: 'disse disseste disse dissemos disseram', cj: 'diga digas diga digamos digam', fut: 'dir', pp: 'dito' }, true, true,
  [['Como se diz isto em português?', 'Comment dit-on ça en portugais ?'], ['Ele disse que vinha.', 'Il a dit qu\'il viendrait.'], ['Diga-me!', 'Dites-moi !']]);
v('ver', 'voir', { pr: 'vejo vês vê vemos veem', pf: 'vi viste viu vimos viram', cj: 'veja vejas veja vejamos vejam', pp: 'visto' }, true, true,
  [['Vês o mar daqui?', 'Tu vois la mer d\'ici ?'], ['Vimos baleias!', 'Nous avons vu des baleines !'], ['Nunca tinha visto nada assim.', 'Je n\'avais jamais rien vu de tel.']]);
v('dar', 'donner', { pr: 'dou dás dá damos dão', pf: 'dei deste deu demos deram', cj: 'dê dês dê demos deem' }, true, true,
  [['Dá-me a tua mão.', 'Donne-moi ta main.'], ['Ela deu-me uma prenda.', 'Elle m\'a donné un cadeau.'], ['Não dá!', 'Ce n\'est pas possible !']]);
v('vir', 'venir', { pr: 'venho vens vem vimos vêm', pf: 'vim vieste veio viemos vieram', cj: 'venha venhas venha venhamos venham', imp: 'vinha vinhas vinha vínhamos vinham', pp: 'vindo' }, true, false,
  [['Vens jantar?', 'Tu viens dîner ?'], ['Vieram de comboio.', 'Ils sont venus en train.'], ['Quando vieres, liga-me.', 'Quand tu viendras, appelle-moi.']]);
v('saber', 'savoir', { pr: 'sei sabes sabe sabemos sabem', pf: 'soube soubeste soube soubemos souberam', cj: 'saiba saibas saiba saibamos saibam' }, true, false,
  [['Não sei.', 'Je ne sais pas.'], ['Soube a notícia ontem.', 'J\'ai appris la nouvelle hier.'], ['Sabes nadar?', 'Tu sais nager ?']]);
v('pôr', 'mettre', { pr: 'ponho pões põe pomos põem', pf: 'pus puseste pôs pusemos puseram', cj: 'ponha ponhas ponha ponhamos ponham', imp: 'punha punhas punha púnhamos punham', fut: 'por', pp: 'posto' }, true, false,
  [['Ponho a mesa.', 'Je mets la table.'], ['Onde puseste as chaves?', 'Où as-tu mis les clés ?'], ['Põe o casaco!', 'Mets ton manteau !']]);
v('trazer', 'apporter', { pr: 'trago trazes traz trazemos trazem', pf: 'trouxe trouxeste trouxe trouxemos trouxeram', cj: 'traga tragas traga tragamos tragam', fut: 'trar' }, true, false,
  [['Pode trazer-me a ementa?', 'Pouvez-vous m\'apporter la carte ?'], ['Trouxe vinho.', 'J\'ai apporté du vin.'], ['Traz o guarda-chuva!', 'Prends le parapluie !']]);
v('sair', 'sortir, partir', { pr: 'saio sais sai saímos saem', pf: 'saí saíste saiu saímos saíram', cj: 'saia saias saia saiamos saiam', imp: 'saía saías saía saíamos saíam', pp: 'saído' }, true, false,
  [['A que horas sais do trabalho?', 'À quelle heure sors-tu du travail ?'], ['Saímos tarde.', 'Nous sommes sortis tard.'], ['Saia pela porta da esquerda.', 'Sortez par la porte de gauche.']]);
v('pedir', 'demander (qqch), commander', { pr: 'peço pedes pede pedimos pedem', pf: 'pedi pediste pediu pedimos pediram', cj: 'peça peças peça peçamos peçam' }, true, false,
  [['Peço desculpa.', 'Je vous prie de m\'excuser.'], ['Pedimos o prato do dia.', 'Nous avons commandé le plat du jour.'], ['Pede a conta!', 'Demande l\'addition !']]);
v('ouvir', 'entendre, écouter', { pr: 'ouço ouves ouve ouvimos ouvem', pf: 'ouvi ouviste ouviu ouvimos ouviram', cj: 'ouça ouças ouça ouçamos ouçam' }, true, false,
  [['Não te ouço bem.', 'Je ne t\'entends pas bien.'], ['Ouvimos fado em Alfama.', 'Nous avons écouté du fado dans l\'Alfama.'], ['Ouça!', 'Écoutez !']]);
v('dormir', 'dormir', { pr: 'durmo dormes dorme dormimos dormem', pf: 'dormi dormiste dormiu dormimos dormiram', cj: 'durma durmas durma durmamos durmam' }, true, false,
  [['Durmo mal com calor.', 'Je dors mal quand il fait chaud.'], ['Dormiste bem?', 'Tu as bien dormi ?'], ['As crianças estão a dormir.', 'Les enfants dorment.']]);
v('ler', 'lire', { pr: 'leio lês lê lemos leem', pf: 'li leste leu lemos leram', cj: 'leia leias leia leiamos leiam' }, true, false,
  [['Leio o jornal todas as manhãs.', 'Je lis le journal tous les matins.'], ['Já leste este livro?', 'Tu as déjà lu ce livre ?'], ['Leia com atenção.', 'Lisez attentivement.']]);
v('ficar', 'rester, se trouver, devenir', { pr: 'fico ficas fica ficamos ficam', pf: 'fiquei ficaste ficou ficámos ficaram', cj: 'fique fiques fique fiquemos fiquem' }, false, true,
  [['Onde fica a estação?', 'Où se trouve la gare ?'], ['Ficámos num hotel giro.', 'Nous avons logé dans un hôtel sympa.'], ['Fiquei contente!', 'J\'étais content !']]);
v('conhecer', 'connaître', { pr: 'conheço conheces conhece conhecemos conhecem', pf: 'conheci conheceste conheceu conhecemos conheceram', cj: 'conheça conheças conheça conheçamos conheçam' }, false, false,
  [['Conheces o Porto?', 'Tu connais Porto ?'], ['Conhecemo-nos em 2015.', 'Nous nous sommes rencontrés en 2015.'], ['Quero que conheças a minha família.', 'Je veux que tu connaisses ma famille.']]);
v('perceber', 'comprendre', { pr: 'percebo percebes percebe percebemos percebem', pf: 'percebi percebeste percebeu percebemos perceberam', cj: 'perceba percebas perceba percebamos percebam' }, false, false,
  [['Não percebo.', 'Je ne comprends pas.'], ['Percebeste?', 'Tu as compris ?'], ['Espero que percebas.', 'J\'espère que tu comprends.']]);
v('falar', 'parler', { pr: 'falo falas fala falamos falam', pf: 'falei falaste falou falámos falaram', cj: 'fale fales fale falemos falem' }, false, true,
  [['Fala francês?', 'Vous parlez français ?'], ['Falámos durante horas.', 'Nous avons parlé pendant des heures.'], ['Fale mais devagar, por favor.', 'Parlez plus lentement, s\'il vous plaît.']]);
v('comer', 'manger', { pr: 'como comes come comemos comem', pf: 'comi comeste comeu comemos comeram', cj: 'coma comas coma comamos comam' }, false, false,
  [['Comemos às oito.', 'Nous mangeons à vingt heures.'], ['Comi sardinhas.', 'J\'ai mangé des sardines.'], ['Coma enquanto está quente.', 'Mangez tant que c\'est chaud.']]);
v('beber', 'boire', { pr: 'bebo bebes bebe bebemos bebem', pf: 'bebi bebeste bebeu bebemos beberam', cj: 'beba bebas beba bebamos bebam' }, false, false,
  [['O que bebes?', 'Qu\'est-ce que tu bois ?'], ['Bebemos vinho verde.', 'Nous avons bu du vinho verde.'], ['Beba muita água.', 'Buvez beaucoup d\'eau.']]);
v('partir', 'partir, casser', { pr: 'parto partes parte partimos partem', pf: 'parti partiste partiu partimos partiram', cj: 'parta partas parta partamos partam' }, false, false,
  [['O comboio parte às nove.', 'Le train part à neuf heures.'], ['Parti o copo!', 'J\'ai cassé le verre !'], ['Partimos amanhã cedo.', 'Nous partons demain tôt.']]);
v('gostar', 'aimer (de)', { pr: 'gosto gostas gosta gostamos gostam', pf: 'gostei gostaste gostou gostámos gostaram', cj: 'goste gostes goste gostemos gostem' }, false, true,
  [['Gosto muito de Lisboa.', 'J\'aime beaucoup Lisbonne.'], ['Gostaste do jantar?', 'Le dîner t\'a plu ?'], ['Gostava de voltar.', 'J\'aimerais revenir.']]);
v('chegar', 'arriver', { pr: 'chego chegas chega chegamos chegam', pf: 'cheguei chegaste chegou chegámos chegaram', cj: 'chegue chegues chegue cheguemos cheguem' }, false, false,
  [['A que horas chega o voo?', 'À quelle heure arrive le vol ?'], ['Cheguei agora.', 'Je viens d\'arriver.'], ['Quando chegares, avisa.', 'Quand tu arrives, préviens.']]);
v('pagar', 'payer', { pr: 'pago pagas paga pagamos pagam', pf: 'paguei pagaste pagou pagámos pagaram', cj: 'pague pagues pague paguemos paguem', pp: 'pago' }, false, false,
  [['Posso pagar com cartão?', 'Je peux payer par carte ?'], ['Já paguei.', 'J\'ai déjà payé.'], ['Pague na caixa.', 'Payez à la caisse.']]);
v('começar', 'commencer', { pr: 'começo começas começa começamos começam', pf: 'comecei começaste começou começámos começaram', cj: 'comece comeces comece comecemos comecem' }, false, false,
  [['O filme começa às nove.', 'Le film commence à neuf heures.'], ['Comecei a aprender português.', 'J\'ai commencé à apprendre le portugais.'], ['Comece por aqui.', 'Commencez par ici.']]);
v('viver', 'vivre', { pr: 'vivo vives vive vivemos vivem', pf: 'vivi viveste viveu vivemos viveram', cj: 'viva vivas viva vivamos vivam' }, false, false,
  [['Vivo em Sète.', 'Je vis à Sète.'], ['Vivemos dois anos no Porto.', 'Nous avons vécu deux ans à Porto.'], ['Viva!', 'Vive… ! / Bravo !']]);
v('achar', 'trouver, penser', { pr: 'acho achas acha achamos acham', pf: 'achei achaste achou achámos acharam', cj: 'ache aches ache achemos achem' }, false, false,
  [['Acho que sim.', 'Je pense que oui.'], ['Achei o filme ótimo.', 'J\'ai trouvé le film génial.'], ['O que achas?', 'Qu\'en penses-tu ?']]);
v('trabalhar', 'travailler', { pr: 'trabalho trabalhas trabalha trabalhamos trabalham', pf: 'trabalhei trabalhaste trabalhou trabalhámos trabalharam', cj: 'trabalhe trabalhes trabalhe trabalhemos trabalhem' }, false, false,
  [['Trabalho num restaurante.', 'Je travaille dans un restaurant.'], ['Trabalhei até tarde.', 'J\'ai travaillé tard.'], ['Tenho trabalhado muito.', 'Je travaille beaucoup ces temps-ci.']]);
v('precisar', 'avoir besoin (de)', { pr: 'preciso precisas precisa precisamos precisam', pf: 'precisei precisaste precisou precisámos precisaram', cj: 'precise precises precise precisemos precisem' }, false, false,
  [['Preciso de ajuda.', 'J\'ai besoin d\'aide.'], ['Precisei de um táxi.', 'J\'ai eu besoin d\'un taxi.'], ['Precisa de alguma coisa?', 'Vous avez besoin de quelque chose ?']]);

// ── Dérivations régulières ──
const group = vb => vb.inf === 'pôr' ? 'er' : vb.inf.slice(-2);
const stem = vb => vb.inf === 'pôr' ? 'p' : vb.inf.slice(0, -2);
const imperfeito = vb => vb.imp ? sp(vb.imp)
  : group(vb) === 'ar' ? ['ava', 'avas', 'ava', 'ávamos', 'avam'].map(e => stem(vb) + e)
  : ['ia', 'ias', 'ia', 'íamos', 'iam'].map(e => stem(vb) + e);
const futStem = vb => vb.fut || vb.inf;
const futuro = vb => ['ei', 'ás', 'á', 'emos', 'ão'].map(e => futStem(vb) + e);
const condicional = vb => ['ia', 'ias', 'ia', 'íamos', 'iam'].map(e => futStem(vb) + e);
const participio = vb => vb.pp || stem(vb) + (group(vb) === 'ar' ? 'ado' : 'ido');
const EST = sp('estou estás está estamos estão');
const VOU = sp('vou vais vai vamos vão');
verbs.forEach(vb => { vb.part = participio(vb); });

const tenses = [
  {
    id: 'presente', level: 'A1', name: 'Presente (présent)', short: 'Presente',
    forms: vb => sp(vb.pr),
    usage: 'Les habitudes et les faits : <b>Trabalho</b> num hotel. Souvent aussi le futur proche à l\'oral : <b>Amanhã vou</b> ao Porto.',
    formation: `<b>-AR</b> : o, as, a, amos, am · <b>-ER</b> : o, es, e, emos, em · <b>-IR</b> : o, es, e, imos, em.<br>Beaucoup de verbes très courants sont irréguliers à la 1re personne : fa<b>ço</b>, di<b>go</b>, ou<b>ço</b>, pe<b>ço</b>, ten<b>ho</b>, pos<b>so</b>.`,
    tip: '« você » et « o senhor / a senhora » se conjuguent comme « ele/ela » : (O senhor) fala francês?',
    examples: [['Moro em Lisboa.', 'J\'habite à Lisbonne.'], ['Falas inglês?', 'Tu parles anglais ?'], ['Não percebo.', 'Je ne comprends pas.']],
    lessons: ['pt_a1_1_2', 'pt_a1_2_1', 'pt_a1_3_3', 'pt_a1_4_1', 'pt_a1_4_2'],
  },
  {
    id: 'progressivo', level: 'A2', name: 'Estar a + infinitif (action en cours)', short: 'Estar a…',
    forms: vb => EST.map(e => `${e} a ${vb.inf}`),
    usage: 'Ce qui se passe <b>en ce moment</b> : <b>Estou a trabalhar</b> (je suis en train de travailler). C\'est la forme du Portugal.',
    formation: `<b>estar</b> (estou, estás, está, estamos, estão) <b>+ a + infinitif</b>.`,
    tip: 'Le Brésil dit « estou trabalhando » (gérondif). Au Portugal, dites « estou a trabalhar ».',
    examples: [['Está a chover.', 'Il pleut.'], ['O que estás a fazer?', 'Qu\'est-ce que tu fais ?'], ['Estamos a jantar.', 'Nous sommes en train de dîner.']],
    lessons: ['pt_a2_4_1'],
  },
  {
    id: 'perfeito', level: 'A2', name: 'Pretérito perfeito (passé)', short: 'Perfeito',
    forms: vb => sp(vb.pf),
    usage: 'Une action <b>terminée</b> dans le passé : = notre passé composé. <b>Ontem jantei</b> fora (hier j\'ai dîné dehors).',
    formation: `<b>-AR</b> : ei, aste, ou, <b>ámos</b>, aram · <b>-ER</b> : i, este, eu, emos, eram · <b>-IR</b> : i, iste, iu, imos, iram.<br>Irréguliers majeurs : ser/ir → fui, estar → estive, ter → tive, fazer → fiz, dizer → disse, poder → pude, pôr → pus, vir → vim.`,
    tip: 'Au Portugal, « falámos » (passé) prend un accent pour le distinguer de « falamos » (présent). Ser et ir ont la même forme : « fui » = j\'ai été / je suis allé.',
    examples: [['Fui a Sintra no sábado.', 'Je suis allé à Sintra samedi.'], ['O que fizeste?', 'Qu\'as-tu fait ?'], ['Chegámos tarde.', 'Nous sommes arrivés tard.']],
    lessons: ['pt_a2_3_1', 'pt_a2_3_2', 'pt_a2_3_3', 'pt_b1_2_2'],
  },
  {
    id: 'imperfeito', level: 'B1', name: 'Pretérito imperfeito (imparfait)', short: 'Imperfeito',
    forms: imperfeito,
    usage: 'Le <b>décor</b>, les <b>habitudes passées</b>, une action <b>en cours</b> dans le passé — comme l\'imparfait français. Aussi la politesse : <b>Queria</b> um café.',
    formation: `<b>-AR</b> : ava, avas, ava, ávamos, avam · <b>-ER / -IR</b> : ia, ias, ia, íamos, iam.<br>Seulement 4 irréguliers : ser → <b>era</b>, ter → <b>tinha</b>, vir → <b>vinha</b>, pôr → <b>punha</b>.`,
    tip: 'À l\'oral, l\'imparfait remplace souvent le conditionnel : « Se pudesse, ia » (si je pouvais, j\'irais).',
    examples: [['Quando era pequeno, vivia no campo.', 'Quand j\'étais petit, je vivais à la campagne.'], ['Estava a chover.', 'Il pleuvait.'], ['Queria uma mesa para dois.', 'Je voudrais une table pour deux.']],
    lessons: ['pt_b1_2_1', 'pt_b1_2_2'],
  },
  {
    id: 'futproximo', level: 'A2', name: 'Futur proche (ir + infinitif)', short: 'Ir + inf.',
    forms: vb => VOU.map(e => `${e} ${vb.inf}`),
    usage: 'Le futur <b>de la vie courante</b> : <b>Vou ligar</b> amanhã. C\'est de loin le plus utilisé à l\'oral.',
    formation: `<b>ir</b> (vou, vais, vai, vamos, vão) <b>+ infinitif</b>.`,
    tip: 'Pour « je vais aller », on dit simplement « vou » : « Vou ao Porto » (pas « vou ir »).',
    examples: [['Vamos jantar fora.', 'Nous allons dîner dehors.'], ['O que vais fazer?', 'Que vas-tu faire ?'], ['Vai chover.', 'Il va pleuvoir.']],
    lessons: ['pt_a2_4_2'],
  },
  {
    id: 'futuro', level: 'B1', name: 'Futuro simples (futur)', short: 'Futuro',
    forms: futuro,
    usage: 'Futur plutôt <b>écrit ou formel</b>, promesses, hypothèses : <b>Ligarei</b> amanhã sem falta.',
    formation: `Infinitif + <b>ei, ás, á, emos, ão</b>.<br>Seulement 3 irréguliers : dizer → <b>direi</b>, fazer → <b>farei</b>, trazer → <b>trarei</b>.`,
    tip: 'Avec un pronom, le Portugal formel le place AU MILIEU (mésoclise) : « Dir-lhe-ei » (je lui dirai). À reconnaître seulement.',
    examples: [['Amanhã falaremos disso.', 'Demain nous en parlerons.'], ['Farei o possível.', 'Je ferai mon possible.'], ['Onde estará ele?', 'Où peut-il bien être ?']],
    lessons: ['pt_b1_3_3'],
  },
  {
    id: 'condicional', level: 'B2', name: 'Condicional (conditionnel)', short: 'Condicional',
    forms: condicional,
    usage: 'Hypothèses et politesse : <b>Gostaria</b> de reservar uma mesa. <b>Se tivesse</b> tempo, <b>viajaria</b>.',
    formation: `Infinitif + <b>ia, ias, ia, íamos, iam</b> (mêmes irréguliers que le futur : diria, faria, traria).`,
    tip: 'À l\'oral au Portugal, on dit souvent l\'imparfait à la place : « Gostava de… » plutôt que « Gostaria de… ».',
    examples: [['Gostaria de uma mesa para dois.', 'J\'aimerais une table pour deux.'], ['O que farias?', 'Que ferais-tu ?'], ['Seria ótimo!', 'Ce serait génial !']],
    lessons: ['pt_b2_1_3'],
  },
  {
    id: 'conjuntivo', level: 'B2', name: 'Presente do conjuntivo (subjonctif)', short: 'Conjuntivo',
    forms: vb => sp(vb.cj),
    usage: 'Après <b>espero que, quero que, é preciso que, talvez, embora, para que</b>, et après « não acho que ».',
    formation: `Partir du « eu » du présent, enlever le -o, et « inverser » la voyelle : <b>-AR → e</b> (fal<b>e</b>), <b>-ER / -IR → a</b> (com<b>a</b>, faç<b>a</b>).<br>Irréguliers : seja, esteja, vá, saiba, queira, dê, haja.`,
    tip: 'Mêmes déclencheurs qu\'en français : « je veux que tu VIENNES » → « quero que VENHAS ».',
    examples: [['Espero que gostes.', 'J\'espère que ça te plaira.'], ['Talvez chova.', 'Il va peut-être pleuvoir.'], ['É preciso que saias cedo.', 'Il faut que tu partes tôt.']],
    lessons: ['pt_b2_1_1', 'pt_b2_1_2'],
  },
  {
    id: 'imperativo', level: 'A2', name: 'Imperativo (impératif)', short: 'Imperativo',
    persons: ['tu', 'você / o senhor', 'nós', 'vocês'],
    forms: vb => [vb.impT || sp(vb.pr)[2], sp(vb.cj)[2], sp(vb.cj)[3], sp(vb.cj)[4]],
    usage: 'Donner un ordre, une indication, un conseil : <b>Vire</b> à esquerda. <b>Liga</b>-me!',
    formation: `<b>tu</b> = 3e personne du présent (fala, come, faz) · <b>você / o senhor, nós, vocês</b> = formes du subjonctif (fale, falemos, falem).<br>Exception : ser → <b>sê</b>.`,
    tip: 'Pour vouvoyer un inconnu (directions, restaurant), utilisez la forme « você / o senhor » : « Siga em frente », « Desculpe ».',
    examples: [['Siga em frente e vire à direita.', 'Allez tout droit et tournez à droite.'], ['Diz-me a verdade!', 'Dis-moi la vérité !'], ['Vamos embora!', 'Allons-y !']],
    lessons: ['pt_a2_2_1', 'pt_a2_2_3'],
  },
];

// ── Forme « régulière » attendue par la règle : sert à repérer les irréguliers (temps par temps,
// y compris les changements d'orthographe comme ficar → fiquei) et à proposer la faute typique
// dans les choix multiples (ex. « fazerei » au lieu de « farei »).
const END = {
  presente:    { ar: 'o as a amos am',      er: 'o es e emos em',      ir: 'o es e imos em' },
  perfeito:    { ar: 'ei aste ou ámos aram', er: 'i este eu emos eram', ir: 'i iste iu imos iram' },
  conjuntivo:  { ar: 'e es e emos em',      er: 'a as a amos am',      ir: 'a as a amos am' },
  imperfeito:  { ar: 'ava avas ava ávamos avam', er: 'ia ias ia íamos iam', ir: 'ia ias ia íamos iam' },
};
const regEnd = (vb, tid, pi) => stem(vb) + sp(END[tid][group(vb)])[pi];
function ruleForm(vb, tid, pi) {
  const actual = tenses.find(t => t.id === tid).forms(vb)[pi];
  if (tid === 'progressivo' || tid === 'futproximo') return actual;   // estar a / ir + infinitif : toujours réguliers
  if (vb.inf === 'pôr') return actual + '\u0000';                     // pôr : irrégulier à tous les autres temps
  if (!stem(vb) && END[tid]) return actual + '\u0000';                // ir : pas de radical, la règle n'a pas de sens
  if (END[tid]) return regEnd(vb, tid, pi);
  if (tid === 'futuro') return vb.inf + sp('ei ás á emos ão')[pi];
  if (tid === 'condicional') return vb.inf + sp('ia ias ia íamos iam')[pi];
  if (tid === 'imperativo') return pi === 0 ? regEnd(vb, 'presente', 2) : regEnd(vb, 'conjuntivo', [2, 3, 4][pi - 1]);
  return actual;
}

window.CJ.pt = {
  ruleForm,
  persons: P,
  personNote: '« você », « o senhor », « a senhora » se conjuguent comme « ele/ela » ; « vocês » comme « eles/elas ». « vós » n\'est plus utilisé.',
  verbs, tenses, irregulars: null,
  inputHint: 'Écrivez seulement la forme du verbe (ex. « fizemos », « estou a falar »). Attention aux accents.',
  pronounsToStrip: ['eu', 'tu', 'ele', 'ela', 'nós', 'eles', 'elas', 'você', 'vocês', 'o senhor', 'a senhora'],
};
})();
