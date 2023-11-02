const flashcards = document.querySelectorAll(".flashcard__inner");

flashcards.forEach((flashcard) => {
  flashcard.addEventListener("click", function (e) {
    flashcard.classList.toggle("is-flipped");
  });
});
