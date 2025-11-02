document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.card'));
    const scoreEl = document.getElementById('score');
    const resetBtn = document.getElementById('resetScore');
    let score = 0;
    const total = cards.length || 6;

    function updateScore() {
        if (scoreEl) scoreEl.textContent = `${score}/${total}`;

        if (score > 0 && score === total) {
            showConfetti();
            salvarPontuacaoLocal(score);
        }
    }

    cards.forEach(card => {
        const correct = card.dataset.answer;
        const btnFalse = card.querySelector('.btn-false');
        const btnTrue = card.querySelector('.btn-true');

        function finish(choice) {
            if (card.classList.contains('answered')) return;

            const isCorrect = (choice === correct);
            card.classList.add(isCorrect ? 'correct' : 'wrong');
            card.classList.add('answered');

            if (isCorrect) {
                score += 1;
                spawnConfetti(20);
            }

            if (btnFalse) btnFalse.disabled = true;
            if (btnTrue) btnTrue.disabled = true;

            updateScore();
        }

        if (btnFalse) btnFalse.addEventListener('click', () => finish('falso'));
        if (btnTrue) btnTrue.addEventListener('click', () => finish('verdadeiro'));
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            score = 0;
            cards.forEach(card => {
                card.classList.remove('answered', 'correct', 'wrong');
                const bf = card.querySelector('.btn-false');
                const bt = card.querySelector('.btn-true');
                if (bf) bf.disabled = false;
                if (bt) bt.disabled = false;
            });
            updateScore();
        });
    }

    updateScore();
});

// --- Confetes e animações ---
function spawnConfetti(count = 30) {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    const colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#00bcd4','#4caf50','#ffeb3b','#ff9800'];
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.classList.add('confetti');
        const size = 6 + Math.random() * 12;
        c.style.width = `${size}px`;
        c.style.height = `${Math.round(size*1.4)}px`;
        c.style.left = `${Math.random()*100}%`;
        c.style.top = `${-10 - Math.random()*30}px`;
        c.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        const duration = 1200 + Math.random()*1500;
        c.style.animation = `fall ${duration}ms linear forwards`;
        c.style.opacity = `${0.8 - Math.random()*0.4}`;
        container.appendChild(c);
        setTimeout(()=>c.remove(), duration+200);
    }
}

function showConfetti() {
    spawnConfetti(80);
    const ze = document.getElementById('ze-gotinha');
    if (ze) { ze.style.display = 'block'; setTimeout(()=>ze.style.display='none',5000);}
    const trophy = document.getElementById('trophy');
    if (trophy){ trophy.style.display='block'; setTimeout(()=>trophy.style.display='none',5000);}
}

// --- Salvar pontuação ---
function salvarPontuacaoLocal(scoreToSend){
    const id_cliente = localStorage.getItem("id_cliente");
    if (!id_cliente) {
        console.warn("⚠️ Nenhum id_cliente no localStorage");
        return;
    }

    fetch("http://localhost:3000/usuarios/salvar-pontuacao", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id_cliente, score: scoreToSend})
    })
    .then(res=>{
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    })
    .then(data=>console.log("✅ Pontuação salva:", data))
    .catch(err=>console.error("❌ Erro ao salvar pontuação:", err));
}

// --- Navegação ---
function irParaPrincipal(){ window.location.href="../principal/principal.html";}
