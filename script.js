/* ============================================
   TOY ASAO — script.js
   ============================================ */

/* ── ESTADÍSTICAS ──────────────────────────
   Actualiza estos números con tus stats reales.
   Cuando tengas los datos exactos, cámbialos aquí.
   ─────────────────────────────────────────── */
const STATS = {
  youtube:  53700,   // ← pon aquí tus suscriptores de YouTube  (ej: 1500)
  tiktok:   12200,   // ← pon aquí tus seguidores de TikTok     (ej: 3200)
  instagram: 4100,   // ← pon aquí tus seguidores de Instagram  (ej: 800)
  facebook: 44000,   // ← pon aquí tus seguidores de Facebook   (ej: 500)
};

/* ── DISCORD ───────────────────────────────
   Cuando tengas tu link de Discord, pegalo aquí
   y el botón se activará automáticamente.
   ─────────────────────────────────────────── */
const DISCORD_URL = ''; // ← ejemplo: 'https://discord.gg/tuservidor'


/* ============================================
   ANIMACIÓN DE CONTEO NUMÉRICO
   ============================================ */
function animateCount(el, target) {
  if (target === 0) {
    el.textContent = '—';
    return;
  }

  const duration = 1200;
  const steps    = 60;
  const interval = duration / steps;
  let current    = 0;

  const timer = setInterval(() => {
    current = Math.min(current + Math.ceil(target / steps), target);

    if (current >= 1000) {
      el.textContent = (current / 1000).toFixed(1) + 'K';
    } else {
      el.textContent = current;
    }

    if (current >= target) clearInterval(timer);
  }, interval);
}


/* ============================================
   ACTIVAR DISCORD SI HAY LINK
   ============================================ */
function setupDiscord() {
  const btn    = document.getElementById('discord-btn');
  const handle = document.getElementById('discord-handle');

  if (DISCORD_URL && btn) {
    btn.href = DISCORD_URL;
    btn.classList.remove('btn-disabled');
    if (handle) handle.textContent = 'Únete al servidor';
  }
}


/* ============================================
   INICIALIZAR TODO AL CARGAR
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Estadísticas con animación
  const ytEl = document.getElementById('yt-subs');
  const ttEl = document.getElementById('tt-followers');
  const igEl = document.getElementById('ig-followers');
  const fbEl = document.getElementById('fb-followers');

  if (ytEl) animateCount(ytEl, STATS.youtube);
  if (ttEl) animateCount(ttEl, STATS.tiktok);
  if (igEl) animateCount(igEl, STATS.instagram);
  if (fbEl) animateCount(fbEl, STATS.facebook);

  // Discord
  setupDiscord();

});
