const newCDForm = document.getElementById("new-cd");
if (!newCDForm) {
  throw new Error("Could not find add new CD form");
}

newCDForm.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.setCustomValidity("");
  });
});

const handleError = (key, message) => {
  const input = newCDForm.querySelector(`[name=${key}]`);
  if (!input) {
    throw new Error("Could not find input with name " + key);
  }

  input.setCustomValidity(message);
  input.reportValidity();
};

newCDForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { author, title, year } = e.target;

  const yearInt = parseInt(year.value);

  const tbody = document.querySelector("tbody");
  const newCd = document.importNode(
    document.getElementById("cd-row").content,
    true
  );

  newCd.querySelector(".author").textContent = author.value;
  newCd.querySelector(".title").textContent = title.value;
  newCd.querySelector(".year").textContent =
    yearInt >= 0 ? yearInt : `${Math.abs(yearInt)} BC`;

  const newCdBtn = newCd.querySelector(".delete button");
  newCdBtn.setAttribute(
    "aria-label",
    `Delete CD ${author.value} - ${title.value}`
  );
  newCdBtn.addEventListener("click", (e) => {
    const tableRow = e.target.closest("tr");
    tableRow.remove();
  });

  tbody.appendChild(newCd);
  newCDForm.reset();
});
