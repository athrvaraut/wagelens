/* ============================================
   calculator.js — Full Salary Calculator
   assets/js/calculator.js
============================================ */

function fullCalc() {
  const basic   = +document.getElementById('c-basic').value    || 0;
  const hraPct  = +document.getElementById('c-hra-pct').value  || 0;
  const daPct   = +document.getElementById('c-da').value       || 0;
  const special = +document.getElementById('c-special').value  || 0;
  const pfPct   = +document.getElementById('c-pf').value       || 0;
  const pt      = +document.getElementById('c-pt').value       || 0;

  /* Components */
  const hra   = Math.round(basic * hraPct / 100);
  const da    = Math.round(basic * daPct  / 100);
  const gross = basic + hra + da + special;
  const pf    = Math.round(basic * pfPct  / 100);

  /* Annual taxable (greedy tax slabs — new regime) */
  const annualTaxable = Math.max(0, (gross - hra) * 12 - 50000 - 150000);

  const newSlabs = [
    { min: 0,       max: 300000,   r: 0  },
    { min: 300001,  max: 700000,   r: 5  },
    { min: 700001,  max: 1000000,  r: 10 },
    { min: 1000001, max: 1200000,  r: 15 },
    { min: 1200001, max: 1500000,  r: 20 },
    { min: 1500001, max: Infinity, r: 30 }
  ];

  let annualTax = 0;
  newSlabs.forEach(s => {
    const filled = Math.max(0, Math.min(annualTaxable, s.max) - (s.min - 1));
    annualTax += filled * s.r / 100;
  });

  const monthlyTax = Math.round((annualTax * 1.04) / 12);  /* +4% cess */
  const net        = gross - pf - pt - monthlyTax;

  /* Render output cards */
  const items = [
    { label: 'Gross Salary',   val: '₹' + gross.toLocaleString('en-IN'),      color: '#00f5c4' },
    { label: 'Monthly Tax',    val: '₹' + monthlyTax.toLocaleString('en-IN'), color: '#ff6b35' },
    { label: 'PF Deduction',   val: '₹' + pf.toLocaleString('en-IN'),         color: '#7c3fff' },
    { label: 'Net Take-Home',  val: '₹' + net.toLocaleString('en-IN'),        color: '#ffd23f' },
  ];

  document.getElementById('calc-output').innerHTML = items.map(it => `
    <div class="output-card">
      <div class="oc-label">${it.label}</div>
      <div class="oc-val" style="color:${it.color}">${it.val}</div>
    </div>`).join('');
}

/* Init on load */
fullCalc();