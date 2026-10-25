// ════════════════════════════════════════
//  CONJUGAISON — ESPAGNOL (Espagne)
//  Présent, passé simple (indefinido) et subjonctif sont saisis à la main pour chaque verbe.
//  Imparfait, futur, conditionnel, participe, gérondif et impératif sont dérivés de l'infinitif,
//  avec les exceptions saisies explicitement.
// ════════════════════════════════════════
window.CJ = window.CJ || {};
(() => {

const P = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ustedes'];
const sp = s => s.split(' ');

const verbs = [];
// v(infinitif, traduction, { pr, pf, cj, [imp], [fut], [pp], [ger], [impT], [impN] }, irrégulier ?, top ?, exemples)
const v = (inf, fr, f, irr, top, examples) => verbs.push({ id: inf, inf, fr, ...f, irr, top, examples });

v('ser', 'être (identité, caractère)', { pr: 'soy eres es somos sois son', pf: 'fui fuiste fue fuimos fuisteis fueron', cj: 'sea seas sea seamos seáis sean', imp: 'era eras era éramos erais eran', impT: 'sé', ger: 'siendo' }, true, true,
  [['Soy francesa.', 'Je suis française.'], ['Fue una noche increíble.', 'Ce fut une soirée incroyable.'], ['Espero que seas feliz.', 'J\'espère que tu seras heureux.']]);
v('estar', 'être (état, lieu)', { pr: 'estoy estás está estamos estáis están', pf: 'estuve estuviste estuvo estuvimos estuvisteis estuvieron', cj: 'esté estés esté estemos estéis estén' }, true, true,
  [['Estoy cansada.', 'Je suis fatiguée.'], ['Estuve tres días en Madrid.', 'J\'ai passé trois jours à Madrid.'], ['Está lloviendo.', 'Il pleut.']]);
v('tener', 'avoir', { pr: 'tengo tienes tiene tenemos tenéis tienen', pf: 'tuve tuviste tuvo tuvimos tuvisteis tuvieron', cj: 'tenga tengas tenga tengamos tengáis tengan', fut: 'tendr', impT: 'ten' }, true, true,
  [['Tengo treinta años.', 'J\'ai trente ans.'], ['Tuve mucha suerte.', 'J\'ai eu beaucoup de chance.'], ['Tienes que venir.', 'Tu dois venir.']]);
v('ir', 'aller', { pr: 'voy vas va vamos vais van', pf: 'fui fuiste fue fuimos fuisteis fueron', cj: 'vaya vayas vaya vayamos vayáis vayan', imp: 'iba ibas iba íbamos ibais iban', ger: 'yendo', impT: 've', impN: 'vamos' }, true, true,
  [['Voy a la playa.', 'Je vais à la plage.'], ['Fuimos a Sevilla ayer.', 'Nous sommes allés à Séville hier.'], ['¿Vamos a cenar fuera?', 'On va dîner dehors ?']]);
v('hacer', 'faire', { pr: 'hago haces hace hacemos hacéis hacen', pf: 'hice hiciste hizo hicimos hicisteis hicieron', cj: 'haga hagas haga hagamos hagáis hagan', fut: 'har', pp: 'hecho', impT: 'haz' }, true, true,
  [['¿Qué haces?', 'Qu\'est-ce que tu fais ?'], ['Hice una excursión.', 'J\'ai fait une excursion.'], ['Hace mucho calor.', 'Il fait très chaud.']]);
v('poder', 'pouvoir', { pr: 'puedo puedes puede podemos podéis pueden', pf: 'pude pudiste pudo pudimos pudisteis pudieron', cj: 'pueda puedas pueda podamos podáis puedan', fut: 'podr', ger: 'pudiendo' }, true, true,
  [['¿Puedo pagar con tarjeta?', 'Je peux payer par carte ?'], ['No pude ir.', 'Je n\'ai pas pu y aller.'], ['¿Podría ayudarme?', 'Pourriez-vous m\'aider ?']]);
v('querer', 'vouloir, aimer (qqn)', { pr: 'quiero quieres quiere queremos queréis quieren', pf: 'quise quisiste quiso quisimos quisisteis quisieron', cj: 'quiera quieras quiera queramos queráis quieran', fut: 'querr' }, true, true,
  [['¿Quieres un café?', 'Tu veux un café ?'], ['No quise molestar.', 'Je n\'ai pas voulu déranger.'], ['Te quiero.', 'Je t\'aime.']]);
v('decir', 'dire', { pr: 'digo dices dice decimos decís dicen', pf: 'dije dijiste dijo dijimos dijisteis dijeron', cj: 'diga digas diga digamos digáis digan', fut: 'dir', pp: 'dicho', ger: 'diciendo', impT: 'di' }, true, true,
  [['¿Cómo se dice esto en español?', 'Comment dit-on ça en espagnol ?'], ['Dijo que venía.', 'Il a dit qu\'il venait.'], ['¡Dígame!', 'Dites-moi ! / Allô ?']]);
v('ver', 'voir', { pr: 'veo ves ve vemos veis ven', pf: 'vi viste vio vimos visteis vieron', cj: 'vea veas vea veamos veáis vean', imp: 'veía veías veía veíamos veíais veían', pp: 'visto' }, true, true,
  [['¿Ves el mar desde aquí?', 'Tu vois la mer d\'ici ?'], ['¡Vimos ballenas!', 'Nous avons vu des baleines !'], ['Nunca había visto nada igual.', 'Je n\'avais jamais rien vu de tel.']]);
v('dar', 'donner', { pr: 'doy das da damos dais dan', pf: 'di diste dio dimos disteis dieron', cj: 'dé des dé demos deis den' }, true, true,
  [['Dame la mano.', 'Donne-moi la main.'], ['Me dio un regalo.', 'Elle m\'a donné un cadeau.'], ['Me da igual.', 'Ça m\'est égal.']]);
v('saber', 'savoir', { pr: 'sé sabes sabe sabemos sabéis saben', pf: 'supe supiste supo supimos supisteis supieron', cj: 'sepa sepas sepa sepamos sepáis sepan', fut: 'sabr' }, true, false,
  [['No lo sé.', 'Je ne sais pas.'], ['Supe la noticia ayer.', 'J\'ai appris la nouvelle hier.'], ['¿Sabes nadar?', 'Tu sais nager ?']]);
v('venir', 'venir', { pr: 'vengo vienes viene venimos venís vienen', pf: 'vine viniste vino vinimos vinisteis vinieron', cj: 'venga vengas venga vengamos vengáis vengan', fut: 'vendr', ger: 'viniendo', impT: 'ven' }, true, false,
  [['¿Vienes a cenar?', 'Tu viens dîner ?'], ['Vinieron en tren.', 'Ils sont venus en train.'], ['Cuando vengas, llámame.', 'Quand tu viendras, appelle-moi.']]);
v('poner', 'mettre', { pr: 'pongo pones pone ponemos ponéis ponen', pf: 'puse pusiste puso pusimos pusisteis pusieron', cj: 'ponga pongas ponga pongamos pongáis pongan', fut: 'pondr', pp: 'puesto', impT: 'pon' }, true, false,
  [['¿Me pones una caña?', 'Tu me sers une bière ?'], ['¿Dónde pusiste las llaves?', 'Où as-tu mis les clés ?'], ['Ponte el abrigo.', 'Mets ton manteau.']]);
v('salir', 'sortir, partir', { pr: 'salgo sales sale salimos salís salen', pf: 'salí saliste salió salimos salisteis salieron', cj: 'salga salgas salga salgamos salgáis salgan', fut: 'saldr', impT: 'sal' }, true, false,
  [['¿A qué hora sales del trabajo?', 'À quelle heure sors-tu du travail ?'], ['Salimos tarde.', 'Nous sommes sortis tard.'], ['Todo salió bien.', 'Tout s\'est bien passé.']]);
v('traer', 'apporter', { pr: 'traigo traes trae traemos traéis traen', pf: 'traje trajiste trajo trajimos trajisteis trajeron', cj: 'traiga traigas traiga traigamos traigáis traigan', pp: 'traído', ger: 'trayendo' }, true, false,
  [['¿Nos trae la carta?', 'Vous nous apportez la carte ?'], ['Traje vino.', 'J\'ai apporté du vin.'], ['Trae el paraguas.', 'Prends le parapluie.']]);
v('conocer', 'connaître', { pr: 'conozco conoces conoce conocemos conocéis conocen', pf: 'conocí conociste conoció conocimos conocisteis conocieron', cj: 'conozca conozcas conozca conozcamos conozcáis conozcan' }, true, false,
  [['¿Conoces Barcelona?', 'Tu connais Barcelone ?'], ['Nos conocimos en 2015.', 'Nous nous sommes rencontrés en 2015.'], ['Quiero que conozcas a mi familia.', 'Je veux que tu connaisses ma famille.']]);
v('pensar', 'penser', { pr: 'pienso piensas piensa pensamos pensáis piensan', pf: 'pensé pensaste pensó pensamos pensasteis pensaron', cj: 'piense pienses piense pensemos penséis piensen' }, true, false,
  [['¿Qué piensas?', 'Qu\'en penses-tu ?'], ['Pensé en ti.', 'J\'ai pensé à toi.'], ['Pienso que sí.', 'Je pense que oui.']]);
v('volver', 'revenir, rentrer', { pr: 'vuelvo vuelves vuelve volvemos volvéis vuelven', pf: 'volví volviste volvió volvimos volvisteis volvieron', cj: 'vuelva vuelvas vuelva volvamos volváis vuelvan', pp: 'vuelto' }, true, false,
  [['Vuelvo enseguida.', 'Je reviens tout de suite.'], ['Volvimos a casa tarde.', 'Nous sommes rentrés tard.'], ['Ha vuelto a llover.', 'Il s\'est remis à pleuvoir.']]);
v('dormir', 'dormir', { pr: 'duermo duermes duerme dormimos dormís duermen', pf: 'dormí dormiste durmió dormimos dormisteis durmieron', cj: 'duerma duermas duerma durmamos durmáis duerman', ger: 'durmiendo' }, true, false,
  [['Duermo mal con calor.', 'Je dors mal quand il fait chaud.'], ['¿Dormiste bien?', 'Tu as bien dormi ?'], ['Los niños están durmiendo.', 'Les enfants dorment.']]);
v('pedir', 'demander (qqch), commander', { pr: 'pido pides pide pedimos pedís piden', pf: 'pedí pediste pidió pedimos pedisteis pidieron', cj: 'pida pidas pida pidamos pidáis pidan', ger: 'pidiendo' }, true, false,
  [['Pido perdón.', 'Je demande pardon.'], ['Pedimos el menú del día.', 'Nous avons commandé le menu du jour.'], ['Pide la cuenta.', 'Demande l\'addition.']]);
v('empezar', 'commencer', { pr: 'empiezo empiezas empieza empezamos empezáis empiezan', pf: 'empecé empezaste empezó empezamos empezasteis empezaron', cj: 'empiece empieces empiece empecemos empecéis empiecen' }, true, false,
  [['La película empieza a las nueve.', 'Le film commence à neuf heures.'], ['Empecé a estudiar español.', 'J\'ai commencé à étudier l\'espagnol.'], ['Empieza por aquí.', 'Commence par ici.']]);
v('jugar', 'jouer', { pr: 'juego juegas juega jugamos jugáis juegan', pf: 'jugué jugaste jugó jugamos jugasteis jugaron', cj: 'juegue juegues juegue juguemos juguéis jueguen' }, true, false,
  [['Los niños juegan en el parque.', 'Les enfants jouent au parc.'], ['Jugué al tenis ayer.', 'J\'ai joué au tennis hier.'], ['¿Jugamos a las cartas?', 'On joue aux cartes ?']]);
v('entender', 'comprendre', { pr: 'entiendo entiendes entiende entendemos entendéis entienden', pf: 'entendí entendiste entendió entendimos entendisteis entendieron', cj: 'entienda entiendas entienda entendamos entendáis entiendan' }, true, false,
  [['No entiendo.', 'Je ne comprends pas.'], ['¿Lo has entendido?', 'Tu as compris ?'], ['Espero que me entiendas.', 'J\'espère que tu me comprends.']]);
v('leer', 'lire', { pr: 'leo lees lee leemos leéis leen', pf: 'leí leíste leyó leímos leísteis leyeron', cj: 'lea leas lea leamos leáis lean', pp: 'leído', ger: 'leyendo' }, true, false,
  [['Leo el periódico cada mañana.', 'Je lis le journal chaque matin.'], ['¿Ya has leído este libro?', 'Tu as déjà lu ce livre ?'], ['Lea con atención.', 'Lisez attentivement.']]);
v('hablar', 'parler', { pr: 'hablo hablas habla hablamos habláis hablan', pf: 'hablé hablaste habló hablamos hablasteis hablaron', cj: 'hable hables hable hablemos habléis hablen' }, false, true,
  [['¿Habla francés?', 'Vous parlez français ?'], ['Hablamos durante horas.', 'Nous avons parlé pendant des heures.'], ['Hable más despacio, por favor.', 'Parlez plus lentement, s\'il vous plaît.']]);
v('comer', 'manger, déjeuner', { pr: 'como comes come comemos coméis comen', pf: 'comí comiste comió comimos comisteis comieron', cj: 'coma comas coma comamos comáis coman' }, false, true,
  [['Comemos a las dos.', 'Nous déjeunons à 14 h.'], ['Comí paella.', 'J\'ai mangé de la paella.'], ['¡Que aproveche!', 'Bon appétit !']]);
v('vivir', 'vivre, habiter', { pr: 'vivo vives vive vivimos vivís viven', pf: 'viví viviste vivió vivimos vivisteis vivieron', cj: 'viva vivas viva vivamos viváis vivan' }, false, true,
  [['Vivo en Sète.', 'Je vis à Sète.'], ['Vivimos dos años en Madrid.', 'Nous avons vécu deux ans à Madrid.'], ['¡Viva España!', 'Vive l\'Espagne !']]);
v('trabajar', 'travailler', { pr: 'trabajo trabajas trabaja trabajamos trabajáis trabajan', pf: 'trabajé trabajaste trabajó trabajamos trabajasteis trabajaron', cj: 'trabaje trabajes trabaje trabajemos trabajéis trabajen' }, false, false,
  [['Trabajo en un restaurante.', 'Je travaille dans un restaurant.'], ['Trabajé hasta tarde.', 'J\'ai travaillé tard.'], ['Llevo diez años trabajando aquí.', 'Je travaille ici depuis dix ans.']]);
v('tomar', 'prendre, boire', { pr: 'tomo tomas toma tomamos tomáis toman', pf: 'tomé tomaste tomó tomamos tomasteis tomaron', cj: 'tome tomes tome tomemos toméis tomen' }, false, false,
  [['¿Qué vas a tomar?', 'Qu\'est-ce que tu prends ?'], ['Tomamos un café en la plaza.', 'Nous avons pris un café sur la place.'], ['Tome una pastilla cada ocho horas.', 'Prenez un comprimé toutes les huit heures.']]);
v('beber', 'boire', { pr: 'bebo bebes bebe bebemos bebéis beben', pf: 'bebí bebiste bebió bebimos bebisteis bebieron', cj: 'beba bebas beba bebamos bebáis beban' }, false, false,
  [['¿Qué bebes?', 'Qu\'est-ce que tu bois ?'], ['Bebimos vino de Rioja.', 'Nous avons bu du vin de Rioja.'], ['Beba mucha agua.', 'Buvez beaucoup d\'eau.']]);
v('comprar', 'acheter', { pr: 'compro compras compra compramos compráis compran', pf: 'compré compraste compró compramos comprasteis compraron', cj: 'compre compres compre compremos compréis compren' }, false, false,
  [['Compro el pan aquí.', 'J\'achète le pain ici.'], ['Compré un regalo.', 'J\'ai acheté un cadeau.'], ['Vamos a comprar fruta.', 'Nous allons acheter des fruits.']]);
v('necesitar', 'avoir besoin de', { pr: 'necesito necesitas necesita necesitamos necesitáis necesitan', pf: 'necesité necesitaste necesitó necesitamos necesitasteis necesitaron', cj: 'necesite necesites necesite necesitemos necesitéis necesiten' }, false, false,
  [['Necesito ayuda.', 'J\'ai besoin d\'aide.'], ['Necesité un taxi.', 'J\'ai eu besoin d\'un taxi.'], ['¿Necesita algo?', 'Vous avez besoin de quelque chose ?']]);
v('viajar', 'voyager', { pr: 'viajo viajas viaja viajamos viajáis viajan', pf: 'viajé viajaste viajó viajamos viajasteis viajaron', cj: 'viaje viajes viaje viajemos viajéis viajen' }, false, false,
  [['Me encanta viajar.', 'J\'adore voyager.'], ['Viajamos por Andalucía.', 'Nous avons voyagé en Andalousie.'], ['Viajaremos en tren.', 'Nous voyagerons en train.']]);
v('llegar', 'arriver', { pr: 'llego llegas llega llegamos llegáis llegan', pf: 'llegué llegaste llegó llegamos llegasteis llegaron', cj: 'llegue llegues llegue lleguemos lleguéis lleguen' }, false, false,
  [['¿A qué hora llega el vuelo?', 'À quelle heure arrive le vol ?'], ['Llegué tarde.', 'Je suis arrivé en retard.'], ['Cuando llegues, avisa.', 'Quand tu arrives, préviens.']]);
v('pagar', 'payer', { pr: 'pago pagas paga pagamos pagáis pagan', pf: 'pagué pagaste pagó pagamos pagasteis pagaron', cj: 'pague pagues pague paguemos paguéis paguen' }, false, false,
  [['¿Puedo pagar con tarjeta?', 'Je peux payer par carte ?'], ['Ya pagué.', 'J\'ai déjà payé.'], ['Pague en caja.', 'Payez à la caisse.']]);
v('buscar', 'chercher', { pr: 'busco buscas busca buscamos buscáis buscan', pf: 'busqué buscaste buscó buscamos buscasteis buscaron', cj: 'busque busques busque busquemos busquéis busquen' }, false, false,
  [['Busco la estación.', 'Je cherche la gare.'], ['Busqué por todas partes.', 'J\'ai cherché partout.'], ['Se busca camarero.', 'On recherche un serveur.']]);
v('escribir', 'écrire', { pr: 'escribo escribes escribe escribimos escribís escriben', pf: 'escribí escribiste escribió escribimos escribisteis escribieron', cj: 'escriba escribas escriba escribamos escribáis escriban', pp: 'escrito' }, false, false,
  [['Escribo un correo.', 'J\'écris un e-mail.'], ['¿Le has escrito?', 'Tu lui as écrit ?'], ['Escríbeme pronto.', 'Écris-moi vite.']]);
v('abrir', 'ouvrir', { pr: 'abro abres abre abrimos abrís abren', pf: 'abrí abriste abrió abrimos abristeis abrieron', cj: 'abra abras abra abramos abráis abran', pp: 'abierto' }, false, false,
  [['¿A qué hora abre el museo?', 'À quelle heure ouvre le musée ?'], ['La tienda está abierta.', 'Le magasin est ouvert.'], ['Abre la ventana, por favor.', 'Ouvre la fenêtre, s\'il te plaît.']]);

// ── Dérivations ──
const group = vb => vb.inf.slice(-2);
const stem = vb => vb.inf.slice(0, -2);
const IMPF = { ar: 'aba abas aba ábamos abais aban', er: 'ía ías ía íamos íais ían', ir: 'ía ías ía íamos íais ían' };
const imperfecto = vb => vb.imp ? sp(vb.imp) : sp(IMPF[group(vb)]).map(e => stem(vb) + e);
const futStem = vb => vb.fut || vb.inf;
const futuro = vb => sp('é ás á emos éis án').map(e => futStem(vb) + e);
const condicional = vb => sp('ía ías ía íamos íais ían').map(e => futStem(vb) + e);
const regPart = vb => stem(vb) + (group(vb) === 'ar' ? 'ado' : 'ido');
const regGer = vb => stem(vb) + (group(vb) === 'ar' ? 'ando' : 'iendo');
const HABER = sp('he has ha hemos habéis han');
const ESTAR = sp('estoy estás está estamos estáis están');
const IR = sp('voy vas va vamos vais van');
verbs.forEach(vb => { vb.part = vb.pp || regPart(vb); vb.gerund = vb.ger || regGer(vb); });

const tenses = [
  {
    id: 'presente', level: 'A1', name: 'Presente (présent)', short: 'Presente',
    forms: vb => sp(vb.pr),
    usage: 'Les habitudes et les faits : <b>Trabajo</b> en un hotel. Aussi le futur proche à l\'oral : <b>Mañana voy</b> a Madrid.',
    formation: `<b>-AR</b> : o, as, a, amos, áis, an · <b>-ER</b> : o, es, e, emos, éis, en · <b>-IR</b> : o, es, e, imos, ís, en.<br>Beaucoup de verbes courants changent de voyelle (sauf nosotros / vosotros) : qu<b>ie</b>ro, p<b>ue</b>do, d<b>ue</b>rmo, p<b>i</b>do. D'autres sont irréguliers à la 1re personne : ha<b>go</b>, sal<b>go</b>, ten<b>go</b>, cono<b>zco</b>.`,
    tip: '« usted » et « ustedes » se conjuguent comme « él » et « ellos » : (Usted) habla francés.',
    examples: [['Vivo en Sevilla.', 'J\'habite à Séville.'], ['¿Hablas inglés?', 'Tu parles anglais ?'], ['No entiendo.', 'Je ne comprends pas.']],
    lessons: ['es_a1_1_2', 'es_a1_2_1', 'es_a1_4_1', 'es_a1_4_2'],
  },
  {
    id: 'progresivo', level: 'A2', name: 'Estar + gérondif (action en cours)', short: 'Estar + -ando',
    forms: vb => ESTAR.map(e => `${e} ${vb.gerund}`),
    usage: 'Ce qui se passe <b>en ce moment</b> : <b>Estoy trabajando</b> (je suis en train de travailler).',
    formation: `<b>estar</b> + gérondif : -AR → <b>-ando</b> (hablando), -ER / -IR → <b>-iendo</b> (comiendo, viviendo).<br>Irréguliers : leyendo, durmiendo, pidiendo, diciendo, viniendo, yendo.`,
    tip: 'On ne l\'utilise que pour une action en cours, pas pour le futur : « Mañana salgo » (et non « estoy saliendo mañana »).',
    examples: [['Está lloviendo.', 'Il pleut.'], ['¿Qué estás haciendo?', 'Qu\'est-ce que tu fais ?'], ['Estamos cenando.', 'Nous sommes en train de dîner.']],
    lessons: ['es_a2_4_1'],
  },
  {
    id: 'perfecto', level: 'A2', name: 'Pretérito perfecto (passé composé)', short: 'Perfecto',
    forms: vb => HABER.map(h => `${h} ${vb.part}`),
    usage: 'En Espagne : un passé <b>récent</b> ou une période pas terminée (<b>hoy, esta mañana, esta semana, ya, nunca</b>) : <b>Hoy he comido</b> paella.',
    formation: `<b>haber</b> (he, has, ha, hemos, habéis, han) + participe (-ado / -ido).<br>Participes irréguliers : hecho, dicho, visto, puesto, vuelto, escrito, abierto, roto.`,
    tip: 'Le participe ne s\'accorde jamais : « Ella ha llegado ». Et rien ne s\'intercale : « Ya he comido ».',
    examples: [['Esta mañana he ido al mercado.', 'Ce matin je suis allé au marché.'], ['¿Has estado en Granada?', 'Tu es déjà allé à Grenade ?'], ['Todavía no hemos comido.', 'Nous n\'avons pas encore mangé.']],
    lessons: ['es_a2_3_1', 'es_b1_2_3'],
  },
  {
    id: 'indefinido', level: 'A2', name: 'Pretérito indefinido (passé simple)', short: 'Indefinido',
    forms: vb => sp(vb.pf),
    usage: 'Une action <b>terminée</b> à un moment <b>daté</b> : <b>ayer, anoche, el año pasado, en 2019, hace dos días</b>. <b>Ayer comí</b> paella.',
    formation: `<b>-AR</b> : é, aste, ó, amos, asteis, aron · <b>-ER / -IR</b> : í, iste, ió, imos, isteis, ieron.<br>Irréguliers : fui (ser / ir), estuve, tuve, hice, pude, puse, vine, dije, quise, supe — sans accent.`,
    tip: 'Les accents changent tout : « hablo » (je parle) ≠ « habló » (il a parlé).',
    examples: [['Ayer cené con mis amigos.', 'Hier j\'ai dîné avec mes amis.'], ['¿Qué hiciste el sábado?', 'Qu\'as-tu fait samedi ?'], ['Fuimos a la playa.', 'Nous sommes allés à la plage.']],
    lessons: ['es_a2_3_2', 'es_a2_3_3', 'es_b1_2_2'],
  },
  {
    id: 'ira', level: 'A2', name: 'Futur proche (ir a + infinitif)', short: 'Ir a + inf.',
    forms: vb => IR.map(e => `${e} a ${vb.inf}`),
    usage: 'Le futur <b>de la vie courante</b> : <b>Voy a llamar</b> mañana. C\'est le plus utilisé à l\'oral.',
    formation: `<b>ir</b> (voy, vas, va, vamos, vais, van) <b>+ a + infinitif</b>.`,
    tip: 'N\'oubliez pas le « a » : « Voy a comer », jamais « Voy comer ».',
    examples: [['Vamos a cenar fuera.', 'Nous allons dîner dehors.'], ['¿Qué vas a hacer?', 'Que vas-tu faire ?'], ['Va a llover.', 'Il va pleuvoir.']],
    lessons: ['es_a2_4_2'],
  },
  {
    id: 'imperfecto', level: 'B1', name: 'Pretérito imperfecto (imparfait)', short: 'Imperfecto',
    forms: imperfecto,
    usage: 'Le <b>décor</b>, les <b>habitudes passées</b>, une action <b>en cours</b> dans le passé — comme l\'imparfait français.',
    formation: `<b>-AR</b> : aba, abas, aba, ábamos, abais, aban · <b>-ER / -IR</b> : ía, ías, ía, íamos, íais, ían.<br>Seulement 3 irréguliers : ser → <b>era</b>, ir → <b>iba</b>, ver → <b>veía</b>.`,
    tip: 'C\'est le temps le plus régulier de l\'espagnol, et il s\'emploie presque exactement comme en français.',
    examples: [['Cuando era pequeño, vivía en el campo.', 'Quand j\'étais petit, je vivais à la campagne.'], ['Llovía mucho.', 'Il pleuvait beaucoup.'], ['Íbamos a la playa cada verano.', 'Nous allions à la plage chaque été.']],
    lessons: ['es_b1_2_1', 'es_b1_2_2'],
  },
  {
    id: 'futuro', level: 'B1', name: 'Futuro simple (futur)', short: 'Futuro',
    forms: futuro,
    usage: 'Promesses, prévisions, hypothèses : <b>Te llamaré</b> mañana. <b>Será</b> un virus (ce doit être un virus).',
    formation: `Infinitif + <b>é, ás, á, emos, éis, án</b>.<br>Irréguliers : tendré, podré, haré, diré, saldré, vendré, sabré, pondré, querré.`,
    tip: 'Jamais de futur après « cuando » : « Cuando llegues » (subjonctif), pas « cuando llegarás ».',
    examples: [['Mañana hablaremos de eso.', 'Demain nous en parlerons.'], ['Haré lo posible.', 'Je ferai mon possible.'], ['¿Dónde estará?', 'Où peut-il bien être ?']],
    lessons: ['es_b1_3_3'],
  },
  {
    id: 'condicional', level: 'B2', name: 'Condicional (conditionnel)', short: 'Condicional',
    forms: condicional,
    usage: 'Hypothèses et politesse : <b>Me gustaría</b> reservar una mesa. Si tuviera tiempo, <b>viajaría</b>.',
    formation: `Infinitif + <b>ía, ías, ía, íamos, íais, ían</b> (mêmes irréguliers que le futur : tendría, haría, diría, podría).`,
    tip: 'Jamais de conditionnel après « si » : « Si tuviera dinero », pas « si tendría ».',
    examples: [['Me gustaría una mesa para dos.', 'J\'aimerais une table pour deux.'], ['¿Qué harías?', 'Que ferais-tu ?'], ['Sería genial.', 'Ce serait génial.']],
    lessons: ['es_b2_1_3'],
  },
  {
    id: 'subjuntivo', level: 'B2', name: 'Presente de subjuntivo (subjonctif)', short: 'Subjuntivo',
    forms: vb => sp(vb.cj),
    usage: 'Après <b>espero que, quiero que, es importante que, ojalá, aunque, para que</b>, après « no creo que », et après <b>cuando</b> pour le futur.',
    formation: `Partir du « yo » du présent, enlever le -o, et « inverser » la voyelle : <b>-AR → e</b> (hable), <b>-ER / -IR → a</b> (coma, haga, tenga).<br>Irréguliers : sea, esté, vaya, sepa, haya, dé.`,
    tip: 'Mêmes déclencheurs qu\'en français (je veux que tu VIENNES → quiero que VENGAS), plus « cuando » + futur : « Cuando VENGAS ».',
    examples: [['Espero que te guste.', 'J\'espère que ça te plaira.'], ['¡Ojalá haga sol!', 'Pourvu qu\'il fasse beau !'], ['Cuando llegues, llámame.', 'Quand tu arriveras, appelle-moi.']],
    lessons: ['es_b2_1_1', 'es_b2_1_2', 'es_b2_2_3'],
  },
  {
    id: 'imperativo', level: 'A2', name: 'Imperativo (impératif)', short: 'Imperativo',
    persons: ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'],
    forms: vb => [vb.impT || sp(vb.pr)[2], sp(vb.cj)[2], vb.impN || sp(vb.cj)[3], vb.inf.slice(0, -1) + 'd', sp(vb.cj)[5]],
    usage: 'Donner un ordre, une indication, un conseil : <b>Gire</b> a la izquierda. <b>Ven</b> aquí. <b>Llámame</b>.',
    formation: `<b>tú</b> = 3e personne du présent (habla, come) · <b>vosotros</b> = infinitif – r + <b>d</b> (hablad, comed) · <b>usted, nosotros, ustedes</b> = formes du subjonctif (hable, hablemos, hablen).<br>Irréguliers à « tú » : di, haz, ve, pon, sal, sé, ten, ven.`,
    tip: 'Les pronoms se collent à la fin de l\'impératif affirmatif : « Dígame », « Llámame », « Siéntese ».',
    examples: [['Siga recto y gire a la derecha.', 'Continuez tout droit et tournez à droite.'], ['¡Dime la verdad!', 'Dis-moi la vérité !'], ['¡Vamos!', 'Allons-y !']],
    lessons: ['es_a2_2_1', 'es_a2_2_3'],
  },
];

// ── Forme « régulière » attendue par la règle (repère les irréguliers et propose la faute typique) ──
const END = {
  presente:   { ar: 'o as a amos áis an', er: 'o es e emos éis en', ir: 'o es e imos ís en' },
  indefinido: { ar: 'é aste ó amos asteis aron', er: 'í iste ió imos isteis ieron', ir: 'í iste ió imos isteis ieron' },
  subjuntivo: { ar: 'e es e emos éis en', er: 'a as a amos áis an', ir: 'a as a amos áis an' },
  imperfecto: IMPF,
};
const regEnd = (vb, tid, pi) => stem(vb) + sp(END[tid][group(vb)])[pi];
function ruleForm(vb, tid, pi) {
  const actual = tenses.find(t => t.id === tid).forms(vb)[pi];
  if (tid === 'ira') return actual;                                         // ir a + infinitif : toujours régulier
  if (!stem(vb)) return actual + '\u0000';                                  // ir : pas de radical, toujours irrégulier
  if (END[tid]) return regEnd(vb, tid, pi);
  if (tid === 'futuro') return vb.inf + sp('é ás á emos éis án')[pi];
  if (tid === 'condicional') return vb.inf + sp('ía ías ía íamos íais ían')[pi];
  if (tid === 'perfecto') return `${HABER[pi]} ${regPart(vb)}`;
  if (tid === 'progresivo') return `${ESTAR[pi]} ${regGer(vb)}`;
  if (tid === 'imperativo') return [regEnd(vb, 'presente', 2), regEnd(vb, 'subjuntivo', 2), regEnd(vb, 'subjuntivo', 3), vb.inf.slice(0, -1) + 'd', regEnd(vb, 'subjuntivo', 5)][pi];
  return actual;
}

window.CJ.es = {
  ruleForm,
  persons: P,
  personNote: '« usted » se conjugue comme « él / ella », « ustedes » comme « ellos / ellas ». En Espagne, « vosotros » = vous (plusieurs personnes que l\'on tutoie).',
  verbs, tenses, irregulars: null,
  inputHint: 'Écrivez seulement la forme du verbe (ex. « hicimos », « estoy hablando »). Attention aux accents.',
  pronounsToStrip: ['yo', 'tú', 'tu', 'él', 'el', 'ella', 'usted', 'nosotros', 'nosotras', 'vosotros', 'vosotras', 'ellos', 'ellas', 'ustedes'],
};
})();
