document.addEventListener('DOMContentLoaded', function() {
  /* ==========================================================================
     1. CONFIRMAÇÃO DE PRESENÇA (RSVP)
     ========================================================================== */
  const modal = document.getElementById('rsvpModal');
  const openBtn = document.getElementById('rsvpBtn');
  const closeBtn = document.getElementById('closeRsvpBtn');
  const rsvpForm = document.getElementById('rsvpForm');

  if (openBtn) {
    openBtn.addEventListener('click', function() {
      modal.style.display = 'flex';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const numeroWhatsapp = "5511973968625"; 

      const nome = document.getElementById('nome').value;
      const celebracao = document.getElementById('presencaCelebracao').value;
      const recepcao = document.getElementById('presencaRecepcao').value;
      const acompanhantes = document.getElementById('acompanhantes').value;

      let mensagem = `*Confirmação de Presença - Casamento Aline & Rodrigo*\n\n`;
      mensagem += `👤 *Nome:* ${nome}\n`;
      mensagem += `⛪ *Celebração:* ${celebracao}\n`;
      mensagem += `🥂 *Recepção:* ${recepcao}\n`;
      mensagem += `👥 *Acompanhantes:* ${acompanhantes}`;

      const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
      window.open(urlWhatsapp, '_blank');
    });
  }

  /* ==========================================================================
     2. CONTROLE DA MÚSICA DE FUNDO
     ========================================================================== */
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  if (bgMusic && musicBtn) {
    const musicIcon = musicBtn.querySelector('i');

    function toggleMusic() {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicBtn.classList.add('playing');
          musicIcon.className = 'fa-solid fa-pause';
        }).catch((error) => {
          console.error("Erro ao tocar áudio:", error);
          alert("Não foi possível carregar a música. Verifique se o arquivo 'audio/musica.mp3' está na pasta correta.");
        });
      } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicIcon.className = 'fa-solid fa-music';
      }
    }

    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });

    const startAudioOnInteraction = () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicBtn.classList.add('playing');
          musicIcon.className = 'fa-solid fa-pause';
        }).catch(() => {
          // Autoplay bloqueado pelo navegador até interatividade do usuário
        });
      }
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
  }

  /* ==========================================================================
     3. CONTAGEM REGRESSIVA (12 de Dezembro de 2026 às 16:00)
     ========================================================================== */
  const targetDate = new Date("December 12, 2026 16:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");

      if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
      if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
      if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
      if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
      const countdownEl = document.getElementById("countdown");
      if (countdownEl) {
        countdownEl.innerHTML = "<span style='color: var(--primary-gold); font-size: 1rem; font-weight: 600;'>É HOJE O GRANDE DIA!</span>";
      }
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
