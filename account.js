// ════════════════════════════════════════
//  LangSpark — comptes et sauvegarde en ligne (Supabase)
//  La progression reste dans le navigateur (localStorage) pour fonctionner hors ligne,
//  et chaque modification est synchronisée avec le compte de la personne connectée.
// ════════════════════════════════════════

// Informations publiques du projet Supabase (la sécurité repose sur les règles RLS de supabase/schema.sql)
const SUPABASE_URL = 'https://gapwzcberdgnxbtvjnla.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SDO0DRapm4GQMeXWUmndvQ_Qw7qv95o';

const ACCT_PREFIXES = ['bb_', 'cj_', 'te_'];   // progression synchronisée (jamais la clé d'API Claude)
const ACCT_OWNER_KEY = 'acct_owner';           // id du compte à qui appartient la progression locale
const ACCT_APP_URL = location.origin + location.pathname;

// Tant que le projet Supabase n'est pas renseigné, l'app fonctionne comme avant, sans comptes
const ACCT_ENABLED = !SUPABASE_URL.startsWith('__') && !!window.supabase;
const sb = ACCT_ENABLED ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null;
let acctUser = null;
let acctSyncTimer = null;
let acctApplying = false;
let acctLastSync = null;

const acctIsSyncKey = k => ACCT_PREFIXES.some(p => k.startsWith(p));
const acctName = u => u?.user_metadata?.name || u?.email?.split('@')[0] || '';

// ── Chaque écriture de progression déclenche une synchronisation (regroupée) ──
const acctOrigSet = Storage.prototype.setItem;
const acctOrigRemove = Storage.prototype.removeItem;
Storage.prototype.setItem = function (k, v) {
  acctOrigSet.call(this, k, v);
  if (this === window.localStorage && acctIsSyncKey(k) && !acctApplying) acctScheduleSync();
};
Storage.prototype.removeItem = function (k) {
  acctOrigRemove.call(this, k);
  if (this === window.localStorage && acctIsSyncKey(k) && !acctApplying) acctScheduleSync();
};

function acctSnapshot() {
  const data = {};
  Object.keys(localStorage).filter(acctIsSyncKey).forEach(k => { data[k] = localStorage.getItem(k); });
  return data;
}
function acctClearLocal() {
  acctApplying = true;
  Object.keys(localStorage).filter(acctIsSyncKey).forEach(k => localStorage.removeItem(k));
  acctApplying = false;
}

// Fusion « on ne perd jamais un progrès » : leçons cochées, meilleurs scores, XP les plus élevés
function acctMergeValue(a, b) {
  if (a === undefined) return b;
  if (b === undefined) return a;
  if (typeof a === 'number' && typeof b === 'number') return Math.max(a, b);
  if (typeof a === 'boolean' && typeof b === 'boolean') return a || b;
  if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    const out = {};
    new Set([...Object.keys(a), ...Object.keys(b)]).forEach(k => { out[k] = acctMergeValue(a[k], b[k]); });
    return out;
  }
  return a;   // texte (niveau de départ, mode libre…) : on garde celui de l'appareil
}
function acctMerge(local, remote) {
  const parse = s => { try { return JSON.parse(s); } catch (e) { return s; } };
  const out = {};
  new Set([...Object.keys(local), ...Object.keys(remote)]).forEach(k => {
    const v = acctMergeValue(local[k] === undefined ? undefined : parse(local[k]), remote[k] === undefined ? undefined : parse(remote[k]));
    out[k] = typeof v === 'string' ? v : JSON.stringify(v);
  });
  return out;
}

