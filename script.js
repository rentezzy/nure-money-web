const routes = {
    new: { root: "new.html", handler: newHandler },
    news: { root: "news.html", handler: newsHandler },
};
const root = document.getElementById("root");
const nav = document.getElementById("sidenav");
const showhide = document.querySelector(".side__showhide");
const burger = document.querySelector(".header__burger");
const header = document.querySelector(".header__nav");
const inner = fetch(`./pages/${routes["news"].root}`)
    .then((data) => data.text())
    .then((inner) => (root.innerHTML = inner))
    .then(newsHandler);
function newsHandler() {
    const video = document.getElementById("news__cat__video");
    const play = document.getElementById("news_play");
    const pause = document.getElementById("news_pause");
    const rightarrow = document.querySelector(".news__mainarrowright");
    const leftarrow = document.querySelector(".news__mainarrowleft");
    rightarrow.addEventListener("click", (e) => {
        const images = document.querySelectorAll(".news__image");
        const active = document.querySelector(".news__image_active");
        const target = +active.dataset.index + 1 >= images.length
            ? images[0]
            : images[+active.dataset.index + 1];
        active.classList.toggle("news__image_active");
        target.classList.toggle("news__image_active");
    });
    leftarrow.addEventListener("click", (e) => {
        const images = document.querySelectorAll(".news__image");
        const active = document.querySelector(".news__image_active");
        const target = +active.dataset.index - 1 >= 0
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
function newHandler() { }
showhide.addEventListener("click", (e) => {
    nav.classList.toggle("side_show");
});
burger.addEventListener("click", (e) => {
    header.classList.toggle("_active");
});
nav.addEventListener("click", async (event) => {
    if (!event || !event.target)
        return;
    const target = event.target;
    const parent = target.parentNode;
    if (target.tagName !== "LI" && parent.tagName !== "LI")
        return;
    const id = target.tagName === "LI" ? target.dataset.id : parent.dataset.id;
    if (!routes[id])
        return;
    const inner = await fetch(`./pages/${routes[id].root}`).then((data) => data.text());
    const selectedItem = document.querySelector(".side__element_selected");
    selectedItem.classList.toggle("side__element_selected");
    const listElement = document.querySelector(`.side__element[data-id=${id}]`);
    listElement.classList.toggle("side__element_selected");
    root.innerHTML = inner;
    routes[id].handler();
});
