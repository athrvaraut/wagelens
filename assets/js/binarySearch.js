/* ============================================
   binarySearch.js — Salary Range Finder
   assets/js/binarySearch.js
============================================ */

const bsArr     = [28,31,41,45,53,62,67,74,82,88,95,103,115,128,142].sort((a,b) => a - b);
let bsRunning   = false;

function resetBS() {
  bsRunning = false;
  renderBsArray([], [], -1, []);
  document.getElementById('bs-log').innerHTML =
    '<span style="color:var(--text2)">Waiting for search…</span>';
}

function renderBsArray(range = [], mid = [], found = -1, elim = []) {
  const cont = document.getElementById('bs-array');
  cont.innerHTML = bsArr.map((v, i) => {
    let cls = 'bs-cell';
    if (found === i)        cls += ' found';
    else if (mid.includes(i))   cls += ' mid';
    else if (range.includes(i)) cls += ' range';
    else if (elim.includes(i))  cls += ' eliminated';
    return `<div class="${cls}">
      <span class="cell-idx">${i}</span>
      <span class="cell-val">${v}K</span>
    </div>`;
  }).join('');
}

async function startBS() {
  if (bsRunning) return;
  bsRunning = true;
  const target = +document.getElementById('bs-target').value;
  const log    = document.getElementById('bs-log');
  log.innerHTML = '';

  let lo = 0, hi = bsArr.length - 1;
  const elim = [];

  while (lo <= hi) {
    if (!bsRunning) return;
    const mid   = Math.floor((lo + hi) / 2);
    const range = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
    renderBsArray(range, [mid], -1, elim);

    log.innerHTML += `<div class="log-step">Step → lo=${lo}, hi=${hi}, mid=${mid} → arr[mid]=${bsArr[mid]}K</div>`;
    log.scrollTop  = 9999;
    await new Promise(r => setTimeout(r, 700));

    if (bsArr[mid] === target) {
      renderBsArray([], [], mid, elim);
      log.innerHTML += `<div class="log-found">✓ FOUND! Salary ${target}K at index ${mid} — O(log n) comparisons!</div>`;
      bsRunning = false;
      return;
    } else if (bsArr[mid] < target) {
      for (let i = lo; i <= mid; i++) elim.push(i);
      lo = mid + 1;
    } else {
      for (let i = mid; i <= hi; i++) elim.push(i);
      hi = mid - 1;
    }
  }

  renderBsArray([], [], -1, elim);
  log.innerHTML += `<div class="log-not">✗ NOT FOUND — ${target}K not in list. Searched in O(log n).</div>`;
  bsRunning = false;
}

/* Init */
resetBS();