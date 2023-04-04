const routes = {
  new: { root: "new.html", handler: newHandler },
  news: { root: "news.html", handler: newsHandler },
  card: { root: "features.html", handler: featuresHandler },
} as const;

const root = document.getElementById("root") as HTMLElement;
const nav = document.getElementById("sidenav") as HTMLElement;
const showhide = document.querySelector(".side__showhide") as HTMLElement;
const burger = document.querySelector(".header__burger") as HTMLElement;
const header = document.querySelector(".header__nav") as HTMLElement;

fetch(`./pages/${routes["news"].root}`)
  .then((data) => data.text())
  .then((inner) => (root.innerHTML = inner))
  .then(newsHandler);

showhide.addEventListener("click", (e) => {
  nav.classList.toggle("side_show");
});
burger.addEventListener("click", (e) => {
  header.classList.toggle("_active");
});

nav.addEventListener("click", async (event) => {
  if (!event || !event.target) return;
  const target = event.target as HTMLElement;
  const parent = target.parentNode as HTMLElement;
  if (target.tagName !== "LI" && parent.tagName !== "LI") return;
  const id = target.tagName === "LI" ? target.dataset.id : parent.dataset.id;
  if (!routes[id]) return;
  const inner = await fetch(`./pages/${routes[id].root}`).then((data) =>
    data.text()
  );
  const selectedItem = document.querySelector(".side__element_selected");
  selectedItem.classList.toggle("side__element_selected");

  const listElement = document.querySelector(
    `.side__element[data-id=${id}]`
  ) as HTMLElement;
  listElement.classList.toggle("side__element_selected");
  root.innerHTML = inner;
  routes[id].handler();
});