// ── Synchronisation : récupère le compte, fusionne, applique localement, renvoie ──
function acctScheduleSync() {
  if (!acctUser) return;
  clearTimeout(acctSyncTimer);
  acctSyncTimer = setTimeout(acctSync, 2000);
}
async function acctSync() {
  if (!acctUser) return false;
  clearTimeout(acctSyncTimer);
  try {
    const { data: row, error } = await sb.from('progress').select('data').eq('user_id', acctUser.id).maybeSingle();
    if (error) throw error;
    const local = acctSnapshot();
    const merged = acctMerge(local, row?.data || {});
    const changedLocally = Object.keys(merged).some(k => merged[k] !== local[k]);
    if (changedLocally) {
      acctApplying = true;
      Object.entries(merged).forEach(([k, v]) => localStorage.setItem(k, v));
      acctApplying = false;
      acctRefreshView();
    }
    if (JSON.stringify(merged) !== JSON.stringify(row?.data || null)) {
      const { error: e2 } = await sb.from('progress').upsert({ user_id: acctUser.id, data: merged, updated_at: new Date().toISOString() });
      if (e2) throw e2;
    }
    acctLastSync = new Date();
    acctUpdateBadges();
    return true;
  } catch (e) {
    console.warn('Synchronisation impossible (hors ligne ?)', e);
    acctUpdateBadges(true);
    return false;
  }
}

// Rafraîchit l'accueil des cours s'il est affiché (sans interrompre une leçon en cours)
function acctRefreshView() {
  const active = document.querySelector('.view.active');
  if (!active) return;
  const lang = active.id === 'view-bb-en' ? 'en' : active.id === 'view-bb-pt' ? 'pt' : null;
  if (lang && document.querySelector(`#bb-${lang}-content .bb-xp-bar`)) initBBView(lang);
}

// ── Écran de connexion ──
function acctShowGate(mode = 'login', message = '') {
  let gate = document.getElementById('acct-gate');
  if (!gate) {
    gate = document.createElement('div');
    gate.id = 'acct-gate';
    document.body.appendChild(gate);
  }
  const forms = {
    login: `
      <div class="acct-title">Connexion</div>
      <input class="bb-input" id="acct-email" type="email" placeholder="E-mail" autocomplete="email">
      <input class="bb-input" id="acct-pass" type="password" placeholder="Mot de passe" autocomplete="current-password"
        onkeydown="if(event.key==='Enter')acctLogin()">
      <button class="bb-next-btn" id="acct-submit" onclick="acctLogin()">Se connecter</button>
      <div class="acct-links">
        <button onclick="acctShowGate('signup')">Créer un compte</button>
        <button onclick="acctShowGate('forgot')">Mot de passe oublié ?</button>
      </div>`,
    signup: `
      <div class="acct-title">Créer mon compte</div>
      <input class="bb-input" id="acct-name" placeholder="Prénom" autocomplete="given-name">
      <input class="bb-input" id="acct-email" type="email" placeholder="E-mail" autocomplete="email">
      <input class="bb-input" id="acct-pass" type="password" placeholder="Mot de passe (8 caractères minimum)" autocomplete="new-password"
        onkeydown="if(event.key==='Enter')acctSignup()">
      <button class="bb-next-btn" id="acct-submit" onclick="acctSignup()">Créer mon compte</button>
      <div class="acct-links"><button onclick="acctShowGate('login')">J'ai déjà un compte</button></div>`,
    forgot: `
      <div class="acct-title">Mot de passe oublié</div>
      <div class="acct-help">Indiquez votre e-mail : vous recevrez un lien pour choisir un nouveau mot de passe.</div>
      <input class="bb-input" id="acct-email" type="email" placeholder="E-mail" autocomplete="email"
        onkeydown="if(event.key==='Enter')acctForgot()">
      <button class="bb-next-btn" id="acct-submit" onclick="acctForgot()">Recevoir le lien</button>
      <div class="acct-links"><button onclick="acctShowGate('login')">Retour à la connexion</button></div>`,
    reset: `
      <div class="acct-title">Nouveau mot de passe</div>
      <input class="bb-input" id="acct-pass" type="password" placeholder="Nouveau mot de passe (8 caractères minimum)" autocomplete="new-password"
        onkeydown="if(event.key==='Enter')acctReset()">
      <button class="bb-next-btn" id="acct-submit" onclick="acctReset()">Enregistrer</button>`,
  };
  gate.innerHTML = `
    <div class="acct-card">
      <div class="acct-logo">LangSpark ⚡</div>
      <div class="acct-sub">Anglais · Portugais — votre progression vous suit sur tous vos appareils</div>
      <div id="acct-msg" class="acct-msg${message ? '' : ' hidden'}">${message}</div>
      ${forms[mode]}
    </div>`;
  gate.classList.add('open');
  const first = gate.querySelector('input');
  if (first) first.focus();
}
function acctHideGate() {
  const gate = document.getElementById('acct-gate');
  if (gate) gate.classList.remove('open');
}
function acctMsg(text, ok = false) {
  const el = document.getElementById('acct-msg');
  el.className = 'acct-msg' + (ok ? ' ok' : '');
  el.innerHTML = text;
}
function acctBusy(on) {
  const b = document.getElementById('acct-submit');
  if (b) { b.disabled = on; b.style.opacity = on ? .6 : 1; }
}
function acctError(e) {
  const m = (e && e.message) || String(e);
  if (/invalid login credentials/i.test(m)) return 'E-mail ou mot de passe incorrect.';
  if (/email not confirmed/i.test(m)) return 'Adresse pas encore confirmée : cliquez sur le lien reçu par e-mail (pensez aux spams).';
  if (/already registered|already been registered/i.test(m)) return 'Un compte existe déjà avec cet e-mail. Connectez-vous.';
  if (/password should be at least|weak password/i.test(m)) return 'Mot de passe trop court : 8 caractères minimum.';
  if (/rate limit|too many/i.test(m)) return 'Trop de tentatives : réessayez dans quelques minutes.';
  if (/valid email|invalid email/i.test(m)) return 'Adresse e-mail invalide.';
  if (/fetch|network/i.test(m)) return 'Pas de connexion internet.';
  return m;
}
const acctVal = id => (document.getElementById(id)?.value || '').trim();

