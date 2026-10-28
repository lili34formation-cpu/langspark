// ════════════════════════════════════════
//  VOCABULAIRE ESSENTIEL — listes thématiques (anglais, portugais du Portugal, espagnol d'Espagne)
//  Chaque mot : [langue cible, français]. « a / b » = variantes (masculin / féminin).
//  Les noms portugais et espagnols sont donnés avec leur article pour apprendre le genre.
// ════════════════════════════════════════
window.VOC = {};
(() => {
const theme = (id, icon, title, words, tip = '') => ({ id, icon, title, words, tip });

window.VOC.en = { themes: [
  theme('jours', '📅', 'Jours de la semaine', [
    ['Monday', 'lundi'], ['Tuesday', 'mardi'], ['Wednesday', 'mercredi'], ['Thursday', 'jeudi'],
    ['Friday', 'vendredi'], ['Saturday', 'samedi'], ['Sunday', 'dimanche'],
  ], 'En anglais, les jours prennent toujours une majuscule. « Wednesday » se prononce « Wenzdei ».'),
  theme('mois', '🗓️', 'Mois et saisons', [
    ['January', 'janvier'], ['February', 'février'], ['March', 'mars'], ['April', 'avril'],
    ['May', 'mai'], ['June', 'juin'], ['July', 'juillet'], ['August', 'août'],
    ['September', 'septembre'], ['October', 'octobre'], ['November', 'novembre'], ['December', 'décembre'],
    ['spring', 'le printemps'], ['summer', 'l\'été'], ['autumn', 'l\'automne'], ['winter', 'l\'hiver'],
  ], 'Les mois prennent une majuscule, pas les saisons. « Autumn » (UK) se dit « fall » aux États-Unis.'),
  theme('couleurs', '🎨', 'Couleurs', [
    ['red', 'rouge'], ['blue', 'bleu'], ['green', 'vert'], ['yellow', 'jaune'],
    ['orange', 'orange'], ['pink', 'rose'], ['purple', 'violet'], ['white', 'blanc'],
    ['black', 'noir'], ['grey', 'gris'], ['brown', 'marron'],
  ], 'Les couleurs sont invariables et se placent avant le nom : « a red car », « red cars ».'),
  theme('corps', '🧍', 'Parties du corps', [
    ['head', 'la tête'], ['hair', 'les cheveux'], ['face', 'le visage'], ['eye', 'l\'œil'],
    ['ear', 'l\'oreille'], ['nose', 'le nez'], ['mouth', 'la bouche'], ['teeth', 'les dents'],
    ['neck', 'le cou'], ['shoulder', 'l\'épaule'], ['arm', 'le bras'], ['hand', 'la main'],
    ['finger', 'le doigt'], ['back', 'le dos'], ['chest', 'la poitrine'], ['stomach', 'le ventre'],
    ['leg', 'la jambe'], ['knee', 'le genou'], ['foot', 'le pied'], ['feet', 'les pieds'],
  ], '« hair » (les cheveux) est singulier : « My hair is long ». Pluriels irréguliers : tooth → teeth, foot → feet.'),
  theme('nombres', '🔢', 'Nombres', [
    ['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'],
    ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'], ['ten', '10'],
    ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'], ['fourteen', '14'], ['fifteen', '15'],
    ['sixteen', '16'], ['seventeen', '17'], ['eighteen', '18'], ['nineteen', '19'], ['twenty', '20'],
    ['thirty', '30'], ['forty', '40'], ['fifty', '50'], ['sixty', '60'], ['seventy', '70'],
    ['eighty', '80'], ['ninety', '90'], ['one hundred', '100'], ['one thousand', '1000'],
  ], 'Attention à l\'accent : thirTEEN (13) / THIRty (30). « forty » s\'écrit sans u.'),
]};

window.VOC.pt = { themes: [
  theme('jours', '📅', 'Jours de la semaine', [
    ['segunda-feira', 'lundi'], ['terça-feira', 'mardi'], ['quarta-feira', 'mercredi'], ['quinta-feira', 'jeudi'],
    ['sexta-feira', 'vendredi'], ['sábado', 'samedi'], ['domingo', 'dimanche'],
  ], 'Les jours se comptent : segunda = 2e jour (dimanche est le 1er). À l\'oral, on dit souvent juste « segunda », « terça »…'),
  theme('mois', '🗓️', 'Mois et saisons', [
    ['janeiro', 'janvier'], ['fevereiro', 'février'], ['março', 'mars'], ['abril', 'avril'],
    ['maio', 'mai'], ['junho', 'juin'], ['julho', 'juillet'], ['agosto', 'août'],
    ['setembro', 'septembre'], ['outubro', 'octobre'], ['novembro', 'novembre'], ['dezembro', 'décembre'],
    ['a primavera', 'le printemps'], ['o verão', 'l\'été'], ['o outono', 'l\'automne'], ['o inverno', 'l\'hiver'],
  ], 'Mois et saisons s\'écrivent en minuscule. « em maio » (en mai), « no verão » (en été).'),
  theme('couleurs', '🎨', 'Couleurs', [
    ['vermelho / vermelha', 'rouge'], ['azul', 'bleu'], ['verde', 'vert'], ['amarelo / amarela', 'jaune'],
    ['cor de laranja', 'orange'], ['cor-de-rosa', 'rose'], ['roxo / roxa', 'violet'], ['branco / branca', 'blanc'],
    ['preto / preta', 'noir'], ['cinzento / cinzenta', 'gris'], ['castanho / castanha', 'marron'],
  ], 'Au Portugal : « castanho » (marron) et « cinzento » (gris) — « marrom » et « cinza » sont brésiliens. Les couleurs en -o s\'accordent : uma camisa branca.'),
  theme('corps', '🧍', 'Parties du corps', [
    ['a cabeça', 'la tête'], ['o cabelo', 'les cheveux'], ['a cara', 'le visage'], ['o olho', 'l\'œil'],
    ['a orelha', 'l\'oreille'], ['o nariz', 'le nez'], ['a boca', 'la bouche'], ['os dentes', 'les dents'],
    ['o pescoço', 'le cou'], ['o ombro', 'l\'épaule'], ['o braço', 'le bras'], ['a mão', 'la main'],
    ['o dedo', 'le doigt'], ['as costas', 'le dos'], ['o peito', 'la poitrine'], ['a barriga', 'le ventre'],
    ['a perna', 'la jambe'], ['o joelho', 'le genou'], ['o pé', 'le pied'], ['os pés', 'les pieds'],
  ], '« as costas » (le dos) est pluriel : « Doem-me as costas ». Et « o cabelo » (les cheveux) est singulier.'),
  theme('nombres', '🔢', 'Nombres', [
    ['zero', '0'], ['um / uma', '1'], ['dois / duas', '2'], ['três', '3'], ['quatro', '4'], ['cinco', '5'],
    ['seis', '6'], ['sete', '7'], ['oito', '8'], ['nove', '9'], ['dez', '10'],
    ['onze', '11'], ['doze', '12'], ['treze', '13'], ['catorze', '14'], ['quinze', '15'],
    ['dezasseis', '16'], ['dezassete', '17'], ['dezoito', '18'], ['dezanove', '19'], ['vinte', '20'],
    ['trinta', '30'], ['quarenta', '40'], ['cinquenta', '50'], ['sessenta', '60'], ['setenta', '70'],
    ['oitenta', '80'], ['noventa', '90'], ['cem', '100'], ['mil', '1000'],
  ], 'Au Portugal : dezasseis, dezassete, dezanove (au Brésil : dezesseis…). « um / dois » deviennent « uma / duas » au féminin.'),
]};

window.VOC.es = { themes: [
  theme('jours', '📅', 'Jours de la semaine', [
    ['lunes', 'lundi'], ['martes', 'mardi'], ['miércoles', 'mercredi'], ['jueves', 'jeudi'],
    ['viernes', 'vendredi'], ['sábado', 'samedi'], ['domingo', 'dimanche'],
  ], 'Minuscule, et avec l\'article sans préposition : « el lunes » (lundi), « los lunes » (le lundi, chaque semaine).'),
  theme('mois', '🗓️', 'Mois et saisons', [
    ['enero', 'janvier'], ['febrero', 'février'], ['marzo', 'mars'], ['abril', 'avril'],
    ['mayo', 'mai'], ['junio', 'juin'], ['julio', 'juillet'], ['agosto', 'août'],
    ['septiembre', 'septembre'], ['octubre', 'octobre'], ['noviembre', 'novembre'], ['diciembre', 'décembre'],
    ['la primavera', 'le printemps'], ['el verano', 'l\'été'], ['el otoño', 'l\'automne'], ['el invierno', 'l\'hiver'],
  ], 'Mois et saisons s\'écrivent en minuscule : « en mayo » (en mai), « en verano » (en été).'),
  theme('couleurs', '🎨', 'Couleurs', [
    ['rojo / roja', 'rouge'], ['azul', 'bleu'], ['verde', 'vert'], ['amarillo / amarilla', 'jaune'],
    ['naranja', 'orange'], ['rosa', 'rose'], ['morado / morada', 'violet'], ['blanco / blanca', 'blanc'],
    ['negro / negra', 'noir'], ['gris', 'gris'], ['marrón', 'marron'],
  ], 'Les couleurs en -o s\'accordent : una camisa blanca, unos zapatos negros. « naranja » et « rosa » restent souvent invariables.'),
  theme('corps', '🧍', 'Parties du corps', [
    ['la cabeza', 'la tête'], ['el pelo', 'les cheveux'], ['la cara', 'le visage'], ['el ojo', 'l\'œil'],
    ['la oreja', 'l\'oreille'], ['la nariz', 'le nez'], ['la boca', 'la bouche'], ['los dientes', 'les dents'],
    ['el cuello', 'le cou'], ['el hombro', 'l\'épaule'], ['el brazo', 'le bras'], ['la mano', 'la main'],
    ['el dedo', 'le doigt'], ['la espalda', 'le dos'], ['el pecho', 'la poitrine'], ['la barriga', 'le ventre'],
    ['la pierna', 'la jambe'], ['la rodilla', 'le genou'], ['el pie', 'le pied'], ['los pies', 'les pieds'],
  ], 'Pièges de genre : « la mano » est féminin malgré le -o, « la nariz » est féminin, « el pie » masculin. On dit « me duele la cabeza » (j\'ai mal à la tête).'),
  theme('nombres', '🔢', 'Nombres', [
    ['cero', '0'], ['uno / una', '1'], ['dos', '2'], ['tres', '3'], ['cuatro', '4'], ['cinco', '5'],
    ['seis', '6'], ['siete', '7'], ['ocho', '8'], ['nueve', '9'], ['diez', '10'],
    ['once', '11'], ['doce', '12'], ['trece', '13'], ['catorce', '14'], ['quince', '15'],
    ['dieciséis', '16'], ['diecisiete', '17'], ['dieciocho', '18'], ['diecinueve', '19'], ['veinte', '20'],
    ['treinta', '30'], ['cuarenta', '40'], ['cincuenta', '50'], ['sesenta', '60'], ['setenta', '70'],
    ['ochenta', '80'], ['noventa', '90'], ['cien', '100'], ['mil', '1000'],
  ], 'De 16 à 29 en un seul mot (dieciséis, veintidós). « cien » devient « ciento » devant un autre nombre : ciento uno (101).'),
]};
})();

