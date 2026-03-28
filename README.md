# DAA × SALARY ENGINE
### Design & Analysis of Algorithms — Applied to Salary Computation

---

## 📁 Project Structure

```
DAA-SalaryEngine/
├── index.html                  ← Main entry point
├── README.md                   ← This file
├── favicon.ico                 ← Browser tab icon
│
├── assets/
│   ├── css/
│   │   └── style.css           ← All CSS styles
│   │
│   ├── js/
│   │   ├── main.js             ← Cursor, BG canvas, Scroll Reveal
│   │   ├── sorting.js          ← Bubble, Selection, Quick Sort
│   │   ├── greedy.js           ← Tax Bracket Optimizer
│   │   ├── dp.js               ← Dynamic Programming (Salary Growth)
│   │   ├── graph.js            ← Graph BFS + D&C Tree
│   │   ├── binarySearch.js     ← Binary Search Visualizer
│   │   ├── backtrack.js        ← Backtracking Bonus Allocator
│   │   ├── hashing.js          ← Hash Table Employee Lookup
│   │   └── calculator.js       ← Full Payroll Calculator
│   │
│   └── fonts/
│       ├── Inconsolata/
│       ├── SpaceMono/
│       └── Unbounded/
│
└── sections/
    ├── hero.html
    ├── sorting.html
    ├── greedy.html
    ├── dp.html
    ├── graph.html
    └── calculator.html
```

---

## 🧠 Algorithms Covered

| # | Algorithm         | Salary Application                        | Time Complexity   |
|---|-------------------|-------------------------------------------|-------------------|
| 1 | Bubble Sort       | Rank employees by CTC                     | O(n²)             |
| 2 | Selection Sort    | Find minimum salary employee              | O(n²)             |
| 3 | Quick Sort        | Fast in-place salary ranking              | O(n log n) avg    |
| 4 | Greedy            | Indian income tax bracket optimizer       | O(k)              |
| 5 | Dynamic Prog.     | Maximum salary growth path over years     | O(n·m)            |
| 6 | Divide & Conquer  | Payroll split tree (Merge Sort approach)  | O(n log n)        |
| 7 | Binary Search     | O(log n) salary lookup in sorted HR DB    | O(log n)          |
| 8 | Graph / BFS       | Org hierarchy payroll flow                | O(V + E)          |
| 9 | Backtracking      | Optimal bonus allocation (subset-sum)     | O(2ⁿ) worst       |
|10 | Hashing           | O(1) employee record lookup by ID         | O(1) avg          |

---

## 🚀 How to Run

### Method 1 — VS Code Live Server (Recommended)
```
1. Open DAA-SalaryEngine folder in VS Code
2. Right-click index.html
3. Click "Open with Live Server"
4. Opens at: http://127.0.0.1:5500/
```

### Method 2 — Python HTTP Server
```bash
cd Desktop/DAA-SalaryEngine
python -m http.server 8080
# Open: http://localhost:8080
```

### Method 3 — Direct Open
```
Double-click index.html
(Note: some features may need a local server)
```

---

## 🌐 Deploy to GitHub Pages
```
1. Create GitHub repo named: DAA-SalaryEngine
2. Push all files
3. Settings → Pages → Branch: main → /root
4. Live at: https://yourusername.github.io/DAA-SalaryEngine/
```

---

## 🎨 Tech Stack
- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations, grid, flexbox
- **Vanilla JavaScript** — Zero dependencies, zero frameworks
- **Canvas API** — Graph visualization, background particles
- **Google Fonts** — Space Mono, Unbounded, Inconsolata

---

*Built for DAA Subject Project — Algorithm Visualization on Salary Calculation*