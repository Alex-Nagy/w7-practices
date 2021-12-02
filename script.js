const inputElement = (type, name, label, req) => {
  return `
  <div class="${type}">
    <label for="${name}">${label}</label>
    <input type="${type}" name="${name}" id="${name}" ${req}>
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

const anotherFormFields = [
  {
    type: "text",
    name: "street",
    label: "Közterület neve"
  },
  {
    type: "text",
    name: "houseNumber",
    label: "Házszám"
  },
  {
    type: "number",
    name: "zipCode",
    label: "Irányítószám"
  },
  {
    type: "text",
    name: "city",
    label: "Település neve"
  },
]

const formFields = [
  {
    type: "text",
    name: "firstName",
    label: "Keresztneved",
  },
  {
    type: "email",
    name: "personalEmail",
    label: "Email címed",
    required: "required",
  },
  {
    type: "file",
    name: "profilePic",
    label: "Profilképed",
    required: "required",
  },
  {
    type: "checkbox",
    name: "newsletter",
    label: "Szeretnél hírlevelet?",
  },
  {
    type: "checkbox",
    name: "terms",
    label: "Elfogadod a feltételeket?",
    required: "required"
  },
];

/* 
    const formElement = `
    <form id="form">
    ${inputElement(nameData.type, nameData.name, nameData.label)}
    ${inputElement("email", "personalEmail", "Email címed", "required")}
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
 */

const formElement = (ffs, id) => {
  let toForm = "";
  for (const ff of ffs) {
    toForm += inputElement(ff.type, ff.name, ff.label, ff.required);
  }
  return `
  <form id="${id}">
      ${toForm}
      ${selectElement("select", "where", "Hol hallottál rólunk?", [
        "internetről",
        "ismerőstől",
        "egyéb",
      ])}
        <button>OK</button>
    </form>
  `;
};

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

  if (event.target.getAttribute("name") === "profilePic") {
    console.log(event.target.files[0].name);

    const image = URL.createObjectURL(event.target.files[0])
    document.getElementById("inputValueContent").insertAdjacentHTML('beforeend', `
    <img src="${image}">`)
  }
};

function loadEvent() {
  let root = document.getElementById("root");
  root.insertAdjacentHTML("beforeend", formElement(formFields, "form"));
  root.insertAdjacentHTML("beforeend", formElement(anotherFormFields, "form2"));
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
