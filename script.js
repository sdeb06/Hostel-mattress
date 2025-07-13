const API_URL = "https://script.google.com/macros/s/AKfycbz9kPcm5Spn_k_4QqvXy7kBmT5BUiD2Nkit1v3JKWn7i2ulUzTCh4ZJcAeXEjVKlXYp/exec";

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const data = {
    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    mattress: document.getElementById("mattress").value,
    phone: document.getElementById("phone").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(res => {
    alert("✅ Submitted successfully!");
    document.getElementById("form").reset();
  })
  .catch(err => {
    alert("❌ Error submitting");
    console.error(err);
  });
});

document.getElementById("searchBtn").addEventListener("click", function () {
  const query = document.getElementById("search").value;
  fetch(`${API_URL}?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        alert("No results found.");
      } else {
        const result = data.map(d => `🧍 ${d.name} (${d.roll})\n🛏 Mattress: ${d.mattress}\n📞 ${d.phone}`).join("\n\n");
        alert(result);
      }
    })
    .catch(err => {
      alert("Error searching");
      console.error(err);
    });
});
