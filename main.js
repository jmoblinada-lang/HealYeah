// Forms: validate, then show a confirmation toast
document.querySelectorAll("form.js-form").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!f.checkValidity()) {
      f.classList.add("was-validated");
      return;
    }
    document.getElementById("toastMsg").textContent =
      "Thanks! We got your request and will be in touch shortly.";
    bootstrap.Toast.getOrCreateInstance(
      document.getElementById("okToast"),
    ).show();
    f.reset();
    f.classList.remove("was-validated");
  }),
);

// Load the clicked location's embedded map into the popup
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("mapModal");
  var frame = document.getElementById("mapFrame");
  var title = document.getElementById("mapTitle");
  if (!modal || !frame) return;

  modal.addEventListener("show.bs.modal", function (e) {
    var btn = e.relatedTarget;
    if (!btn) return;
    title.textContent = btn.getAttribute("data-place") || "Location";
    frame.src = btn.getAttribute("data-map") || "";
  });

  modal.addEventListener("hidden.bs.modal", function () {
    frame.src = "";
  });
});
// Map modal title
const mm = document.getElementById("mapModal");
mm.addEventListener("show.bs.modal", (e) => {
  const p = e.relatedTarget && e.relatedTarget.dataset.place;
  if (p) document.getElementById("mapTitle").textContent = p;
});
// Gallery modal: show the clicked photo
const pm = document.getElementById("picModal");
pm.addEventListener("show.bs.modal", (e) => {
  const tile = e.relatedTarget && e.relatedTarget.closest(".tile");
  if (!tile) return;
  const caption = tile.dataset.cap || "";
  const photo = document.getElementById("picImg");
  photo.src = tile.dataset.img;
  photo.alt = caption;
  document.getElementById("picTitle").textContent = caption;
  document.getElementById("picCap").textContent = "";
});

// Doctor filter
document.querySelectorAll("#docFilter .nav-link").forEach((b) =>
  b.addEventListener("click", () => {
    document
      .querySelectorAll("#docFilter .nav-link")
      .forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    document
      .querySelectorAll(".doc-item")
      .forEach((c) =>
        c.classList.toggle(
          "d-none",
          b.dataset.f !== "all" && c.dataset.dept !== b.dataset.f,
        ),
      );
  }),
);
// Back to top
const tb = document.getElementById("toTop");
addEventListener(
  "scroll",
  () => (tb.style.display = scrollY > 600 ? "block" : "none"),
);
tb.addEventListener("click", () => scrollTo({ top: 0 }));
// Open the tab named in the URL hash (privacy.html#terms)
if (
  location.hash &&
  document.querySelector('[data-bs-target="' + location.hash + '"]')
)
  bootstrap.Tab.getOrCreateInstance(
    document.querySelector('[data-bs-target="' + location.hash + '"]'),
  ).show();
