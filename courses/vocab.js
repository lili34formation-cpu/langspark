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
