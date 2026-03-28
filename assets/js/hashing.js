/* ============================================
   hashing.js — Employee O(1) Lookup
   assets/js/hashing.js
============================================ */

const hashEmployees = [
  { id: 'E001', name: 'Aryan Kumar',  dept: 'Engineering', sal: '₹9.2L',  exp: '4yr' },
  { id: 'E002', name: 'Priya Sharma', dept: 'Product',     sal: '₹8.5L',  exp: '3yr' },
  { id: 'E003', name: 'Raj Patel',    dept: 'Finance',     sal: '₹7.1L',  exp: '5yr' },
  { id: 'E004', name: 'Sneha Gupta',  dept: 'HR',          sal: '₹6.4L',  exp: '2yr' },
  { id: 'E005', name: 'Vikram Singh', dept: 'Engineering', sal: '₹10.5L', exp: '6yr' },
  { id: 'E006', name: 'Aisha Khan',   dept: 'Product',     sal: '₹9.8L',  exp: '4yr' },
  { id: 'E007', name: 'Dev Menon',    dept: 'Design',      sal: '₹8.2L',  exp: '3yr' },
];

const TABLE_SIZE = 7;
const hashTable  = Array(TABLE_SIZE).fill(null).map(() => []);

/* Hash function: polynomial rolling hash */
function hashFn(key) {
  let h = 0;
  for (let c of key) h = (h * 31 + c.charCodeAt(0)) % TABLE_SIZE;
  return h;
}

/* Build table */
hashEmployees.forEach(e => {
  const idx = hashFn(e.id);
  hashTable[idx].push(e);
});

function renderHashTable(highlightIdx = -1) {
  document.getElementById('hash-table-vis').innerHTML = hashTable.map((slot, i) => `
    <div class="hash-slot ${slot.length ? 'occupied' : ''} ${i === highlightIdx ? 'highlight' : ''}">
      <div class="hash-idx ${i === highlightIdx ? 'active' : ''}">${i}</div>
      ${slot.length
        ? slot.map(e => `
          <div>
            <span class="hash-key">${e.id}</span>
            <span class="hash-val">${e.name} — <span>${e.sal}</span></span>
            ${slot.length > 1 ? '<span class="hash-chain">→ chain</span>' : ''}
          </div>`).join('')
        : `<span style="color:var(--border);font-size:.6rem">— empty —</span>`}
    </div>`).join('');
}

function hashLookup() {
  const key     = document.getElementById('hash-search').value.trim().toUpperCase();
  const idx     = hashFn(key);
  renderHashTable(idx);

  const found = hashTable[idx].find(e => e.id === key);

  /* Step-by-step explanation */
  const charCodes = key.split('').map(c => c.charCodeAt(0)).join(' + ');
  document.getElementById('hash-steps').innerHTML = `
    <div class="hs">hash("${key}") = ${charCodes} mod ${TABLE_SIZE} = <strong style="color:var(--accent4)">${idx}</strong></div>
    <div class="hs">Probe slot [${idx}] → ${hashTable[idx].length} record(s) found</div>
    <div class="hs">${found ? `Match: ${found.name}` : `No match for "${key}" at slot [${idx}]`}</div>`;

  document.getElementById('hash-result').innerHTML = found
    ? `<div style="color:var(--accent1);font-weight:700;margin-bottom:10px;">✓ Record Found — O(1) lookup</div>
       <div style="font-size:.7rem;line-height:2;font-family:'Inconsolata',monospace">
         <div><span style="color:var(--text2)">Name: </span><span style="color:var(--accent4)">${found.name}</span></div>
         <div><span style="color:var(--text2)">Dept: </span>${found.dept}</div>
         <div><span style="color:var(--text2)">Salary: </span><span style="color:var(--accent1)">${found.sal}</span></div>
         <div><span style="color:var(--text2)">Experience: </span>${found.exp}</div>
         <div><span style="color:var(--text2)">Hash Index: </span><span style="color:var(--accent3)">[${idx}]</span></div>
       </div>`
    : `<span style="color:var(--accent2)">✗ Employee "${key}" not found. Slot [${idx}] searched in O(1).</span>`;
}

/* Init */
renderHashTable();