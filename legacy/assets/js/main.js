document.getElementById('cs-year').textContent = new Date().getFullYear();

(function () {
  try {
    var n = document.getElementById('csParticles'); if (!n || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; var t = n.getContext('2d'); var i, a; function r() { i = n.width = window.innerWidth; a = n.height = window.innerHeight } r(); window.addEventListener('resize', r); var o = 120; var l = []; for (var u = 0; u < o; u++) { l.push({ x: Math.random() * i, y: Math.random() * a, r: Math.random() * 2 + .5, dx: (Math.random() - .5) * .25, dy: -(Math.random() * .15 + .08), o: Math.random() * .4 + .15, h: Math.random() > .35 }) } function s() { t.clearRect(0, 0, i, a); for (var e = 0; e < o; e++) { var _ = l[e]; _.x += _.dx; _.y += _.dy; if (_.y < -5) { _.y = a + 5; _.x = Math.random() * i } if (_.x < -5 || _.x > i + 5) { _.x = Math.random() * i } t.beginPath(); t.arc(_.x, _.y, _.r, 0, Math.PI * 2); t.fillStyle = _.h ? 'rgba(255,102,0,' + _.o + ')' : 'rgba(255,255,255,' + (_.o * .4) + ')'; t.fill() } requestAnimationFrame(s) } s()
  } catch(e) {}
})();

(function () {
  var btn = document.getElementById('csEmailBtn'), field = document.getElementById('csEmail'), fb = document.getElementById('csEmailFb'), re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (btn) btn.addEventListener('click', function () {
    var val = field.value.trim();
    if (!re.test(val)) { field.style.borderColor = '#FF5F56'; field.focus(); return }
    field.style.borderColor = '';
    btn.textContent = 'Enviando...'; btn.disabled = true;
    btn.style.opacity = '.5';
    var x = new XMLHttpRequest();
    x.open('POST', 'https://api.web3forms.com/submit');
    x.setRequestHeader('Content-Type', 'application/json');
    x.timeout = 10000;
    x.onload = function () {
      if (x.status === 200) {
        btn.textContent = '✓ Enviado';
        btn.style.opacity = '.7';
        fb.textContent = 'Recebemos seu interesse! Entraremos em contato.';
        fb.style.opacity = '1';
        setTimeout(function () {
          btn.textContent = 'Avise-me'; btn.disabled = false;
          btn.style.opacity = '1';
        }, 4000);
      } else {
        btn.textContent = 'Avise-me'; btn.disabled = false;
        btn.style.opacity = '1';
        fb.textContent = 'Erro ao enviar. Tente novamente.';
        fb.style.opacity = '1';
      }
    };
    x.onerror = function () {
      btn.textContent = 'Avise-me'; btn.disabled = false;
      btn.style.opacity = '1';
      fb.textContent = 'Erro de rede. Tente novamente.';
      fb.style.opacity = '1';
    };
    x.ontimeout = function () {
      btn.textContent = 'Avise-me'; btn.disabled = false;
      btn.style.opacity = '1';
      fb.textContent = 'Tempo esgotado. Tente novamente.';
      fb.style.opacity = '1';
    };
    x.send(JSON.stringify({ access_key: '37002b5f-a65b-4095-90a5-4bbbcb28beff', email: val, subject: 'Novo lead - Em breve NORDIA', from_name: 'Lead via site' }));
  });
  if (field) field.addEventListener('input', function () { field.style.borderColor = ''; });
})();
