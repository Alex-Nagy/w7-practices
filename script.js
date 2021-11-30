const inputElement = (type, name, label) => {
  return `
  <div>
    <label>${label}</label>
    <input type="${type}" name="${name}">
  </div>
    `;
};

const formElement = `
    <form id="form">
    ${inputElement("text", "firstName", "Keresztneved")}
    ${inputElement("file", "profilePic", "Profilképed")}
    ${inputElement("email", "personalEmail", "Email címed")}
    ${inputElement("radio", "newsletter", "Szeretnél hírlevelet?")}
    ${inputElement("checkbox", "terms", "Elfogadod a feltételeket?")}
    <button>OK</button>
    </form>
`;

const formSubmit = (event) => {
  event.preventDefault();
  console.log(event);
  event.target.classList.add("submitted");
};

// todo: ha az aktuális inputnak a name attribútuma "firstName" csak akkor írja bele ebbe a div-be a tartalmat
const inputEvent = (event) => {
  console.log(event.target.value);
  
  if (event.target.name === "firstName") {
    document.getElementById("inputValueContent").innerHTML = event.target.value;
  }
};

function loadEvent() {
  let root = document.getElementById("root");
  root.insertAdjacentHTML("beforeend", formElement);
  root.insertAdjacentHTML("beforeend", `
    <div id="inputValueContent"></div>
  `);

  let form = document.getElementById("form");
  form.addEventListener("submit", formSubmit);

  const inputList = form.querySelectorAll("input");
  for (const input of inputList) {
    input.addEventListener("input", inputEvent);
  }
}

window.addEventListener("load", loadEvent);
