/* =========================================================
   RAFAY — 08 • 10 • 2026
   Interactive Birthday Archive
========================================================= */

const pages = [...document.querySelectorAll(".page")];
const totalPages = pages.length;

let currentPage = 0;
let isTransitioning = false;

const music = document.getElementById("music");
const ambient = document.getElementById("ambient");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.querySelector(".music-icon");

let musicStarted = false;
let musicPlaying = false;

/* =========================================================
   MUSIC
========================================================= */

function startMusic() {
  if (musicStarted) return;

  musicStarted = true;

  music.volume = 0.65;
  ambient.volume = 0.12;

  const musicPromise = music.play();

  if (musicPromise) {
    musicPromise
      .then(() => {
        musicPlaying = true;
        updateMusicButton();
      })
      .catch(() => {
        musicStarted = false;
      });
  }

  ambient.play().catch(() => {});
}

function updateMusicButton() {
  if (musicPlaying) {
    musicIcon.textContent = "♫";
    musicToggle.classList.add("playing");
  } else {
    musicIcon.textContent = "×";
    musicToggle.classList.remove("playing");
  }
}

musicToggle.addEventListener("click", () => {
  startMusic();

  if (musicPlaying) {
    music.pause();
    ambient.pause();
    musicPlaying = false;
  } else {
    music.play().catch(() => {});
    ambient.play().catch(() => {});
    musicPlaying = true;
  }

  updateMusicButton();
});

/* =========================================================
   PAGE TRANSITIONS
========================================================= */

function goToPage(index) {
  if (isTransitioning) return;
  if (index < 0 || index >= totalPages) return;
  if (index === currentPage) return;

  isTransitioning = true;

  const oldPage = pages[currentPage];
  const newPage = pages[index];

  oldPage.classList.add("leaving");

  setTimeout(() => {
    oldPage.classList.remove("active", "leaving");

    newPage.classList.add("active");

    currentPage = index;

    updateProgress();
    resetPageInteractions(index);

    setTimeout(() => {
      isTransitioning = false;
    }, 650);
  }, 450);

  startMusic();
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    goToPage(currentPage + 1);
  }
}

function previousPage() {
  if (currentPage > 0) {
    goToPage(currentPage - 1);
  }
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", nextPage);
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    const target = Number(button.dataset.go);

    document.getElementById("mobileMenu").classList.remove("open");

    goToPage(target);
  });
});

/* =========================================================
   OPENING
========================================================= */

const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", () => {
  startMusic();
  goToPage(1);
});

/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {
  const current = String(currentPage + 1).padStart(2, "0");

  document.getElementById("progressNumber").textContent = current;

  const percentage =
    ((currentPage + 1) / totalPages) * 100;

  document.getElementById("progressFill").style.width =
    `${percentage}%`;
}

updateProgress();

/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

/* =========================================================
   FLOATING HEARTS + BALLOONS
========================================================= */

const heartContainer =
  document.getElementById("floatingHearts");

const balloonContainer =
  document.getElementById("floatingBalloons");

function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > .4 ? "♡" : "♥";

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize =
    `${12 + Math.random() * 18}px`;

  heart.style.setProperty(
    "--drift",
    `${-100 + Math.random() * 200}px`
  );

  heart.style.setProperty(
    "--rotation",
    `${-30 + Math.random() * 60}deg`
  );

  heart.style.animationDuration =
    `${10 + Math.random() * 12}s`;

  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 23000);
}

function createFloatingBalloon() {
  const balloon = document.createElement("span");

  balloon.className = "floating-balloon";

  balloon.style.left = `${Math.random() * 100}%`;

  balloon.style.setProperty(
    "--drift",
    `${-120 + Math.random() * 240}px`
  );

  balloon.style.setProperty(
    "--rotation",
    `${-20 + Math.random() * 40}deg`
  );

  balloon.style.animationDuration =
    `${15 + Math.random() * 12}s`;

  balloonContainer.appendChild(balloon);

  setTimeout(() => balloon.remove(), 30000);
}

