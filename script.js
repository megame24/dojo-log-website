document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.get-notified');

  forms.forEach(form => {
    const successMessage = form.nextElementSibling;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      fetch('https://api.dojologs.com/mailing-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        emailInput.value = '';
        successMessage.style.display = 'block';
        setTimeout(() => { successMessage.style.display = 'none'; }, 5000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });
});