// ── Thèmes ajoutés : ordinaux, caractère, métiers ──
(() => {
const theme = (id, icon, title, words, tip = '') => ({ id, icon, title, words, tip });

window.VOC.en.themes.push(
  theme('ordinaux', '🥇', 'Nombres ordinaux (1er, 2e…)', [
    ['first', 'premier (1er)'], ['second', 'deuxième (2e)'], ['third', 'troisième (3e)'], ['fourth', 'quatrième (4e)'],
    ['fifth', 'cinquième (5e)'], ['sixth', 'sixième (6e)'], ['seventh', 'septième (7e)'], ['eighth', 'huitième (8e)'],
    ['ninth', 'neuvième (9e)'], ['tenth', 'dixième (10e)'],
  ], 'Abréviations : 1st, 2nd, 3rd, 4th… « the first floor » = le premier étage au Royaume-Uni (aux États-Unis, c\'est le rez-de-chaussée !). Dates : « the 14th of July ».'),
  theme('caractere', '😊', 'Traits de caractère', [
    ['friendly', 'sympathique'], ['funny', 'drôle'], ['shy', 'timide'], ['kind', 'gentil'],
    ['clever', 'intelligent'], ['lazy', 'paresseux'], ['hard-working', 'travailleur'], ['serious', 'sérieux'],
    ['patient', 'patient'], ['calm', 'calme'], ['nervous', 'nerveux'], ['generous', 'généreux'],
    ['stubborn', 'têtu'], ['curious', 'curieux'], ['polite', 'poli'], ['rude', 'impoli'],
  ], 'Pour décrire le caractère : « What is she like? » — « She\'s very kind. » Les adjectifs sont invariables (a kind woman, kind people).'),
  theme('metiers', '👩‍🍳', 'Métiers courants', [
    ['doctor', 'médecin'], ['nurse', 'infirmier / infirmière'], ['teacher', 'professeur'], ['cook', 'cuisinier'],
    ['waiter / waitress', 'serveur / serveuse'], ['shop assistant', 'vendeur / vendeuse'], ['lawyer', 'avocat'], ['engineer', 'ingénieur'],
    ['police officer', 'policier'], ['firefighter', 'pompier'], ['baker', 'boulanger'], ['farmer', 'agriculteur'],
    ['hairdresser', 'coiffeur'], ['mechanic', 'mécanicien'], ['accountant', 'comptable'], ['journalist', 'journaliste'],
    ['driver', 'chauffeur'], ['pharmacist', 'pharmacien'],
  ], 'Avec un métier, l\'anglais met « a / an » : « I\'m a nurse », « She\'s an engineer » (pas d\'article en français : je suis infirmière).'),
);

window.VOC.pt.themes.push(
  theme('ordinaux', '🥇', 'Nombres ordinaux (1er, 2e…)', [
    ['primeiro / primeira', 'premier (1er)'], ['segundo / segunda', 'deuxième (2e)'], ['terceiro / terceira', 'troisième (3e)'], ['quarto / quarta', 'quatrième (4e)'],
    ['quinto / quinta', 'cinquième (5e)'], ['sexto / sexta', 'sixième (6e)'], ['sétimo / sétima', 'septième (7e)'], ['oitavo / oitava', 'huitième (8e)'],
    ['nono / nona', 'neuvième (9e)'], ['décimo / décima', 'dixième (10e)'],
  ], 'Ils s\'accordent : o primeiro andar (le 1er étage), a segunda rua (la 2e rue). Le rez-de-chaussée = o rés-do-chão. Abréviations : 1.º, 1.ª. Les jours de la semaine viennent de là : segunda-feira, terça-feira…'),
  theme('caractere', '😊', 'Traits de caractère', [
    ['simpático / simpática', 'sympathique'], ['engraçado / engraçada', 'drôle'], ['tímido / tímida', 'timide'], ['amável', 'gentil'],
    ['inteligente', 'intelligent'], ['preguiçoso / preguiçosa', 'paresseux'], ['trabalhador / trabalhadora', 'travailleur'], ['sério / séria', 'sérieux'],
    ['paciente', 'patient'], ['calmo / calma', 'calme'], ['nervoso / nervosa', 'nerveux'], ['generoso / generosa', 'généreux'],
    ['teimoso / teimosa', 'têtu'], ['curioso / curiosa', 'curieux'], ['educado / educada', 'poli'], ['mal-educado / mal-educada', 'impoli'],
  ], 'Le caractère se dit avec « ser » : « Ela é muito simpática ». Faux ami : « educado » = poli, bien élevé (pas « éduqué » au sens scolaire).'),
  theme('metiers', '👩‍🍳', 'Métiers courants', [
    ['o médico / a médica', 'médecin'], ['o enfermeiro / a enfermeira', 'infirmier / infirmière'], ['o professor / a professora', 'professeur'], ['o cozinheiro / a cozinheira', 'cuisinier / cuisinière'],
    ['o empregado de mesa / a empregada de mesa', 'serveur / serveuse'], ['o vendedor / a vendedora', 'vendeur / vendeuse'], ['o advogado / a advogada', 'avocat / avocate'], ['o engenheiro / a engenheira', 'ingénieur'],
    ['o polícia / a polícia', 'policier / policière'], ['o bombeiro / a bombeira', 'pompier'], ['o padeiro / a padeira', 'boulanger / boulangère'], ['o agricultor / a agricultora', 'agriculteur / agricultrice'],
    ['o cabeleireiro / a cabeleireira', 'coiffeur / coiffeuse'], ['o mecânico / a mecânica', 'mécanicien'], ['o contabilista / a contabilista', 'comptable'], ['o jornalista / a jornalista', 'journaliste'],
    ['o motorista / a motorista', 'chauffeur'], ['o farmacêutico / a farmacêutica', 'pharmacien / pharmacienne'],
  ], 'Pas d\'article après « ser » : « Sou enfermeira ». Au Portugal : « o empregado de mesa » (serveur — « garçom » est brésilien), « o polícia » (policier).'),
);

window.VOC.es.themes.push(
  theme('ordinaux', '🥇', 'Nombres ordinaux (1er, 2e…)', [
    ['primero / primera', 'premier (1er)'], ['segundo / segunda', 'deuxième (2e)'], ['tercero / tercera', 'troisième (3e)'], ['cuarto / cuarta', 'quatrième (4e)'],
    ['quinto / quinta', 'cinquième (5e)'], ['sexto / sexta', 'sixième (6e)'], ['séptimo / séptima', 'septième (7e)'], ['octavo / octava', 'huitième (8e)'],
    ['noveno / novena', 'neuvième (9e)'], ['décimo / décima', 'dixième (10e)'],
  ], '« primero » et « tercero » perdent le -o devant un nom masculin : el primer piso (le 1er étage), el tercer día. Le rez-de-chaussée = la planta baja. Abréviations : 1.º, 1.ª.'),
  theme('caractere', '😊', 'Traits de caractère', [
    ['simpático / simpática', 'sympathique'], ['divertido / divertida', 'drôle'], ['tímido / tímida', 'timide'], ['amable', 'gentil'],
    ['inteligente', 'intelligent'], ['vago / vaga', 'paresseux'], ['trabajador / trabajadora', 'travailleur'], ['serio / seria', 'sérieux'],
    ['paciente', 'patient'], ['tranquilo / tranquila', 'calme'], ['nervioso / nerviosa', 'nerveux'], ['generoso / generosa', 'généreux'],
    ['cabezota', 'têtu'], ['curioso / curiosa', 'curieux'], ['educado / educada', 'poli'], ['maleducado / maleducada', 'impoli'],
  ], 'Le caractère se dit avec « ser » : « Es muy simpática ». En Espagne, « vago » (paresseux) et « cabezota » (têtu) sont très courants. Faux ami : « educado » = poli.'),
  theme('metiers', '👩‍🍳', 'Métiers courants', [
    ['el médico / la médica', 'médecin'], ['el enfermero / la enfermera', 'infirmier / infirmière'], ['el profesor / la profesora', 'professeur'], ['el cocinero / la cocinera', 'cuisinier / cuisinière'],
    ['el camarero / la camarera', 'serveur / serveuse'], ['el dependiente / la dependienta', 'vendeur / vendeuse'], ['el abogado / la abogada', 'avocat / avocate'], ['el ingeniero / la ingeniera', 'ingénieur'],
    ['el policía / la policía', 'policier / policière'], ['el bombero / la bombera', 'pompier'], ['el panadero / la panadera', 'boulanger / boulangère'], ['el agricultor / la agricultora', 'agriculteur / agricultrice'],
    ['el peluquero / la peluquera', 'coiffeur / coiffeuse'], ['el mecánico / la mecánica', 'mécanicien'], ['el contable / la contable', 'comptable'], ['el periodista / la periodista', 'journaliste'],
    ['el conductor / la conductora', 'chauffeur'], ['el farmacéutico / la farmacéutica', 'pharmacien / pharmacienne'],
  ], 'Pas d\'article après « ser » : « Soy enfermera ». En Espagne : « el camarero » (serveur), « el contable » (comptable).'),
);
})();

