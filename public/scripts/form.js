const profileForm = document.querySelector('.form-signin form');

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const response = await fetch('/api/directory', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(new FormData(profileForm)),
})

  const results = await response.json();

  if (results.error) {
    alert(results.error);
  } else {
    location.replace('/directory');
  }
});
