//#region variables

const registro = document.querySelector('form');

//inputs
const familiares=  document.querySelector('#numFamiliares');
const condiciones=  document.querySelector('#numCondiciones');
const internamietos=  document.querySelector('#numInternamientos');
const input = document.querySelectorAll('input');
const name = document.querySelector("#name");
const Lname = document.querySelector("#Lname");
const age = document.querySelector("#age");
const id = document.querySelector('#id');
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const dateBirth = document.querySelector("#birth");

input.forEach((entry)=>{

    entry.setAttribute('autocomplete', 'off');
})

let acc = document.getElementsByClassName("accordion");

//form-main
const form_main =  document.querySelector('.main-form');
const fam_div=  document.querySelector('.familiares-div');
const condiciones_div=  document.querySelector('.salud-div');
const inter_div=  document.querySelector('.internamietos-div');

//btns
const btnMostrar =  document.querySelector('#mostrar');
const btnPersonas = document.querySelector('#fetchPersonas');
const btnEditar =  document.querySelector('#editar');

//menu 
let familiaresMenu = ["Nombre del Familiar", "Parentesco", "Edad"];
let condicionesMenu =  ["Enfermedad","Tiempo con la Enfermedad"]
let InternamientosMenu = ["Fecha","Centro Médico","Diagnóstico"];

//data-div
const data_div =  document.querySelector('.data-div');
const info_data_div =  document.querySelector('.info-data');
const fam_data_div =  document.querySelector('.fam-data');
const con_data_div =  document.querySelector('.con-data');
const int_data_div =  document.querySelector('.int-data');

let json = {};

//#endregion
 
//#region Registro data
const dataEditada = (info)=>{

     fetch("http://localhost:3000/editar", {
        method: 'PUT',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify(info),
    }).then(res => res.text())
    .then(data => console.log(data))
    .catch(err =>{ console.log(err)});
}

const buscarPorId = async (id)=>{
    let req = await fetch(`http://localhost:3000/registro${id}`)
    let data = await req.json();

    return data;
       
}

const dataEnviada = (info)=>{
    
    fetch("http://localhost:3000/registro", {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify(info),
    }).then(res => res.text())
    .then(data => console.log(data))
    .catch(err =>{ console.log(err)});
}

//#endregion

//#region function 
const removeWhiteSpaces = (arr) =>{

    let word = [];
    let newArr = [];

    for(let i = 0; i<arr.length; i++){

        word = [...arr[i]];
        for(let j = 0; j<word.length; j++){
            if(word[j].charCodeAt() === 32){
                word[j]="_"; 
            }

        
        }
        newArr[i] = word.toString().replaceAll(",","");
    }

    return newArr;
}

const cantidadPresentar =  (div, value, arr, msg)=>{

    let fragment = document.createDocumentFragment();
    let div2 = document.createElement('div');
    const valueNum =  Number(value);
      
    for(let i = 0; i<valueNum; i++){

        let h4 = document.createElement('h4');
        h4.innerHTML = `<h4>${msg} ${i+1}</h4>`;
        fragment.append(h4);
        for(let j =0; j<arr.length; j++){

            let k = 0;
        
            let label = document.createElement('label');
            label.textContent = arr[j];
            let input = document.createElement('input');
            input.setAttribute('name', `${removeWhiteSpaces(arr)[j]}_${i+1}`);
            fragment.append(label)
            fragment.append(input);
            k++;

        }

    }
    
    div2.append(fragment);
    div.append(div2);

}

const removeNumber = (arr)=>{

     let word = [];
    let newArr = [];
    let notNum = [];

    for(let i = 0; i<arr.length; i++){

        notNum[i] = arr[i][0].replaceAll(/[0-9]/g,"");
        word = [...notNum[i]];
          
        for(let j = 0; j<word.length; j++){
            
            if(j == word.length-1 && word[j].charCodeAt() === 95){
                word[j]= ""; 
            }
        }
        
        newArr[i] = word.toString().replaceAll(",","");

    }

    return newArr;
}

const serchKey = (arr, arrMenu)=>{
    let flag = false;
    let newArray = removeNumber(arr);

   for (let i = 0; i < arrMenu.length; i++) {
    
        for (let j = 0; j < newArray.length; j++) {
            if(arrMenu[i]==newArray[j]){
                flag = true;
                break;
            }
        }  
   }
   return flag;
}


const serchKeyValue = (arr, arrMenu)=>{

    let newArray = removeNumber(arr);
    let arrObj = [];
    let k = 0;

   for (let i = 7; i < newArray.length; i++) {

        for (let j = 0; j < arrMenu.length; j++) {

            if(newArray[i]==arrMenu[j]){
                arrObj[k] = arr[i];
                k++;
                                    
            }
        }         
   }
   return arrObj;
}


