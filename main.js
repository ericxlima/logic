fetch('https://raw.githubusercontent.com/ericxlima/logic/main/data.json')
  .then(response => response.json())
  .then(data => {
    const accordion = document.querySelector('.accordion');

    let index = 1;

    for (const capitulo in data) {
      if (data.hasOwnProperty(capitulo)) {
        const capituloData = data[capitulo];
        const numCartas = capituloData.length; // Conta o número de cartas

        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        accordionItem.innerHTML = `
          <div class="accordion-header">
            <h3 class="mb-0">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                ${capitulo} (${numCartas} cartas)
              </button>
            </h3>
          </div>
          <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body list-of-cards">
            </div>
          </div>
        `;

        accordion.appendChild(accordionItem);

        const accordionBody = accordionItem.querySelector('.accordion-body');

        if (Array.isArray(capituloData)) {
          capituloData.forEach((carta, cartaIndex) => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('flashcard');

            cardDiv.innerHTML = `
              <div class="flashcard__inner">
                <div class="flashcard__face flashcard__face--front">
                  <h2>${carta.front}</h2>
                </div>
                <div class="flashcard__face flashcard__face--back">
                  <div class="flashcard__content">
                    <div class="flashcard__header">
                      <h2>${carta.front}</h2>
                    </div>
                    <div class="flashcard__body">
                      <p>${carta.back}</p>
                    </div>
                  </div>
                </div>
              </div>
            `;

            accordionBody.appendChild(cardDiv);

            // Adicione o evento de clique dentro do loop para cada carta
            const flashcard = cardDiv.querySelector(".flashcard__inner");

            flashcard.addEventListener("click", function (e) {
              flashcard.classList.toggle("is-flipped");
            });
          });
        }
        index++;
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

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scroll-to-top");

  // Mostrar o botão quando o usuário rolar a página
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });

  // Rolar suavemente para o topo quando o botão for clicado
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


function filterCards(searchText) {
  const accordionContainer = document.querySelector('.accordion-container');
  const searchResultsContainer = document.querySelector('.search-results-container');
  const cardList = document.querySelector(".list-of-cards-2");

  // Limpa a lista antes de adicionar os cartões filtrados
  cardList.innerHTML = "";

  // Exibir ou ocultar divs com base nos resultados da pesquisa
  if (searchText.length > 0) {
    accordionContainer.style.display = "none";
    searchResultsContainer.style.display = "block";
  } else {
    accordionContainer.style.display = "block";
    searchResultsContainer.style.display = "none";
  }

  const filteredCards = [];

  allCards.forEach((capituloData) => {
    const capitulo = capituloData[0].chapter; // Adapte conforme necessário

    const filteredCapituloData = capituloData.filter((carta) => {
      return carta.front.toLowerCase().includes(searchText.toLowerCase());
    });

    if (filteredCapituloData.length > 0) {
      filteredCards.push({ [capitulo]: filteredCapituloData });

      filteredCapituloData.forEach((carta) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('flashcard');

        cardDiv.innerHTML = `
          <div class="flashcard__inner">
            <div class="flashcard__face flashcard__face--front">
              <h2>${carta.front}</h2>
            </div>
            <div class="flashcard__face flashcard__face--back">
              <div class="flashcard__content">
                <div class="flashcard__header">
                  <h2>${carta.front}</h2>
                </div>
                <div class="flashcard__body">
                  <p>${carta.back}</p>
                </div>
              </div>
            </div>
          </div>
        `;

        cardList.appendChild(cardDiv);

        // Adicione o evento de clique dentro do loop para cada carta
        const flashcard = cardDiv.querySelector(".flashcard__inner");

        flashcard.addEventListener("click", function (e) {
          flashcard.classList.toggle("is-flipped");
        });
      });
    }
  });

  return filteredCards;
}



const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  filterCards(searchText);
});