setInterval(createFloatingHeart, 1800);
setInterval(createFloatingBalloon, 5000);

/* =========================================================
   PHOTO MODAL
========================================================= */

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

document.querySelectorAll(".memory-photo").forEach(photo => {
  photo.addEventListener("click", () => {
    const imageNumber = photo.dataset.image;
    const caption = photo.dataset.caption;

    modalImage.src = `images/${imageNumber}.jpeg`;
    modalCaption.textContent = caption;

    photoModal.classList.add("open");
  });
});

document.querySelectorAll(".modal-close").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.classList.remove("open");
    });
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });
});

/* =========================================================
   PALLADIUM PIZZA GAME
========================================================= */

const pizzaButtons =
  document.querySelectorAll("[data-pizza]");

const pizzaResult =
  document.getElementById("pizzaResult");

pizzaButtons.forEach(button => {
  button.addEventListener("click", () => {

    const answer = button.dataset.pizza;

    if (answer === "rafay") {
      pizzaResult.innerHTML =
        "Correct. Unfortunately. 😭";
    } else {
      pizzaResult.innerHTML =
        "Girl... you know that's not what happened.";
    }

    pizzaButtons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = ".45";
    });

    setTimeout(() => {
      pizzaResult.innerHTML +=
        "<br><small>I lost because looking into your eyes while eating was apparently impossible.</small>";

      setTimeout(nextPage, 2800);
    }, 800);
  });
});

/* =========================================================
   LOLLIPOP
========================================================= */

const lollipopButton =
  document.getElementById("lollipopButton");

const lollipopResult =
  document.getElementById("lollipopResult");

lollipopButton.addEventListener("click", () => {

  const lollipop =
    document.querySelector(".lollipop");

  lollipop.classList.add("removed");

  lollipopResult.innerHTML =
    "He actually removed it. Still respectful. Still cute.";

  lollipopButton.disabled = true;

  setTimeout(() => {
    lollipopResult.innerHTML =
      "I had no right to ask. I still asked. 😭";
  }, 2200);

  setTimeout(nextPage, 4500);
});

/* =========================================================
   WINTER CLOCK
========================================================= */

const clock =
  document.getElementById("winterClock");

const clockHand =
  document.getElementById("clockHand");

const clockMessage =
  document.getElementById("clockMessage");

let clockDragging = false;

function updateClock(event) {

  const rect = clock.getBoundingClientRect();

  const x =
    event.clientX - rect.left - rect.width / 2;

  const y =
    event.clientY - rect.top - rect.height / 2;

  let angle =
    Math.atan2(y, x) * 180 / Math.PI + 90;

  if (angle < 0) angle += 360;

  clockHand.style.transform =
    `translate(-50%, -100%) rotate(${angle}deg)`;

  const hour =
    Math.min(4, Math.max(1, Math.round((angle / 360) * 12)));

  const messages = {
    1: "1 PM. Still talking.",
    2: "2 PM. Still talking.",
    3: "3 PM. Somehow still talking.",
    4: "4 PM. And somehow there was still more to say."
  };

  const mappedHour =
    hour <= 1 ? 1 :
    hour <= 2 ? 2 :
    hour <= 3 ? 3 : 4;

  clockMessage.textContent =
    messages[mappedHour];
}

clock.addEventListener("pointerdown", event => {
  clockDragging = true;
  clock.setPointerCapture(event.pointerId);
  updateClock(event);
});

clock.addEventListener("pointermove", event => {
  if (!clockDragging) return;
  updateClock(event);
});

clock.addEventListener("pointerup", () => {
  clockDragging = false;
});

/* =========================================================
   MUSEUM
========================================================= */