async function acctLogin() {
  acctBusy(true);
  const { data, error } = await sb.auth.signInWithPassword({ email: acctVal('acct-email'), password: document.getElementById('acct-pass').value });
  acctBusy(false);
  if (error) return acctMsg('❌ ' + acctError(error));
  await acctStart(data.user);
}
async function acctSignup() {
  const name = acctVal('acct-name');
  const password = document.getElementById('acct-pass').value;
  if (!name) return acctMsg('❌ Indiquez votre prénom.');
  if (password.length < 8) return acctMsg('❌ Mot de passe trop court : 8 caractères minimum.');
  acctBusy(true);
  const { data, error } = await sb.auth.signUp({
    email: acctVal('acct-email'), password,
    options: { data: { name }, emailRedirectTo: ACCT_APP_URL },
  });
  acctBusy(false);
  if (error) return acctMsg('❌ ' + acctError(error));
  if (data.session) return acctStart(data.user);
  acctShowGate('login', `✅ Compte créé ! Un e-mail de confirmation vous a été envoyé à <b>${bbEsc(acctVal('acct-email') || data.user?.email || '')}</b>. Cliquez sur le lien, puis connectez-vous ici.`);
  document.getElementById('acct-msg').classList.add('ok');
}
async function acctForgot() {
  acctBusy(true);
  const { error } = await sb.auth.resetPasswordForEmail(acctVal('acct-email'), { redirectTo: ACCT_APP_URL });
  acctBusy(false);
  if (error) return acctMsg('❌ ' + acctError(error));
  acctMsg('✅ Si un compte existe avec cet e-mail, un lien vient de vous être envoyé.', true);
}
async function acctReset() {
  const password = document.getElementById('acct-pass').value;
  if (password.length < 8) return acctMsg('❌ Mot de passe trop court : 8 caractères minimum.');
  acctBusy(true);
  const { data, error } = await sb.auth.updateUser({ password });
  acctBusy(false);
  if (error) return acctMsg('❌ ' + acctError(error));
  await acctStart(data.user);
}

