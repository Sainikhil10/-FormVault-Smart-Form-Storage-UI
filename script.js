function submitForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  const data = { name, email, message };
  const records = JSON.parse(localStorage.getItem("formVault") || "[]");
  records.push(data);
  localStorage.setItem("formVault", JSON.stringify(records));

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';

  renderTable();
}

function deleteRecord(index) {
  const records = JSON.parse(localStorage.getItem("formVault") || "[]");
  records.splice(index, 1);
  localStorage.setItem("formVault", JSON.stringify(records));
  renderTable();
}

function renderTable() {
  const records = JSON.parse(localStorage.getItem("formVault") || "[]");
  const tbody = document.querySelector("#records tbody");
  tbody.innerHTML = '';
  records.forEach((rec, index) => {
    const row = `<tr>
      <td>${rec.name}</td>
      <td>${rec.email}</td>
      <td>${rec.message}</td>
      <td><button onclick="deleteRecord(${index})">❌</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

window.onload = renderTable;
