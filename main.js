// Carregar o JSON com os dados dos capítulos
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const accordionBody = document.querySelector('.accordion-body');

    for (const capitulo in data) {
      if (data.hasOwnProperty(capitulo)) {
        const capituloData = data[capitulo];

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flashcard');

        cardDiv.innerHTML = `
          <div class="flashcard__inner">
            <div class="flashcard__face flashcard__face--front">
              <h2>${capituloData.front}</h2>
            </div>
            <div class="flashcard__face flashcard__face--back">
              <div class="flashcard__content">
                <div class="flashcard__header">
                  <h2>${capituloData.back}</h2>
                </div>
              </div>
            </div>
          </div>
        `;

        accordionBody.appendChild(cardDiv);
      }
    }
  })
  .catch(error => {
    console.error('Erro ao carregar os dados do JSON:', error);
  });

const flashcards = document.querySelectorAll(".flashcard__inner");

flashcards.forEach((flashcard) => {
  flashcard.addEventListener("click", function (e) {
    flashcard.classList.toggle("is-flipped");
  });
});