const museumData = {

  shirt: {
    eyebrow: "EXHIBIT 01",
    title: "The White Tee Collection",
    text:
      "Minimalistic. Clean. Classy. Somehow you manage to make the simplest T-shirt look like an entire aesthetic."
  },

  messi: {
    eyebrow: "EXHIBIT 02",
    title: "The Messi Department",
    text:
      "A permanent exhibition. Subject remains obsessed with Lionel Messi. Researchers have stopped trying to understand it."
  },

  sleep: {
    eyebrow: "EXHIBIT 03",
    title: "The Sleeping Species",
    text:
      "Has missed things because he was sleeping. Has somehow never missed a hangout or date with Washam. Scientists remain confused."
  },

  nose: {
    eyebrow: "EXHIBIT 04",
    title: "The Joyland Evidence",
    text:
      "There was a ride. There was Rafay. There was a finger. There are no further questions at this time."
  },

  gif: {
    eyebrow: "EXHIBIT 05",
    title: "The GIF Era",
    text:
      "Washam taught Rafay how to find cute GIFs. Rafay immediately discovered his new favorite technology and proceeded to use them everywhere."
  },

  new: {
    eyebrow: "EXHIBIT 06",
    title: "The New Thing Phenomenon",
    text:
      "Rafay discovers something new. Rafay becomes obsessed. Rafay keeps using it. This cycle has repeated enough times to qualify as scientific evidence."
  }

};

const museumModal =
  document.getElementById("museumModal");

document.querySelectorAll("[data-museum]").forEach(card => {

  card.addEventListener("click", () => {

    const type = card.dataset.museum;
    const data = museumData[type];

    document.getElementById("museumEyebrow")
      .textContent = data.eyebrow;

    document.getElementById("museumTitle")
      .textContent = data.title;

    document.getElementById("museumText")
      .textContent = data.text;

    museumModal.classList.add("open");
  });

});

/* =========================================================
   DRINK PARADOX
========================================================= */

const drinkButton =
  document.getElementById("drinkButton");

const drinkResult =
  document.getElementById("drinkResult");

const drinks = [
  "Something cold and suspiciously good.",
  "A drink Washam definitely chose for you.",
  "Something you would have never ordered yourself.",
  "The drink you apparently needed.",
  "An objectively excellent decision."
];

drinkButton.addEventListener("click", () => {

  const random =
    drinks[Math.floor(Math.random() * drinks.length)];

  drinkResult.textContent =
    random;

  setTimeout(() => {
    drinkResult.innerHTML +=
      "<br><small>Scientific conclusion: let Washam choose.</small>";
  }, 1200);
});

/* =========================================================
   PRIVATE DICTIONARY
========================================================= */

const dictionary = {

  chaddi: {
    title: "CHADDI",
    text:
      "One of the words that somehow became part of the private language of us."
  },

  taaki: {
    title: "TAAKI",
    text:
      "A word that makes perfect sense to exactly the right two people."
  },

  toliya: {
    title: "TOLIYA",
    text:
      "Another completely legitimate entry in our extremely sophisticated dictionary."
  },

  nicker: {
    title: "NICKER",
    text:
      "No explanation necessary. Somehow."
  },

  shampoo: {
    title: "SHAMPOO",
    text:
      "Yes. Shampoo. Don't ask questions. This is our language."
  },

  goo: {
    title: "GOO GOO GA GA",
    text:
      "A person who cannot talk. A baby. And, apparently, sometimes Rafay."
  }

};

document.querySelectorAll("[data-word]").forEach(word => {

  word.addEventListener("click", () => {

    const key = word.dataset.word;
    const data = dictionary[key];

    document.getElementById("wordDefinition").innerHTML = `
      <div>
        <strong>${data.title}</strong>
        <p>${data.text}</p>
      </div>
    `;
  });

});

/* =========================================================
   KARACHI
========================================================= */

const karachiButton =
  document.getElementById("karachiButton");

const karachiText =
  document.getElementById("karachiText");

karachiButton.addEventListener("click", () => {

  karachiText.classList.add("open");

  karachiButton.textContent =
    "I remember this one.";

  karachiButton.disabled = true;
});

