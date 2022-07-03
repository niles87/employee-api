// Defining async function
const getapi = async (url) => {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  let data = await response.json();

  if (response) {
    hideloader();
  }
  return data;
};
// Function to hide the loader
const hideloader = () => {
  document.getElementById('loading').style.display = 'none';
};
// Calling that async function
getapi('/api/directory/').then((data) => {
  let card = ` `;
  // Loop to access all rows
  for (let r of data) {
    card += `
    <div class="col">
    <div class="card">
    <div class="img-container">
    <img
      src="${r.avatar}"
      class="card-img-top img-fluid"
      alt="${r.first_name} ${r.last_name} profile picture"
    />
  </div>
  <div class="card-body">
    <h2 class="card-title">${r.first_name} ${r.last_name}</h2>

    <p class="card-text">
      <span class="card-bold">Phone:</span> ${r.phone}
    </p>
    <p class="card-text">
      <span class="card-bold">Street:</span> ${r.street}
    </p>
    <p class="card-text">
      <span class="card-bold">City:</span> ${r.city}
    </p>
    <p class="card-text">
      <span class="card-bold">State / Providence:</span> ${r.state}
    </p>
  </div>
  </div>
</div>`;
  }
  // Setting innerHTML as card variable
  document.getElementById('card-group').innerHTML = card;
});

getapi('/login/auth/session').then(({ first_name, last_name }) => {
  if (first_name) {
    let fullName = `Welcome ${first_name} ${last_name}`;
  
    document.getElementById('greeting').textContent = fullName;
  }
});