// ── Thème « Famille » (placé après « Parties du corps ») ──
(() => {
const theme = (id, icon, title, words, tip = '') => ({ id, icon, title, words, tip });
const insert = (lang, t) => { const th = window.VOC[lang].themes; th.splice(th.findIndex(x => x.id === 'corps') + 1, 0, t); };

insert('en', theme('famille', '👨‍👩‍👧', 'Famille', [
  ['father', 'le père'], ['mother', 'la mère'], ['parents', 'les parents'], ['son', 'le fils'],
  ['daughter', 'la fille'], ['children', 'les enfants'], ['brother', 'le frère'], ['sister', 'la sœur'],
  ['grandfather', 'le grand-père'], ['grandmother', 'la grand-mère'], ['grandson / granddaughter', 'le petit-fils / la petite-fille'], ['uncle', 'l\'oncle'],
  ['aunt', 'la tante'], ['cousin', 'le cousin / la cousine'], ['nephew', 'le neveu'], ['niece', 'la nièce'],
  ['husband', 'le mari'], ['wife', 'la femme (épouse)'],
], 'Pluriel irrégulier : a child → two children. « My parents » = mes parents (père et mère) ; « relatives » = les autres membres de la famille.'));

insert('pt', theme('famille', '👨‍👩‍👧', 'Famille', [
  ['o pai', 'le père'], ['a mãe', 'la mère'], ['os pais', 'les parents'], ['o filho', 'le fils'],
  ['a filha', 'la fille'], ['os filhos', 'les enfants'], ['o irmão', 'le frère'], ['a irmã', 'la sœur'],
  ['o avô', 'le grand-père'], ['a avó', 'la grand-mère'], ['o neto / a neta', 'le petit-fils / la petite-fille'], ['o tio', 'l\'oncle'],
  ['a tia', 'la tante'], ['o primo / a prima', 'le cousin / la cousine'], ['o sobrinho', 'le neveu'], ['a sobrinha', 'la nièce'],
  ['o marido', 'le mari'], ['a mulher', 'la femme (épouse)'],
], 'Attention à l\'accent : o avô (ô fermé, grand-père) / a avó (ó ouvert, grand-mère). « os pais » = les parents ; « os filhos » = les enfants (garçons et filles). Le possessif prend l\'article : « o meu pai ».'));

insert('es', theme('famille', '👨‍👩‍👧', 'Famille', [
  ['el padre', 'le père'], ['la madre', 'la mère'], ['los padres', 'les parents'], ['el hijo', 'le fils'],
  ['la hija', 'la fille'], ['los hijos', 'les enfants'], ['el hermano', 'le frère'], ['la hermana', 'la sœur'],
  ['el abuelo', 'le grand-père'], ['la abuela', 'la grand-mère'], ['el nieto / la nieta', 'le petit-fils / la petite-fille'], ['el tío', 'l\'oncle'],
  ['la tía', 'la tante'], ['el primo / la prima', 'le cousin / la cousine'], ['el sobrino', 'le neveu'], ['la sobrina', 'la nièce'],
  ['el marido', 'le mari'], ['la mujer', 'la femme (épouse)'],
], '« los padres » = les parents ; « los hijos » = les enfants ; « los hermanos » = les frères et sœurs. Pas d\'article devant le possessif : « mi padre ».'));
})();