const datosPresentar = (div, arr, msg, info)=>{

    let fragment = document.createDocumentFragment();
    let div2 = document.createElement('div'); 
    let value;
    console.log(info.length);

     for(let i = 0; i<info.length; i++){

        value = Object.entries(info[i]);
        let h4 = document.createElement('h4');
        h4.innerHTML = `<h4>${msg} ${i+1}</h4>`;
        fragment.append(h4);
        
        for(let j =0; j<arr.length; j++){

            let k = 0;
            
            let label = document.createElement('label');
            label.textContent = arr[j];
            let input = document.createElement('input');
            input.setAttribute('name', `${removeWhiteSpaces(arr)[j]}_${i+1}`);
            input.value = value[j][1];
            fragment.append(label)
            fragment.append(input);
            k++;

        }

    } 
    
    div2.append(fragment);
    div.append(div2);
}


//#endregion

//#region Events
registro.addEventListener('submit', (e)=>{

    let data = Object.fromEntries(new FormData(e.target));
    let arr = Object.entries(data);
    let arrPersonal = [];
    for(let i = 0; i< 7; i++){
        arrPersonal[i] = arr[i];
    }
    //console.log(arr);
    json = Object.fromEntries(arrPersonal);

    let newfamiliaresMenu = removeWhiteSpaces(familiaresMenu);
    let newcondicionesMenu = removeWhiteSpaces(condicionesMenu);
    let newInternamientosMenu = removeWhiteSpaces(InternamientosMenu);

    let a = serchKeyValue(arr, newfamiliaresMenu);
    let b = serchKeyValue(arr,newcondicionesMenu);
    let c =  serchKeyValue(arr, newInternamientosMenu);

    const verificar = (obj)=>{

    
        if(!obj["familiares"]){
            obj["familiares"] = [Object.fromEntries(a)];                   
        } 
            
        if(!obj["condiciones"]){
            obj["condiciones"] = [Object.fromEntries(b)];
        } 
    
        if(!obj["internamientos"]){
            obj["internamientos"] = [Object.fromEntries(c)];
        } 
    }
    
    verificar(json);
    //console.log(json);
    dataEnviada(json);


}) 

familiares.addEventListener('keyup', (e)=>{

    cantidadPresentar(fam_div, e.target.value, familiaresMenu, 'Familiar');
})

condiciones.addEventListener('keyup', (e)=>{

    cantidadPresentar(condiciones_div, e.target.value, condicionesMenu, "Condicion");
})

internamietos.addEventListener('keyup', (e)=>{

    cantidadPresentar(inter_div, e.target.value, InternamientosMenu, "Internamiento");
})

btnMostrar.addEventListener("click", async (e)=>{

    e.preventDefault();
    let info = await buscarPorId(id.value);
    //console.log(info);
    name.value = info.name;
    Lname.value = info.Lname;
    age.value = info.age;
    id.value = info.id;
    email.value = info.email;
    address.value = info.address;
    dateBirth.value = info.birth;

    if(info["familiares"]){
      
         datosPresentar(fam_div, familiaresMenu, 'Familiar', info.familiares);
    }
     if(info["condiciones"]){
      
         datosPresentar(condiciones_div, condicionesMenu, "Condicion", info.condiciones);
    }
     if(info["internamientos"]){
      
         datosPresentar(inter_div, InternamientosMenu, "Internamiento", info.internamientos);
    }

}) 

btnEditar.addEventListener("click", (e)=>{
    e.preventDefault();

    let data = Object.fromEntries(new FormData(registro));
    let arr = Object.entries(data);
    let arrPersonal = [];
    for(let i = 0; i< 7; i++){
        arrPersonal[i] = arr[i];
    }
    //console.log(arr);
    json = Object.fromEntries(arrPersonal);

    let newfamiliaresMenu = removeWhiteSpaces(familiaresMenu);
    let newcondicionesMenu = removeWhiteSpaces(condicionesMenu);
    let newInternamientosMenu = removeWhiteSpaces(InternamientosMenu);

    let a = serchKeyValue(arr, newfamiliaresMenu);
    let b = serchKeyValue(arr,newcondicionesMenu);
    let c =  serchKeyValue(arr, newInternamientosMenu);

    const verificar = (obj)=>{

    
        if(!obj["familiares"]){
            obj["familiares"] = [Object.fromEntries(a)];                   
        } 
            
        if(!obj["condiciones"]){
            obj["condiciones"] = [Object.fromEntries(b)];
        } 
    
        if(!obj["internamientos"]){
            obj["internamientos"] = [Object.fromEntries(c)];
        } 
    }        
    verificar(json);
    //console.log(json);
    dataEditada(json);
})
//#endregion

//#region Accordion

let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 

//#endregion