/* =========================================================
   12 HOUR CALL
========================================================= */

const callButton =
  document.getElementById("callButton");

const callTimer =
  document.getElementById("callTimer");

let callInterval = null;
let callSeconds = 0;

function formatTime(seconds) {

  const hours =
    Math.floor(seconds / 3600);

  const minutes =
    Math.floor((seconds % 3600) / 60);

  const secs =
    seconds % 60;

  return [
    hours,
    minutes,
    secs
  ]
    .map(value => String(value).padStart(2, "0"))
    .join(":");
}

callButton.addEventListener("click", () => {

  if (callInterval) return;

  callInterval = setInterval(() => {

    callSeconds += 7;

    callTimer.textContent =
      formatTime(callSeconds);

    if (callSeconds >= 43200) {
      clearInterval(callInterval);

      document.querySelector(".phone-status")
        .textContent =
        "still talking. obviously.";
    }

  }, 100);
});

/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

  {
    question:
      "How many rides did we take at Neon Square?",

    options: [
      "2",
      "3",
      "4",
      "7"
    ],

    answer: 2,

    correct:
      "YES. YOU REMEMBER.",

    wrong:
      "Excuse me???? We literally counted them."
  },

  {
    question:
      "When did we go to the Bilal Saeed concert?",

    options: [
      "8 June",
      "12 June",
      "15 June",
      "20 June"
    ],

    answer: 1,

    correct:
      "12th June. Correct.",

    wrong:
      "Nope. Think again."
  },

  {
    question:
      "Why didn't I let you sit in Wok?",

    options: [
      "It was full",
      "You were late",
      "Because it's Haram xD",
      "I forgot"
    ],

    answer: 2,

    correct:
      "BECAUSE IT'S HARAM XD",

    wrong:
      "You KNOW why."
  },

  {
    question:
      "What was the first movie we watched together?",

    options: [
      "Masters of the Universe",
      "Insidious",
      "Kattar Karachi",
      "Spider-Man"
    ],

    answer: 2,

    correct:
      "KATTAR KARACHI. You better remember this.",

    wrong:
      "Wrong movie, Rafay."
  },

  {
    question:
      "Where did we originally choose to shoot Rakh's video before ending up at Meg?",

    options: [
      "Bukhari",
      "In front of Inter Café",
      "MB Lawn",
      "In front of the basketball court"
    ],

    answer: 3,

    correct:
      "THE BASKETBALL COURT. EXACTLY.",

    wrong:
      "Nope. That wasn't the original spot."
  }

];

let quizIndex = 0;

const quizQuestion =
  document.getElementById("quizQuestion");

const quizOptions =
  document.getElementById("quizOptions");

const quizFeedback =
  document.getElementById("quizFeedback");

const quizCount =
  document.getElementById("quizCount");

function loadQuizQuestion() {

  const question =
    quizQuestions[quizIndex];

  quizCount.textContent =
    `${String(quizIndex + 1).padStart(2, "0")} / ${String(quizQuestions.length).padStart(2, "0")}`;

  quizQuestion.textContent =
    question.question;

  quizOptions.innerHTML = "";

  quizFeedback.textContent = "";

  question.options.forEach((option, index) => {

    const button =
      document.createElement("button");

    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {

      const allOptions =
        quizOptions.querySelectorAll("button");

      allOptions.forEach(btn => {
        btn.disabled = true;
      });

      if (index === question.answer) {

        button.classList.add("correct");

        quizFeedback.textContent =
          question.correct;

      } else {

        button.classList.add("wrong");

        allOptions[question.answer]
          .classList.add("correct");

        quizFeedback.textContent =
          question.wrong;
      }

      setTimeout(() => {

        quizIndex++;

        if (quizIndex < quizQuestions.length) {

          loadQuizQuestion();

        } else {

          quizQuestion.textContent =
            "Okay. You actually know us.";

          quizOptions.innerHTML = "";

          quizFeedback.textContent =
            "Quiz complete. I'm impressed.";

          setTimeout(() => {
            nextPage();
          }, 2200);
        }

      }, 1800);
    });

    quizOptions.appendChild(button);
  });
}

