const registro = document.querySelector('form');
const input = document.querySelectorAll('input');
const name = document.querySelector("#name");
const Lname = document.querySelector("#Lname");
const age = document.querySelector("#age");
const id = document.querySelector('#id');
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const dateBirth = document.querySelector("#birth");
let json = {};

input.forEach((entry) => {
    entry.setAttribute('autocomplete', 'off');
});

registro.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let arr = Object.entries(data);
    json = Object.fromEntries(arr);

    // Mostrar los datos al final del registro
    displayUserData();
});

// Función para mostrar los datos
function displayUserData() {
    name.textContent = json.name || '';
    Lname.textContent = json.Lname || '';
    age.textContent = json.age || '';
    id.textContent = json.id || '';
    email.textContent = json.email || '';
    address.textContent = json.address || '';
    dateBirth.textContent = json.birth || '';
}


// Eventos adicionales del código original

familiares.addEventListener('keyup', (e) => {
    cantidadPresentar(fam_div, e.target.value, familiaresMenu, 'Familiar');
});

condiciones.addEventListener('keyup', (e) => {
    cantidadPresentar(condiciones_div, e.target.value, condicionesMenu, "Condicion");
});

internamietos.addEventListener('keyup', (e) => {
    cantidadPresentar(inter_div, e.target.value, InternamientosMenu, "Internamiento");
});

btnMostrar.addEventListener("click", async (e) => {
    e.preventDefault();
    let info = await buscarPorId(id.value);
    fillFormWithData(info);
});

btnEditar.addEventListener("click", (e) => {
    e.preventDefault();
    updateDataAndSubmit();
});

// Funciones para manejar eventos adicionales

function fillFormWithData(info) {
    name.value = info.name || '';
    Lname.value = info.Lname || '';
    age.value = info.age || '';
    id.value = info.id || '';
    email.value = info.email || '';
    address.value = info.address || '';
    dateBirth.value = info.birth || '';

    if (info["familiares"]) {
        datosPresentar(fam_div, familiaresMenu, 'Familiar', info.familiares);
    }
    if (info["condiciones"]) {
        datosPresentar(condiciones_div, condicionesMenu, "Condicion", info.condiciones);
    }
    if (info["internamientos"]) {
        datosPresentar(inter_div, InternamientosMenu, "Internamiento", info.internamientos);
    }
}

function updateDataAndSubmit() {
    let data = Object.fromEntries(new FormData(registro));
    let arr = Object.entries(data);
    let arrPersonal = [];
    for (let i = 0; i < 7; i++) {
        arrPersonal[i] = arr[i];
    }
    json = Object.fromEntries(arrPersonal);

    let newfamiliaresMenu = removeWhiteSpaces(familiaresMenu);
    let newcondicionesMenu = removeWhiteSpaces(condicionesMenu);
    let newInternamientosMenu = removeWhiteSpaces(InternamientosMenu);

    let a = serchKeyValue(arr, newfamiliaresMenu);
    let b = serchKeyValue(arr, newcondicionesMenu);
    let c = serchKeyValue(arr, newInternamientosMenu);

    const verificar = (obj) => {
        if (!obj["familiares"]) {
            obj["familiares"] = [Object.fromEntries(a)];
        }
        if (!obj["condiciones"]) {
            obj["condiciones"] = [Object.fromEntries(b)];
        }
        if (!obj["internamientos"]) {
            obj["internamientos"] = [Object.fromEntries(c)];
        }
    };
    verificar(json);
    dataEditada(json);
}

// Función para mostrar los datos al final del registro
function displayUserData() {
    name.value = json.name || '';
    Lname.value = json.Lname || '';
    age.value = json.age || '';
    id.value = json.id || '';
    email.value = json.email || '';
    address.value = json.address || '';
    dateBirth.value = json.birth || '';
}


