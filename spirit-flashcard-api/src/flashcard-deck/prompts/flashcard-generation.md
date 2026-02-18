Generate flashcards from the provided content (text, image, or PDF).

## Constraints

1. Return strictly a JSON array of objects.
2. Each object must have "question" and "answer" keys.
3. Do not include any markdown formatting like `json ... ` in the response, just the raw JSON array.
4. Ensure the questions are concise and the answers are accurate based on the source material.
