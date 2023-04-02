const routes = {
    new: "new.html",
    news: "news.html",
};
const root = document.getElementById("root");
const nav = document.getElementById("sidenav");
const inner = fetch(`./pages/${routes["news"]}`)
    .then((data) => data.text())
    .then((inner) => (root.innerHTML = inner));
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
    const inner = await fetch(`./pages/${routes[id]}`).then((data) => data.text());
    const selectedItem = document.querySelector(".side__element_selected");
    selectedItem.classList.toggle("side__element_selected");
    const listElement = document.querySelector(`.side__element[data-id=${id}]`);
    listElement.classList.toggle("side__element_selected");
    root.innerHTML = inner;
});