loadQuizQuestion();

/* =========================================================
   MEMORY ROULETTE
========================================================= */

const rouletteButton =
  document.getElementById("rouletteButton");

const rouletteDisplay =
  document.getElementById("rouletteDisplay");

const memories = [
  "The amphitheater.",
  "You being ridiculously shy.",
  "The Palladium pizza Olympics.",
  "The lollipop stick.",
  "Sitting in the ground until 4 PM.",
  "The dog conversation.",
  "The Joyland incident.",
  "Your finger in your nose.",
  "The annual dinner.",
  "You choosing the wrong drink.",
  "Me choosing your drink.",
  "Our 12+ hour calls.",
  "You sending me GIFs after discovering them.",
  "Jamming together on Spotify.",
  "Watching movies on Rave.",
  "Losing Reversi.",
  "You writing our name in the sand.",
  "Karachi.",
  "Recommending each other food.",
  "Never having a bad meal together."
];

let rouletteRunning = false;

rouletteButton.addEventListener("click", () => {

  if (rouletteRunning) return;

  rouletteRunning = true;

  let cycles = 0;

  const interval = setInterval(() => {

    const random =
      memories[Math.floor(Math.random() * memories.length)];

    rouletteDisplay.innerHTML =
      `<span>${random}</span>`;

    cycles++;

    if (cycles >= 16) {

      clearInterval(interval);

      const finalMemory =
        memories[Math.floor(Math.random() * memories.length)];

      rouletteDisplay.innerHTML =
        `<span>${finalMemory}</span>`;

      rouletteRunning = false;
    }

  }, 90);
});

/* =========================================================
   HIDDEN OBJECTS
========================================================= */

const secretData = {

  heart: {
    title: "You found one.",
    text:
      "Okay. You are officially clicking everything."
  },

  star: {
    title: "A tiny star.",
    text:
      "For all the little moments that somehow became big ones."
  },

  balloon: {
    title: "Why are you clicking balloons?",
    text:
      "Fine. I love you too."
  },

  cassette: {
    title: "PLAY.",
    text:
      "We Fell in Love in October. Obviously."
  }

};

document.querySelectorAll("[data-secret]").forEach(object => {

  object.addEventListener("click", () => {

    const type =
      object.dataset.secret;

    document.getElementById("secretTitle")
      .textContent =
      secretData[type].title;

    document.getElementById("secretText")
      .textContent =
      secretData[type].text;

    document.getElementById("secretModal")
      .classList.add("open");
  });

});

/* =========================================================
   PASSWORD ARCHIVE
========================================================= */

const passwordInput =
  document.getElementById("passwordInput");

const passwordButton =
  document.getElementById("passwordButton");

const passwordFeedback =
  document.getElementById("passwordFeedback");

function unlockArchive() {

  const value =
    passwordInput.value.trim().toLowerCase();

  if (value === "violet") {

    passwordFeedback.textContent =
      "ACCESS GRANTED.";

    passwordFeedback.style.color =
      "#8fc9a7";

    passwordButton.disabled = true;

    passwordInput.disabled = true;

    setTimeout(() => {
      nextPage();
    }, 1500);

  } else {

    passwordFeedback.textContent =
      "Incorrect. Think of the secret name.";

    passwordInput.value = "";

    passwordInput.focus();
  }
}

passwordButton.addEventListener(
  "click",
  unlockArchive
);

passwordInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      unlockArchive();
    }

  }
);

/* =========================================================
   UNIVERSE
========================================================= */

const universeResult =
  document.getElementById("universeResult");

