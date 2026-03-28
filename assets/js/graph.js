/* ============================================
   graph.js — Org Hierarchy Salary Flow (BFS)
   assets/js/graph.js
============================================ */

/* ── Divide & Conquer Tree (also lives here) ── */
const treeData = {
  label: 'Full Payroll', val: '₹82.3L', cls: 'root teal',
  children: [
    {
      label: 'Dept A', val: '₹38.1L', cls: 'level1 violet',
      children: [
        { label: 'Team A1', val: '₹18.5L', cls: 'level2 gold', children: [
          { label: 'E: Aryan\n₹9.2L',  cls: 'leaf orange' },
          { label: 'E: Priya\n₹9.3L',  cls: 'leaf orange' }
        ]},
        { label: 'Team A2', val: '₹19.6L', cls: 'level2 gold', children: [
          { label: 'E: Raj\n₹10.1L',   cls: 'leaf orange' },
          { label: 'E: Sneha\n₹9.5L',  cls: 'leaf orange' }
        ]}
      ]
    },
    {
      label: 'Dept B', val: '₹44.2L', cls: 'level1 violet',
      children: [
        { label: 'Team B1', val: '₹22.0L', cls: 'level2 gold', children: [
          { label: 'E: Vikram\n₹11.5L', cls: 'leaf orange' },
          { label: 'E: Aisha\n₹10.5L',  cls: 'leaf orange' }
        ]},
        { label: 'Team B2', val: '₹22.2L', cls: 'level2 gold', children: [
          { label: 'E: Dev\n₹10.8L',    cls: 'leaf orange' },
          { label: 'E: Riya\n₹11.4L',   cls: 'leaf orange' }
        ]}
      ]
    }
  ]
};

function makeNode(node) {
  const parts    = node.label.split('\n');
  const valColor = node.cls.includes('teal')   ? 'teal'   :
                   node.cls.includes('violet') ? 'violet' :
                   node.cls.includes('gold')   ? 'gold'   : 'orange';

  const box = `<div class="node-box ${node.cls}">
    <div class="node-label">${parts[0]}</div>
    ${node.val
      ? `<div class="node-val ${valColor}">${node.val}</div>`
      : `<div class="node-val ${valColor}">${parts[1] || ''}</div>`}
  </div>`;

  if (!node.children) return `<div class="tree-node">${box}</div>`;

  const children = node.children.map(makeNode).join('');
  return `<div class="tree-node">
    ${box}
    <div class="connector"></div>
    <div style="position:relative">
      <div class="h-connector" style="left:25%;right:25%;"></div>
      <div class="children-row">${children}</div>
    </div>
  </div>`;
}

function buildTree() {
  document.getElementById('dnc-tree').innerHTML = makeNode(treeData);
}

function mergeTree() {
  document.querySelectorAll('.node-box').forEach((el, i) => {
    setTimeout(() => {
      el.style.transform = 'scale(1.05)';
      setTimeout(() => el.style.transform = '', 300);
    }, i * 120);
  });
}

buildTree();

/* ── Org Graph Canvas (BFS visualization) ── */
(function () {
  const canvas = document.getElementById('org-canvas');
  if (!canvas) return;
  const wrap = document.getElementById('org-canvas-wrap');
  const ctx  = canvas.getContext('2d');
  canvas.width  = wrap.offsetWidth;
  canvas.height = 360;

  const cw = canvas.width;
  const ch = canvas.height;

  const nodes = [
    { id: 0,  name: 'CEO\nRaghav',      sal: '120L', color: '#00f5c4', x: cw / 2,      y: 50,  r: 36 },
    { id: 1,  name: 'CTO\nDivya',        sal: '85L',  color: '#00f5c4', x: cw * 0.25,   y: 140, r: 30 },
    { id: 2,  name: 'CFO\nMohan',        sal: '82L',  color: '#00f5c4', x: cw * 0.75,   y: 140, r: 30 },
    { id: 3,  name: 'Eng Mgr\nNeha',     sal: '42L',  color: '#7c3fff', x: cw * 0.12,   y: 240, r: 25 },
    { id: 4,  name: 'Prod Mgr\nArjun',   sal: '38L',  color: '#7c3fff', x: cw * 0.38,   y: 240, r: 25 },
    { id: 5,  name: 'Fin Mgr\nLakshmi',  sal: '35L',  color: '#7c3fff', x: cw * 0.62,   y: 240, r: 25 },
    { id: 6,  name: 'HR Mgr\nSuresh',    sal: '30L',  color: '#7c3fff', x: cw * 0.88,   y: 240, r: 25 },
    { id: 7,  name: 'Dev\nRiya',          sal: '18L',  color: '#ffd23f', x: cw * 0.07,   y: 330, r: 20 },
    { id: 8,  name: 'Dev\nKaran',         sal: '15L',  color: '#ffd23f', x: cw * 0.22,   y: 330, r: 20 },
    { id: 9,  name: 'Design\nAnna',       sal: '20L',  color: '#ffd23f', x: cw * 0.38,   y: 330, r: 20 },
    { id: 10, name: 'Analyst\nVijay',     sal: '16L',  color: '#ff6b35', x: cw * 0.54,   y: 330, r: 20 },
    { id: 11, name: 'Acct\nMeera',        sal: '14L',  color: '#ff6b35', x: cw * 0.70,   y: 330, r: 20 },
    { id: 12, name: 'Recruit\nSam',       sal: '12L',  color: '#ff6b35', x: cw * 0.88,   y: 330, r: 20 },
  ];

  const edges = [
    [0,1],[0,2],[1,3],[1,4],[2,5],[2,6],
    [3,7],[3,8],[4,9],[5,10],[5,11],[6,12]
  ];

  let hovered = -1;

  function draw() {
    ctx.clearRect(0, 0, cw, ch);

    /* edges */
    edges.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b];
      const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
      grad.addColorStop(0, na.color + '88');
      grad.addColorStop(1, nb.color + '44');
      ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();

      /* arrowhead */
      const angle = Math.atan2(nb.y - na.y, nb.x - na.x);
      const ax = nb.x - Math.cos(angle) * nb.r;
      const ay = nb.y - Math.sin(angle) * nb.r;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - 8 * Math.cos(angle - 0.4), ay - 8 * Math.sin(angle - 0.4));
      ctx.lineTo(ax - 8 * Math.cos(angle + 0.4), ay - 8 * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fillStyle = nb.color + '88';
      ctx.fill();
    });

    /* nodes */
    nodes.forEach((n, i) => {
      const isH = hovered === i;
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      grd.addColorStop(0, n.color + '30');
      grd.addColorStop(1, n.color + '08');
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.strokeStyle = n.color; ctx.lineWidth = isH ? 2.5 : 1.5; ctx.stroke();

      const lines = n.name.split('\n');
      ctx.fillStyle = isH ? '#fff' : n.color;
      ctx.font = `bold ${n.r > 24 ? 8 : 7}px Inconsolata`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(lines[0], n.x, n.y - 5);
      ctx.fillStyle = n.color + 'cc';
      ctx.font = `${n.r > 24 ? 7 : 6}px Inconsolata`;
      ctx.fillText(lines[1] || '', n.x, n.y + 5);
      ctx.fillStyle = '#ffd23f';
      ctx.font = `bold ${n.r > 24 ? 8 : 7}px Inconsolata`;
      ctx.fillText(n.sal, n.x, n.y + (n.r > 24 ? 18 : 16));
    });
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    hovered = nodes.findIndex(n => Math.hypot(n.x - mx, n.y - my) < n.r + 4);
    draw();
  });

  draw();
})();