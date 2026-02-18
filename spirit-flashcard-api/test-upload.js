const fs = require('fs');
const path = require('path');

async function testUpload() {
  const FormData = (await import('form-data')).default;
  const fetch = (await import('node-fetch')).default;

  const form = new FormData();
  const filePath = path.join(__dirname, 'test_flashcards.txt');

  // Create a dummy file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'Topic: The Solar System\nQuestion: What is the largest planet?\nAnswer: Jupiter\nQuestion: What planet is known as the Red Planet?\nAnswer: Mars',
    );
  }

  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await fetch('http://localhost:3000/decks/ai/file', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });

    const data = await response.text();
    console.log('Response status:', response.status);
    console.log('Response body:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testUpload();
