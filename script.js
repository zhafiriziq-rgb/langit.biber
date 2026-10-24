// 1. Buka/tutup detail film
document.querySelectorAll('.row').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});

// 2. Filter film berdasarkan genre
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    document.querySelectorAll('.item').forEach(it => {
      it.classList.toggle('hide', f !== 'all' && it.dataset.genre !== f);
    });
  });
});

// 3. Tandai menu sesuai bagian yang sedang dilihat
const links = document.querySelectorAll('.nav nav a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => io.observe(s));

// 4. Form pesan (tersimpan sementara di halaman saja)
const form = document.getElementById('msgForm');
const nama = document.getElementById('nama');
const pesan = document.getElementById('pesan');
const count = document.getElementById('count');
const status = document.getElementById('status');
const wall = document.getElementById('wall');

pesan.addEventListener('input', () => count.textContent = pesan.value.length);

form.addEventListener('submit', e => {
  e.preventDefault();
  status.className = '';
  if (!nama.value.trim() || !pesan.value.trim()) {
    status.textContent = 'Isi nama dan pesan terlebih dahulu.';
    status.className = 'err';
    return;
  }
  const li = document.createElement('li');
  const b = document.createElement('b');
  b.textContent = nama.value.trim();
  const p = document.createElement('p');
  p.textContent = pesan.value.trim();
  li.append(b, p);
  wall.prepend(li);
  form.reset();
  count.textContent = 0;
  status.textContent = 'Pesan terkirim.';
});
