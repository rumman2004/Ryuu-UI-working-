const fs = require('fs');
const path = 'd:/Rumman Ahmed/BCA/Projects/Not Deployed/Ui library/frontend/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

// The structural hex colors to replace
const replacements = {
    'radial-gradient(ellipse at 50% 50%, transparent 30%, #0e0e10 80%)': 'radial-gradient(ellipse at 50% 50%, transparent 30%, var(--bg-primary) 80%)',
    'style={{ color: "#f9f5f8" }}': 'style={{ color: "var(--text-primary)" }}',
    'style={{ color: "#adaaad" }}': 'style={{ color: "var(--text-secondary)" }}',
    'style={{ color: "#767577" }}': 'style={{ color: "var(--text-muted)" }}',
    'color: "#e4e1e6"': 'color: "var(--text-primary)"',
    'e.currentTarget.style.color = "#a3a6ff";': 'e.currentTarget.style.color = "var(--color-accent-light, #a3a6ff)";',
    'e.currentTarget.style.color = "#e4e1e6";': 'e.currentTarget.style.color = "var(--text-primary)";'
};

for (const [key, value] of Object.entries(replacements)) {
    // Escape string for regex if needed, wait, standard split/join is easier for exact string match
    content = content.split(key).join(value);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Home.jsx structural colors replaced successfully.');
