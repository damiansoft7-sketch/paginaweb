/* ============================================
   JACKPOT — jackpot.js
   Cascarón: valida el ID, desbloquea la palanca
   y hace girar 5 carretes. La lógica de premios
   se agrega después en checkResult().
   ============================================ */

/* ── SÍMBOLOS ──────────────────────────────
   Agrega o quita símbolos aquí. Cada carrete
   elige uno al azar de esta misma lista.
   ─────────────────────────────────────────── */
const SYMBOLS = ['🍒', '🍋', '🔔', '💎', '7️⃣', '⭐'];

const REEL_COUNT = 5;

/* Tiempos del giro (ms) */
const SPIN_INTERVAL   = 60;   // qué tan rápido cambia el símbolo mientras gira
const FIRST_REEL_STOP = 900;  // cuándo se detiene el primer carrete
const STOP_GAP        = 350;  // separación entre la detención de cada carrete


/* ============================================
   VALIDACIÓN DEL ID
   ============================================ */
function setupIdGate() {
  const input   = document.getElementById('player-id');
  const errorEl = document.getElementById('id-error');
  const spinBtn = document.getElementById('spin-btn');
  const lockMsg = document.getElementById('lock-msg');

  function validate() {
    const isValid = input.checkValidity() && input.value.length >= 8;

    if (isValid) {
      input.classList.remove('invalid');
      errorEl.textContent = '';
      spinBtn.disabled = false;
      lockMsg.classList.add('hidden');
    } else {
      spinBtn.disabled = true;
      lockMsg.classList.remove('hidden');

      if (input.value.length === 0) {
        errorEl.textContent = '';
      } else if (!/^\d+$/.test(input.value)) {
        errorEl.textContent = 'Solo se permiten números.';
        input.classList.add('invalid');
      } else if (input.value.length < 8) {
        errorEl.textContent = 'Debe tener al menos 8 dígitos.';
        input.classList.add('invalid');
      }
    }

    return isValid;
  }

  input.addEventListener('input', validate);
  validate();
}


/* ============================================
   CASCARÓN DEL GIRO (5 CARRETES)
   ============================================ */
function setupJackpot() {
  const spinBtn   = document.getElementById('spin-btn');
  const resultMsg = document.getElementById('result-msg');
  const windows   = document.querySelectorAll('.reel-window');
  const symbols   = document.querySelectorAll('.reel-symbol');

  function randomSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }

  function spin() {
    spinBtn.disabled = true;
    resultMsg.textContent = '';

    const intervals   = [];
    const finalResult = [];

    // 1. arrancar el giro visual de cada carrete
    windows.forEach((win, i) => {
      win.classList.add('spinning');
      win.classList.remove('stopped');

      intervals[i] = setInterval(() => {
        symbols[i].textContent = randomSymbol();
      }, SPIN_INTERVAL);
    });

    // 2. detener cada carrete en momentos escalonados
    for (let i = 0; i < REEL_COUNT; i++) {
      setTimeout(() => {
        clearInterval(intervals[i]);

        const landed = randomSymbol(); // ← por ahora random; aquí decidiremos el resultado real
        symbols[i].textContent = landed;
        finalResult[i] = landed;

        windows[i].classList.remove('spinning');
        windows[i].classList.add('stopped');

        // 3. cuando el último carrete se detiene, evaluamos el resultado
        if (i === REEL_COUNT - 1) {
          checkResult(finalResult);
          spinBtn.disabled = false;
        }
      }, FIRST_REEL_STOP + i * STOP_GAP);
    }
  }

  spinBtn.addEventListener('click', spin);
}


/* ============================================
   RESULTADO — placeholder
   Aquí se conectará la lógica de premios
   (ej: comparar finalResult y decidir si ganó).
   ============================================ */
function checkResult(finalResult) {
  const resultMsg = document.getElementById('result-msg');
  resultMsg.textContent = finalResult.join(' ');
  // TODO: definir reglas de premio y mostrar el resultado real
}


/* ============================================
   INICIALIZAR
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupIdGate();
  setupJackpot();
});
