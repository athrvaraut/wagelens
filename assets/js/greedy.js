/* ============================================
   greedy.js — Tax Bracket Optimizer
   assets/js/greedy.js
============================================ */

const slabs = [
  { min: 0,       max: 300000,  rate: 0  },
  { min: 300001,  max: 700000,  rate: 5  },
  { min: 700001,  max: 1000000, rate: 10 },
  { min: 1000001, max: 1200000, rate: 15 },
  { min: 1200001, max: 1500000, rate: 20 },
  { min: 1500001, max: Infinity,rate: 30 }
];

function fmtINR(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN');
}

function calcGreedy() {
  const ctc     = +document.getElementById('ctc-input').value    || 0;
  const hra     = +document.getElementById('hra-input').value    || 0;
  const ded     = +document.getElementById('deduct-input').value || 0;
  const std     = +document.getElementById('std-input').value    || 0;
  const taxable = Math.max(0, ctc - hra - ded - std);

  let tax = 0;
  let rows = '';

  slabs.forEach(s => {
    const low    = s.min - 1;
    const high   = s.max;
    const inSlab = Math.max(0, Math.min(taxable, high) - low);
    const t      = (inSlab * s.rate) / 100;
    tax += t;

    const isActive = taxable >= s.min;
    rows += `<tr class="${isActive ? 'active-row' : ''}">
      <td>${fmtINR(s.min)} – ${s.max === Infinity ? 'Above' : fmtINR(s.max)}</td>
      <td class="tax-pct">${s.rate}%</td>
      <td>${inSlab > 0 ? fmtINR(inSlab) : '—'}</td>
      <td>${t > 0 ? fmtINR(Math.round(t)) : '—'}</td>
    </tr>`;
  });

  document.getElementById('bracket-body').innerHTML = rows;

  const cess     = tax * 0.04;
  const totalTax = tax + cess;
  const monthly  = (ctc - totalTax) / 12;

  document.getElementById('greedy-result').innerHTML = `
    <div class="result-row">
      <span class="result-key">Gross CTC</span>
      <span class="result-val">${fmtINR(ctc)}</span>
    </div>
    <div class="result-row">
      <span class="result-key">Total Deductions</span>
      <span class="result-val red">− ${fmtINR(hra + ded + std)}</span>
    </div>
    <div class="result-row">
      <span class="result-key">Taxable Income</span>
      <span class="result-val gold">${fmtINR(taxable)}</span>
    </div>
    <div class="result-row">
      <span class="result-key">Income Tax</span>
      <span class="result-val red">${fmtINR(Math.round(tax))}</span>
    </div>
    <div class="result-row">
      <span class="result-key">Health &amp; Ed. Cess (4%)</span>
      <span class="result-val red">${fmtINR(Math.round(cess))}</span>
    </div>
    <div class="result-row" style="border-top:1px solid var(--border);padding-top:8px;margin-top:4px;">
      <span class="result-key">Monthly Take-Home</span>
      <span class="result-val" style="font-size:.95rem">${fmtINR(Math.round(monthly))}</span>
    </div>`;
}

/* Init */
calcGreedy();