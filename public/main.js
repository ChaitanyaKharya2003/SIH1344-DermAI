document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const resultText = document.getElementById('disease');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const formData = new FormData(form);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                resultText.textContent = `Predicted Disease: ${data.disease}`;
                treatmentText.textContent = `Treatment: ${data.treatment}`;
            } else {
                resultText.textContent = 'Error occurred during prediction.';
            }
        } catch (error) {
            console.error(error);
            resultText.textContent = 'An error occurred.';
        }
    });
});
