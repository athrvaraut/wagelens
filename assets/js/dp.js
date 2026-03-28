/* ============================================
   dp.js — Dynamic Programming Salary Growth
   assets/js/dp.js
============================================ */

let dpYears = [];

function randomDP() {
  dpYears = [];
  let base = 400000 + Math.floor(Math.random() * 200000);
  for (let y = 0; y < 6; y++) {
    const stay = Math.round(base * (1 + (Math.random() * 0.15 + 0.05)));
    const jump = Math.round(base * (1 + (Math.random() * 0.35 + 0.15)));
    dpYears.push({ year: 2024 + y, stay, jump });
    base = Math.max(stay, jump) * 0.98;
  }
  buildDPTable();
}

function buildDPTable() {
  const n  = dpYears.length;
  const dp = Array.from({ length: n }, () => [0, 0]);

  dp[0][0] = dpYears[0].stay;
  dp[0][1] = dpYears[0].jump;

  for (let i = 1; i < n; i++) {
    const prevBest = Math.max(dp[i - 1][0], dp[i - 1][1]);
    dp[i][0] = prevBest + dpYears[i].stay;
    dp[i][1] = prevBest + dpYears[i].jump;
  }

  const th = `<tr>
    <th>Year</th><th>Stay (₹)</th><th>Jump (₹)</th>
    <th>Cum Stay</th><th>Cum Jump</th>
  </tr>`;

  const rows = dpYears.map((y, i) => `
    <tr>
      <td>${y.year}</td>
      <td>${(y.stay / 100000).toFixed(1)}L</td>
      <td class="dp-highlight">${(y.jump / 100000).toFixed(1)}L</td>
      <td>${(dp[i][0] / 100000).toFixed(1)}L</td>
      <td class="dp-max">${(dp[i][1] / 100000).toFixed(1)}L</td>
    </tr>`).join('');

  document.getElementById('dp-table').innerHTML = th + rows;
}

function runDP() {
  if (!dpYears.length) randomDP();
  const jumpPath = dpYears.map(y => y.jump / 100000);
  const stayPath = dpYears.map(y => y.stay / 100000);
  const labels   = dpYears.map(y => y.year.toString());

  const canvas = document.getElementById('dpChart');
  const ctx    = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cw = canvas.parentElement.offsetWidth - 32;
  const ch = canvas.parentElement.offsetHeight - 32;
  canvas.width  = cw;
  canvas.height = ch;

  const allVals = [...jumpPath, ...stayPath];
  const maxV = Math.max(...allVals) * 1.1;
  const minV = Math.min(...allVals) * 0.9;
  const pad  = { l: 40, r: 20, t: 20, b: 30 };
  const W    = cw - pad.l - pad.r;
  const H    = ch - pad.t - pad.b;
  const n    = dpYears.length;
  const xStep = W / (n - 1);

  const toX = i => pad.l + i * xStep;
  const toY = v => pad.t + H - ((v - minV) / (maxV - minV)) * H;

  /* grid */
  ctx.strokeStyle = 'rgba(26,37,64,0.8)';
  ctx.lineWidth   = 0.5;
  for (let i = 0; i < 5; i++) {
    const y   = pad.t + (i / 4) * H;
    const val = maxV - (i / 4) * (maxV - minV);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + W, y); ctx.stroke();
    ctx.fillStyle = 'rgba(122,141,181,0.7)';
    ctx.font = '9px Inconsolata';
    ctx.fillText(val.toFixed(1) + 'L', 2, y + 3);
  }

  function drawLine(data, color) {
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(toX(i), toY(data[i]));
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    ctx.stroke();
    data.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(toX(i), toY(v), 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  drawLine(jumpPath, '#00f5c4');
  drawLine(stayPath, '#7c3fff');

  /* x-axis labels */
  ctx.font = '9px Space Mono';
  labels.forEach((l, i) => {
    ctx.fillStyle = '#7a8db5';
    ctx.fillText(l, toX(i) - 12, ch - 6);
  });

  document.getElementById('dp-summary').innerHTML =
    `<span style="color:var(--accent1)">●</span> Optimal (Jump): Total ≈ ${jumpPath.reduce((a, b) => a + b, 0).toFixed(1)}L cumulative &nbsp;|&nbsp;
     <span style="color:var(--accent3)">●</span> Stay Path: ${stayPath.reduce((a, b) => a + b, 0).toFixed(1)}L<br>
     DP memoizes each year's best choice — <span style="color:var(--accent4)">O(n·2)</span> states`;
}

/* Init */
randomDP();