function newsHandler() {
  const video = document.getElementById("news__cat__video") as HTMLVideoElement;
  const play = document.getElementById("news_play");
  const pause = document.getElementById("news_pause");
  const rightarrow = document.querySelector(
    ".news__mainarrowright"
  ) as HTMLElement;
  const leftarrow = document.querySelector(
    ".news__mainarrowleft"
  ) as HTMLElement;
  rightarrow.addEventListener("click", (e) => {
    const images = document.querySelectorAll(".news__image");
    const active = document.querySelector(".news__image_active") as HTMLElement;
    const target =
      +active.dataset.index + 1 >= images.length
        ? images[0]
        : images[+active.dataset.index + 1];
    active.classList.toggle("news__image_active");
    target.classList.toggle("news__image_active");
  });
  leftarrow.addEventListener("click", (e) => {
    const images = document.querySelectorAll(".news__image");
    const active = document.querySelector(".news__image_active") as HTMLElement;
    const target =
      +active.dataset.index - 1 >= 0
        ? images[+active.dataset.index - 1]
        : images[images.length - 1];
    active.classList.toggle("news__image_active");
    target.classList.toggle("news__image_active");
  });
  play.addEventListener("click", (e) => {
    video.play();
  });
  pause.addEventListener("click", (e) => {
    video.pause();
  });
}
function featuresHandler() {
  const features = document.getElementById("features") as HTMLElement;
  // Tекст з різним розміром шрифту.
  const featuresTextButton = document.getElementById("features__fonts__button");
  const featuresTextPlaceholder = document.getElementById(
    "features__fonts__placeholder"
  );
  featuresTextButton.addEventListener("click", (e) => {
    const featuresFontText = document.getElementById(
      "features__fonts__text"
    ) as HTMLInputElement;
    const featuresFontSize = document.getElementById(
      "features__fonts__size"
    ) as HTMLOptionElement;
    featuresTextPlaceholder.innerHTML = featuresFontText.value;
    featuresTextPlaceholder.style.fontSize = `${featuresFontSize.value}px`;
    e.preventDefault();
  });

  // Невелика картинка кожну секунду виникає в новом місці екрану.

  const featuresIMG = document.getElementById(
    "features__img"
  ) as HTMLImageElement;
  const featuresIMGStart = document.querySelector(".features__jumpimg__start");
  const featuresIMGStop = document.querySelector(".features__jumpimg__stop");
  let featuresIMGInterval;
  featuresIMGStart.addEventListener("click", (e) => {
    if (featuresIMGInterval) return;
    featuresIMGInterval = setInterval(() => {
      featuresIMG.style.top = `${Math.floor(
        Math.random() * (features.clientHeight + 1)
      )}px`;
      featuresIMG.style.left = `${Math.floor(
        Math.random() * (features.clientWidth + 1)
      )}px`;
    }, 1000);
  });
  featuresIMGStop.addEventListener("click", (e) => {
    clearInterval(featuresIMGInterval);
    featuresIMGInterval = null;
    featuresIMG.style.top = null;
    featuresIMG.style.left = null;
  });

  // Знайти на сторінці всі <p> і змінити їх розмір на 15px.

  const featuresChangePButton = document.getElementById(
    "features__changeP__Btn"
  );
  const featuresChangePElements = document.querySelectorAll("p");
  featuresChangePButton.addEventListener("click", (e) => {
    featuresChangePElements.forEach(
      (element) => (element.style.fontSize = "15px")
    );
  });

  // Текстовий годинник
  const featuresTime = document.getElementById("features__time");
  const featuresTimeCurrent = new Date();
  featuresTime.innerHTML = `${featuresTimeCurrent.getHours()}:${featuresTimeCurrent.getMinutes()}:${featuresTimeCurrent.getSeconds()}`;
  setInterval(() => {
    const time = new Date();
    featuresTime.innerHTML = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  }, 1000);

  //Поступове витирання
  const featuresRemoveDocument = document.getElementById(
    "features__deletedocument"
  );
  const featuresRemoveDocumentBG = document.querySelector(
    ".features__deletedocumentbg"
  ) as HTMLElement;
  featuresRemoveDocument.addEventListener("click", (e) => {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => (featuresRemoveDocumentBG.style.height = i + "%"), i);
    }
  });
  // Спливаюча при натисканні підказка.
  const featuresTipButton = document.getElementById("features__tip__button");
  featuresTipButton.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const tip = document.createElement("div");
    tip.classList.add("features__tip__message");
    tip.innerHTML = "Спливаюча при натисканні підказка.";
    document.body.append(tip);

    let coords = target.getBoundingClientRect();

    let left =
      coords.left +
      window.pageXOffset +
      (target.offsetWidth - tip.offsetWidth) / 2;
    if (window.pageXOffset > left) left = window.pageXOffset;

    let top = coords.top + window.pageYOffset - tip.offsetHeight - 5;
    if (window.pageYOffset > top) {
      top = coords.top + window.pageYOffset + target.offsetHeight + 5;
    }
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    document.addEventListener("click", (e) => {
      if (e.target === tip || e.target === featuresTipButton) return;
      tip.remove();
    });
  });

  //Cписок з п'яти кольорів.

  const featuresColors = document.querySelector(".features__colored__list");
  const featuresColorSquare = document.querySelector(
    ".features__colored__square"
  ) as HTMLElement;
  featuresColors.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target || target.tagName !== "LI") return;
    featuresColorSquare.style.backgroundColor = target.dataset.color;
  });

  //Поточні координати
  const featuresCords = document.querySelector(
    ".features__cords"
  ) as HTMLElement;
  const featuresCordsStart = document.querySelector(".features__keys__start");
  const featuresCordsStop = document.querySelector(".features__keys__stop");
  let featuresCordsTimer;
  const coords = {
    mouseX: 0,
    mouseY: 0,
    keyCode: "",
  };

  featuresCordsStart.addEventListener("click", (e) => {
    if (featuresCordsTimer) return;
    featuresCordsTimer = setInterval(() => {
      featuresCords.innerHTML = `mouseX:${coords.mouseX}<br>mouseY:${
        coords.mouseY
      }<br>${coords.keyCode ? `keyCode:${coords.keyCode}` : ``}`;
    }, 50);
  });
  featuresCordsStop.addEventListener("click", (e) => {
    clearInterval(featuresCordsTimer);
    featuresCordsTimer = null;
  });
  document.addEventListener("mousemove", (e) => {
    coords.mouseX = e.pageX;
    coords.mouseY = e.pageY;
  });
  document.addEventListener("keydown", (e) => {
    coords.keyCode = e.code;
  });
  document.addEventListener("keyup", (e) => {
    coords.keyCode = null;
  });

  // Сортування

  const featuresSortList = document.querySelector(".features__sort__list");
  const featuresSortName = document.querySelector(".features__sort__name");
  const featuresSortHeight = document.querySelector(".features__sort__height");
  const featuresSortElements = document.querySelectorAll(
    ".features__sort__element"
  );
  featuresSortName.addEventListener("click", (e) => {
    Array.from(featuresSortElements)
      .sort((a: HTMLElement, b: HTMLElement) => {
        if (a.dataset.name > b.dataset.name) {
          return 1;
        }
        if (a.dataset.name < b.dataset.name) {
          return -1;
        }
        return 0;
      })
      .forEach((element) => {
        featuresSortList.append(element);
      });
  });
  featuresSortHeight.addEventListener("click", (e) => {
    Array.from(featuresSortElements)
      .sort((a: HTMLElement, b: HTMLElement) => {
        if (a.dataset.height > b.dataset.height) {
          return 1;
        }
        if (a.dataset.height < b.dataset.height) {
          return -1;
        }
        return 0;
      })
      .forEach((element) => {
        featuresSortList.append(element);
      });
  });

  // Не копiювати
  const featuresNoCopy = document.querySelector(
    ".features__nocopy"
  ) as HTMLElement;
  featuresNoCopy.ondragstart = () => false;
  featuresNoCopy.onselectstart = () => false;
  featuresNoCopy.oncontextmenu = () => false;

  // Ваш браузер

  const featuresFrom = document.querySelector(".features__from");
  featuresFrom.innerHTML = `Версiя браузеру ${navigator.appVersion}`;

  //
}

function newHandler() {}
