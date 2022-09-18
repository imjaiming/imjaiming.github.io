const text = document.querySelectorAll(".path");

for (let i = 0; i < text.length; i++) {
  console.log(`text number ${i} lenth is ${text[i].getTotalLength()}`);
}

const lastWord = document.querySelector("#the10");
const animation = document.querySelector("div.animation");
lastWord.addEventListener("animationend", () => {
  animation.style =
    "transition: all 1s ease; opacity: 0; pointer-events: none;";
});

// console.log(lastword);

// console.log(text[0].getTotalLength());