document.querySelectorAll("[data-universe]").forEach(button => {

  button.addEventListener("click", () => {

    const universe =
      button.dataset.universe;

    if (universe === "earlier") {

      universeResult.innerHTML =
        "Maybe we'd still somehow find each other.<br><small>Some people feel familiar before you know why.</small>";

    }

    if (universe === "elsewhere") {

      universeResult.innerHTML =
        "Different city. Different place. Same two idiots.<br><small>I'd probably still choose you.</small>";

    }

    if (universe === "never") {

      universeResult.innerHTML =
        "Nope.<br><br><strong>Close this universe.</strong>";

    }
  });

});

/* =========================================================
   RESTART
========================================================= */

document.getElementById("restartButton")
  .addEventListener("click", () => {

    currentPage = 1;

    pages.forEach((page, index) => {
      page.classList.remove("active", "leaving");

      if (index === 0) {
        page.classList.add("active");
      }
    });

    currentPage = 0;

    updateProgress();

    window.scrollTo(0, 0);

    startMusic();
  });

/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener("keydown", event => {

  if (
    event.target.tagName === "INPUT" ||
    event.target.tagName === "TEXTAREA"
  ) {
    return;
  }

  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }

  if (event.key === "Escape") {

    document.querySelectorAll(".modal")
      .forEach(modal => {
        modal.classList.remove("open");
      });

    mobileMenu.classList.remove("open");
  }
});

/* =========================================================
   TOUCH SWIPE
========================================================= */

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", event => {

  touchStartX =
    event.changedTouches[0].screenX;

  touchStartY =
    event.changedTouches[0].screenY;

}, { passive: true });

document.addEventListener("touchend", event => {

  const touchEndX =
    event.changedTouches[0].screenX;

  const touchEndY =
    event.changedTouches[0].screenY;

  const diffX =
    touchEndX - touchStartX;

  const diffY =
    touchEndY - touchStartY;

  if (Math.abs(diffX) < 70) return;

  if (Math.abs(diffX) < Math.abs(diffY)) return;

  if (diffX < 0) {
    nextPage();
  } else {
    previousPage();
  }

}, { passive: true });

/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
  document.getElementById("cursorDot");

const cursorRing =
  document.getElementById("cursorRing");

document.addEventListener("mousemove", event => {

  cursorDot.style.left =
    `${event.clientX}px`;

  cursorDot.style.top =
    `${event.clientY}px`;

  cursorRing.style.left =
    `${event.clientX}px`;

  cursorRing.style.top =
    `${event.clientY}px`;
});

document
  .querySelectorAll("button, input, .memory-photo")
  .forEach(element => {

    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });

  });

/* =========================================================
   PAGE RESET
========================================================= */

function resetPageInteractions(index) {

  if (index === 12) {

    document
      .getElementById("karachiText")
      .classList.remove("open");

    document
      .getElementById("karachiButton")
      .disabled = false;

    document
      .getElementById("karachiButton")
      .textContent =
      "open this memory";
  }

  if (index === 17) {
    quizIndex = 0;
    loadQuizQuestion();
  }

  if (index === 20) {

    passwordInput.value = "";

    passwordInput.disabled = false;

    passwordButton.disabled = false;

    passwordFeedback.textContent = "";
  }

  if (index === 22) {
    universeResult.textContent = "";
  }
}

/* =========================================================
   INITIALIZATION
========================================================= */

pages.forEach((page, index) => {

  if (index === 0) {
    page.classList.add("active");
  } else {
    page.classList.remove("active");
  }

});

updateProgress();

/* Attempt autoplay.
   Browsers may block it until the first interaction. */

window.addEventListener("load", () => {

  music.volume = 0.65;

  music.play()
    .then(() => {

      musicStarted = true;
      musicPlaying = true;

      updateMusicButton();

    })
    .catch(() => {

      musicStarted = false;

    });

});

/* First interaction fallback for autoplay-blocking browsers */

document.addEventListener(
  "pointerdown",
  () => {
    if (!musicStarted) {
      startMusic();
    }
  },
  { once: true }
);
