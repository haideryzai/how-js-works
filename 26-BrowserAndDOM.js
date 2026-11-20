// Goal: How JavaScript talks to a web page. Load this in a page with <script src="26-BrowserAndDOM.js" defer></script>.
// In Node it just prints a note, because there is no DOM there.

if (typeof document === "undefined") {
  console.log("No DOM here — open this in a browser to see it work.");
} else {
  // ---- Selecting and creating elements ----
  const box = document.createElement("div");
  box.id = "demo";
  box.textContent = "Click me";              // textContent is safe; innerHTML can enable XSS
  box.classList.add("box");
  box.style.cssText = "padding:1rem;border:1px solid #888;cursor:pointer";
  document.body.append(box);
  console.log(document.querySelector("#demo") === box);

  // ---- Events: capture -> target -> bubble ----
  box.addEventListener("click", (e) => { box.textContent = `Clicked at ${e.clientX},${e.clientY}`; });
  document.body.addEventListener("click", (e) => console.log("bubbled to body from", e.target.id));
  // Event delegation: one listener on a parent handles many children
  document.body.addEventListener("click", (e) => { if (e.target.matches(".box")) console.log("delegated"); });

  // ---- Browser APIs ----
  localStorage.setItem("visits", String(Number(localStorage.getItem("visits") ?? 0) + 1));
  fetch("https://example.com/", { mode: "no-cors" }).then((r) => console.log("fetch status", r.type));
  new IntersectionObserver((entries) => console.log("visible:", entries[0].isIntersecting)).observe(box);
  requestAnimationFrame(() => console.log("runs before the next paint"));

  // ---- Web workers: real parallelism, no shared scope, communicate with messages ----
  const worker = new Worker(URL.createObjectURL(new Blob(["onmessage=e=>postMessage(e.data*2)"])));
  worker.onmessage = (e) => console.log("worker says", e.data);
  worker.postMessage(21);
}

// Key points: the DOM is not part of JavaScript itself — it's an API the browser provides.
// Long tasks block rendering (see the event loop file); use workers or chunking for heavy work.
