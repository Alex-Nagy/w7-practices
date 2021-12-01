const inputElement = (type, name, label) => {
  return `
  <div>
    <label for="${name}">${label}</label>
    <input type="${type}" name="${name}" id="${name}"">
  </div>
    `;
};
const selectElement = (type, name, label, selectOptions) => {
  let optionElements = "";
  for (const option of selectOptions) {
    optionElements += `
      <option>${option}</option>
    `;
  }
  return `
  <div>
    <label>${label}</label>
    <${type} name='${name}'>
      ${optionElements}
    </${type}>
  </div>
    `;
};

const formElement = `
    <form id="form">
    ${inputElement("text", "firstName", "Keresztneved")}
    ${inputElement("email", "personalEmail", "Email címed")}
    ${inputElement("file", "profilePic", "Profilképed")}
    ${selectElement("select", "where", "Hol hallottál rólunk?", [
      "internetről",
      "ismerőstől",
      "egyéb",
    ])}
    ${inputElement("checkbox", "newsletter", "Szeretnél hírlevelet?")}
    ${inputElement("checkbox", "terms", "Elfogadod a feltételeket?")}
    <button>OK</button>
    </form>
`;

const formSubmit = (event) => {
  event.preventDefault();
  // console.log(event);
  const et = event.target;
  et.classList.add("submitted");
  const etValue = et.querySelector(`select[name="where"]`).value;
  console.log(etValue);
};

// todo: ha az aktuális inputnak a name attribútuma "firstName" csak akkor írja bele ebbe a div-be a tartalmat

const inputEvent = (event) => {
  let tryForm = event.target.closest("#form");
  console.log(event.target.value);
  // console.log(tryForm);

/*   if (event.target.getAttribute("name") === "firstName") {
    document.getElementById("inputValueContent").innerHTML = event.target.value;
  }
*/
};

function loadEvent() {
  let root = document.getElementById("root");
  root.insertAdjacentHTML("beforeend", formElement);
  root.insertAdjacentHTML(
    "beforeend",
    `
    <div id="inputValueContent"></div>
  `
  );

  let form = document.getElementById("form");
  form.addEventListener("submit", formSubmit);

  const inputList = form.querySelectorAll("input");
  for (const input of inputList) {
    input.addEventListener("input", inputEvent);
  }
}

window.addEventListener("load", loadEvent);
