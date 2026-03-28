/* ============================================
   backtrack.js — Bonus Budget Allocator
   assets/js/backtrack.js
============================================ */

const empPool = [
  { id: 'E1', name: 'Aryan',  dept: 'Eng',  score: 92, bonus: 50, color: '#00f5c4' },
  { id: 'E2', name: 'Priya',  dept: 'Prod', score: 88, bonus: 45, color: '#7c3fff' },
  { id: 'E3', name: 'Raj',    dept: 'Fin',  score: 75, bonus: 30, color: '#ffd23f' },
  { id: 'E4', name: 'Sneha',  dept: 'HR',   score: 95, bonus: 60, color: '#ff6b35' },
  { id: 'E5', name: 'Vikram', dept: 'Eng',  score: 82, bonus: 40, color: '#00f5c4' },
  { id: 'E6', name: 'Aisha',  dept: 'Prod', score: 70, bonus: 35, color: '#7c3fff' },
];

function initBacktrack() {
  document.getElementById('emp-pool').innerHTML = empPool.map(e => `
    <div class="emp-row" id="ep-${e.id}">
      <div class="emp-avatar" style="background:${e.color}22;color:${e.color}">${e.name[0]}</div>
      <div class="emp-info">
        <div class="emp-name" style="color:${e.color}">${e.name}</div>
        <div class="emp-score">Score: ${e.score} | ${e.dept}</div>
      </div>
      <div class="emp-bonus" style="color:${e.color}">₹${e.bonus}K</div>
    </div>`).join('');

  document.getElementById('bt-output').innerHTML =
    '<span style="color:var(--text2)">Run the algorithm to see results.</span>';
}

function runBacktrack() {
  const budget = +document.getElementById('bt-budget').value;
  let best = { score: 0, selection: [] };

  /* Core backtracking recursion */
  function bt(idx, remaining, current, score) {
    if (score > best.score && current.length > 0) {
      best = { score, selection: [...current] };
    }
    if (idx >= empPool.length) return;
    for (let i = idx; i < empPool.length; i++) {
      const e = empPool[i];
      if (e.bonus <= remaining) {
        current.push(e);
        bt(i + 1, remaining - e.bonus, current, score + e.score);
        current.pop();       /* ← BACKTRACK */
      }
    }
  }

  bt(0, budget, [], 0);

  /* Highlight selected employees */
  const ids = best.selection.map(e => e.id);
  document.querySelectorAll('.emp-row').forEach(el => el.classList.remove('selected'));
  ids.forEach(id => {
    const el = document.getElementById('ep-' + id);
    if (el) el.classList.add('selected');
  });

  const total = best.selection.reduce((s, e) => s + e.bonus, 0);

  document.getElementById('bt-output').innerHTML = `
    <div style="color:var(--accent1);font-weight:700;margin-bottom:12px;">✓ Optimal Subset Found (Backtracking)</div>
    <div style="color:var(--text2);font-size:.68rem;margin-bottom:14px;">Explored 2ⁿ subsets with pruning on budget constraint</div>
    ${best.selection.map(e => `
      <div class="bt-alloc-item">
        <span style="color:${e.color}">${e.name} (${e.dept})</span>
        <span>Score: ${e.score} | <span style="color:var(--accent4)">₹${e.bonus}K</span></span>
      </div>`).join('')}
    <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:.72rem;">
      <span style="color:var(--text2)">Total Bonus Spent</span>
      <span style="color:var(--accent2)">₹${total}K / ₹${budget}K</span>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:.72rem;margin-top:6px;">
      <span style="color:var(--text2)">Total Performance Score</span>
      <span style="color:var(--accent1);font-weight:700">${best.score}</span>
    </div>`;
}

/* Init */
initBacktrack();