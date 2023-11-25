var output = "";
var tableData = document.querySelector("#data");
var tableHead = document.querySelector("#grid_Atividades");
const url = 'https://jsonserver-5.gustavovilarino.repl.co/atividades';

const addForm = document.querySelector("#myForm");

var atvDescricao = document.getElementById("inputDescricao"),
atvCategoria = document.getElementById("inputCategoria"),
atvDuracao = document.getElementById("inputDuracao")


const readData = (atividades) => {
    atividades.forEach(element => {
        output += `<tr>
                    <td> ${element.id}</td>
                    <td> ${element.descricao}</td>
                    <td> ${element.categoria}</td>
                    <td> ${element.duracao}</td>
                    <td id = ${element.id}> <button type="button" class="btn btn-success" id="editar">Editar</button>
                    <button type="button" class="btn btn-success" id="deletar">Deletar</button></td>
 
        </tr>`
        
    })
    tableData.innerHTML = output; 
}

fetch(url)
.then(resp => resp.json()) // Retorna um arquivo Json
.then(data => readData(data))


var divBotoes = document.querySelector('#botoes');

tableData.addEventListener('click', (e) => {
   e.preventDefault();
 

   let btnDelete = e.target.id = "deletar";
   let btnEdit = e.target.id = "editar";
   let id = e.target.parentElement.id;

   

       if(btnDelete) {

        console.log("delete pressionado")

       fetch(` ${url}/${id}`, {
       method: 'DELETE',
       })

       .then(resp => resp.json())
       .then(() => location.reload())
    } 

    
    if(btnEdit) {
      
    }
})


 // Create - Insert
 // Method: POST

 addForm.addEventListener('submit', (e) => {
    e.preventDefault()       //Para não dar reload na página. Evuta comportamento padrão
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {   // transforma o que você digita no formulario em um objeto JSON
            descricao: atvDescricao.value,
            categoria: atvCategoria.value,
            duracao: atvDuracao.value

        })
    })

    .then (resp => resp.json())
    .then(data => {
        let dataArr = [];
        dataArr.push(data);
        readData(dataArr);
    })
 })
 




