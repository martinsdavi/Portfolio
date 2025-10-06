// scripts.js - controla a abertura do modal de projetos
document.addEventListener('DOMContentLoaded', function(){
  const cards = document.querySelectorAll('.project-card');
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Fechar">×</button>
      <div class="modal-image"><img src="" alt=""></div>
      <div class="modal-content">
        <h3></h3>
        <p class="modal-desc"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // theme handling
  const themeToggle = document.getElementById('theme-toggle');
  let lastFocused = null; // store last focused element for modal
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    if(themeToggle) themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    if(themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  // init theme from localStorage or system
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme){ applyTheme(savedTheme); } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){ applyTheme('dark'); } else { applyTheme('light'); }
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  const modalCard = modal.querySelector('.modal-card');
  const modalImg = modal.querySelector('.modal-image img');
  const modalTitle = modal.querySelector('.modal-content h3');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalClose = modal.querySelector('.modal-close');

  function openModal(card){
    const title = card.dataset.title || card.querySelector('h3').innerText;
    const img = card.dataset.img || '';
    const desc = card.dataset.desc || card.querySelector('p').innerText || '';

    modalImg.src = img;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    modal.classList.add('open');
    // lock scroll
    document.body.style.overflow = 'hidden';
    // set focus to close button for accessibility
    modalClose.focus();
    // store last focused element
    lastFocused = card;
  }

  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // return focus
    try{ lastFocused && lastFocused.focus(); }catch(e){}
  }

  cards.forEach(c => {
    c.addEventListener('click', function(e){
      // if clicked the internal button, still open
      openModal(c);
    });
    // open with Enter or Space when focused
    c.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(c); }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    if(e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeModal();
  });

  // focus trap: keep focus inside modal when open
  modal.addEventListener('keydown', function(e){
    if(e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if(focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length -1];
    if(e.shiftKey){
      if(document.activeElement === first){ last.focus(); e.preventDefault(); }
    } else {
      if(document.activeElement === last){ first.focus(); e.preventDefault(); }
    }
  });

  // contact form handling
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if(contactForm){
    contactForm.addEventListener('submit', async function(evt){
      evt.preventDefault();
      const data = {
        name: contactForm.name.value.trim(),
        email: contactForm.email.value.trim(),
        message: contactForm.message.value.trim()
      };
      if(!data.name || !data.email || !data.message){
        formStatus.textContent = 'Preencha todos os campos.';
        return;
      }
      formStatus.textContent = 'Enviando...';
      try{
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) });
        const json = await res.json();
        if(res.ok && json.ok){
          formStatus.textContent = 'Mensagem enviada — obrigado!';
          contactForm.reset();
        } else {
          formStatus.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
          console.error(json);
        }
      }catch(err){
        formStatus.textContent = 'Erro ao enviar. Verifique sua conexão.';
        console.error(err);
      }
      setTimeout(()=>{ formStatus.textContent = ''; }, 5000);
    });
  }
});
