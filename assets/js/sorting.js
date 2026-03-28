/* ============================================
   sorting.js — Bubble, Selection, Quick Sort
   assets/js/sorting.js
============================================ */

const employees = [
  { name: 'Aryan',  sal: 45 }, { name: 'Priya',  sal: 82 },
  { name: 'Raj',    sal: 31 }, { name: 'Sneha',  sal: 67 },
  { name: 'Vikram', sal: 95 }, { name: 'Aisha',  sal: 53 },
  { name: 'Dev',    sal: 28 }, { name: 'Riya',   sal: 74 },
  { name: 'Suresh', sal: 41 }, { name: 'Nisha',  sal: 88 }
];

let sortData    = [];
let sortTimeout = null;
let sorting     = false;

/* ── Render Bars ── */
function renderBars(data, active = [], sorted = []) {
  const cont = document.getElementById('bars');
  const max  = Math.max(...data.map(d => d.sal));
  cont.innerHTML = data.map((d, i) => {
    let cls = 'bar';
    if (active.includes(i))      cls += ' active';
    else if (sorted.includes(i)) cls += ' sorted';
    const h = Math.round((d.sal / max) * 160);
    return `<div class="${cls}" style="height:${h}px">
              <span class="bar-label">${d.name}<br>
              <span style="color:var(--accent4)">${d.sal}K</span></span>
            </div>`;
  }).join('');
}

/* ── Shuffle / Reset ── */
function resetSort() {
  clearTimeout(sortTimeout);
  sorting  = false;
  sortData = employees.map(e => ({ ...e }));
  for (let i = sortData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sortData[i], sortData[j]] = [sortData[j], sortData[i]];
  }
  renderBars(sortData, [], []);
  document.getElementById('sort-info').innerHTML = 'Shuffled! Click an algorithm.';
}

/* ── Sleep helper ── */
function sleep(ms) {
  return new Promise(r => { sortTimeout = setTimeout(r, ms); });
}

/* ── Bubble Sort ── */
async function bubbleSort(arr) {
  const n = arr.length;
  let sorted = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!sorting) return;
      renderBars(arr, [j, j + 1], sorted);
      document.getElementById('sort-info').innerHTML =
        `Comparing <span>${arr[j].name} (${arr[j].sal}K)</span> with <span>${arr[j + 1].name} (${arr[j + 1].sal}K)</span>`;
      await sleep(350);
      if (arr[j].sal > arr[j + 1].sal) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        renderBars(arr, [j, j + 1], sorted);
        await sleep(180);
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted = arr.map((_, i) => i);
  renderBars(arr, [], sorted);
  document.getElementById('sort-info').innerHTML =
    `✓ Sorted! <span>${arr.map(e => e.name).join(' → ')}</span>`;
}

/* ── Selection Sort ── */
async function selectionSort(arr) {
  const n = arr.length;
  let sorted = [];
  for (let i = 0; i < n - 1; i++) {
    if (!sorting) return;
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      renderBars(arr, [j, minIdx], sorted);
      document.getElementById('sort-info').innerHTML =
        `Finding min… Current min: <span>${arr[minIdx].name} (${arr[minIdx].sal}K)</span>`;
      await sleep(250);
      if (arr[j].sal < arr[minIdx].sal) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      renderBars(arr, [i], sorted);
      await sleep(200);
    }
    sorted.push(i);
  }
  sorted = arr.map((_, i) => i);
  renderBars(arr, [], sorted);
  document.getElementById('sort-info').innerHTML =
    `✓ Sorted by Selection! <span>${arr.map(e => e.name).join(' → ')}</span>`;
}

/* ── Quick Sort ── */
async function quickSort(arr, lo = 0, hi = arr.length - 1, sorted = []) {
  if (lo >= hi || !sorting) return;
  let pivot = arr[hi], i = lo - 1;
  document.getElementById('sort-info').innerHTML =
    `Pivot: <span>${pivot.name} (${pivot.sal}K)</span> — partitioning [${lo}..${hi}]`;
  for (let j = lo; j < hi; j++) {
    if (!sorting) return;
    renderBars(arr, [j, hi], sorted);
    await sleep(300);
    if (arr[j].sal <= pivot.sal) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  const pi = i + 1;
  sorted.push(pi);
  renderBars(arr, [pi], sorted);
  await sleep(250);
  await quickSort(arr, lo, pi - 1, sorted);
  await quickSort(arr, pi + 1, hi, sorted);
}

/* ── Entry point ── */
async function sortAlgo(type) {
  if (sorting) return;
  sorting = true;
  if (sortData.length === 0) resetSort();
  const arr = [...sortData];
  if (type === 'bubble')    await bubbleSort(arr);
  else if (type === 'selection') await selectionSort(arr);
  else {
    await quickSort(arr);
    renderBars(arr, [], arr.map((_, i) => i));
    document.getElementById('sort-info').innerHTML =
      `✓ Quick Sort complete! <span>${arr.map(e => e.name).join(' → ')}</span>`;
  }
  sorting  = false;
  sortData = arr;
}

/* Init on load */
resetSort();