// ── Ouverture de session : la progression locale appartient-elle à cette personne ? ──
async function acctStart(user) {
  acctUser = user;
  const owner = localStorage.getItem(ACCT_OWNER_KEY);
  const hasLocal = Object.keys(acctSnapshot()).length > 0;
  if (owner && owner !== user.id) {
    acctClearLocal();   // progression d'une autre personne sur cet appareil
  } else if (!owner && hasLocal &&
    !confirm('Une progression est déjà enregistrée sur cet appareil (sans compte).\n\nL\'ajouter à votre compte ?\n\nOK = l\'ajouter · Annuler = repartir de votre compte')) {
    acctClearLocal();
  }
  localStorage.setItem(ACCT_OWNER_KEY, user.id);
  acctHideGate();
  await acctSync();
  acctRefreshView();
  acctUpdateBadges();
}

async function acctLogout() {
  if (!confirm('Se déconnecter ? Votre progression reste sauvegardée dans votre compte.')) return;
  await acctSync();
  acctClearLocal();
  localStorage.removeItem(ACCT_OWNER_KEY);
  await sb.auth.signOut();
  acctUser = null;
  location.reload();
}

async function acctDeleteAccount() {
  if (!confirm('Supprimer définitivement votre compte et toute votre progression ?')) return;
  if (!confirm('Dernière confirmation : cette action est irréversible.')) return;
  const { error } = await sb.rpc('delete_my_account');
  if (error) return alert('❌ Suppression impossible : ' + acctError(error));
  acctClearLocal();
  localStorage.removeItem(ACCT_OWNER_KEY);
  await sb.auth.signOut();
  alert('Votre compte a été supprimé.');
  location.reload();
}

// ── Affichage du compte (barre latérale + accueil des cours) ──
function acctBadgeHTML() {
  if (!acctUser) return '';
  const when = acctLastSync ? acctLastSync.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '…';
  return `
    <div class="acct-badge">
      <div>👤 <b>${bbEsc(acctName(acctUser))}</b> · ☁️ <span class="acct-sync-state">synchronisé à ${when}</span></div>
      <div class="bb-save-actions">
        <button class="bb-test-link" onclick="acctLogout()">Se déconnecter</button>
        <button class="bb-test-link acct-danger" onclick="acctDeleteAccount()">Supprimer mon compte</button>
      </div>
    </div>`;
}
function acctUpdateBadges(offline = false) {
  document.querySelectorAll('.acct-sync-state').forEach(el => {
    el.textContent = offline ? 'hors ligne — synchronisation dès le retour du réseau'
      : `synchronisé à ${(acctLastSync || new Date()).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  });
  const side = document.getElementById('acct-side');
  if (side) side.innerHTML = acctUser ? `👤 ${bbEsc(acctName(acctUser))} · <a href="#" onclick="acctLogout();return false">déconnexion</a>` : '';
}

// ── Démarrage ──
if (ACCT_ENABLED) {
sb.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY') acctShowGate('reset');
  if (event === 'TOKEN_REFRESHED' && session) acctUser = session.user;
});
window.addEventListener('online', () => acctSync());
document.addEventListener('visibilitychange', () => {
  // en quittant : on envoie ; en revenant : on récupère ce qui a été fait sur un autre appareil
  if (acctUser) acctSync();
});

(async () => {
  const isRecovery = /type=recovery/.test(location.hash);
  const { data: { session } } = await sb.auth.getSession();
  if (isRecovery) return;   // l'événement PASSWORD_RECOVERY affichera le formulaire
  if (session) await acctStart(session.user);
  else acctShowGate('login');
  if (location.hash.includes('access_token')) history.replaceState(null, '', ACCT_APP_URL);
})();
}
