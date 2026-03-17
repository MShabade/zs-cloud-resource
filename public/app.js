const table = document.getElementById('table');
const msg = document.getElementById('msg');
const form = document.getElementById('form');
const q = document.getElementById('search');

document.getElementById('load').onclick = load;
form.onsubmit = save;

async function load() {
  const r = await fetch('/api/resources?q=' + encodeURIComponent(q.value));
  const data = await r.json();
  table.innerHTML = '<tr><th>id</th><th>name</th><th>cpu</th><th>memory</th><th>storage</th><th>billing</th><th></th></tr>' +
    data.map(x => `<tr><td>${x.id}</td><td>${x.name}</td><td>${x.cpu}</td><td>${x.memory}</td><td>${x.storage}</td><td>${x.billing}</td><td><button onclick="del(${x.id})">Delete</button></td></tr>`).join('');
}

async function save(e) {
  e.preventDefault();
  const body = {
    id: Number(id.value),
    name: name.value.trim(),
    cpu: Number(cpu.value),
    memory: Number(memory.value),
    storage: Number(storage.value),
    billing: Number(billing.value)
  };
  const r = await fetch('/api/resources/' + body.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  msg.textContent = 'update: ' + (await r.json()).message;
  load();
}

async function del(id) {
  const r = await fetch('/api/resources/' + id, { method: 'DELETE' });
  msg.textContent = 'delete: ' + (await r.json()).message;
  load();
}

load();
