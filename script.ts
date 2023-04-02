const routes = {
  new: "new.html",
  news: "news.html",
} as const;

const root = document.getElementById("root") as HTMLElement;
const nav = document.getElementById("sidenav") as HTMLElement;

const inner = fetch(`./pages/${routes["news"]}`)
  .then((data) => data.text())
  .then((inner) => (root.innerHTML = inner));

nav.addEventListener("click", async (event) => {
  if (!event || !event.target) return;
  const target = event.target as HTMLElement;
  const parent = target.parentNode as HTMLElement;
  if (target.tagName !== "LI" && parent.tagName !== "LI") return;
  const id = target.tagName === "LI" ? target.dataset.id : parent.dataset.id;
  if (!routes[id]) return;
  const inner = await fetch(`./pages/${routes[id]}`).then((data) =>
    data.text()
  );
  const selectedItem = document.querySelector(".side__element_selected");
  selectedItem.classList.toggle("side__element_selected");

  const listElement = document.querySelector(
    `.side__element[data-id=${id}]`
  ) as HTMLElement;
  listElement.classList.toggle("side__element_selected");
  root.innerHTML = inner;
});
