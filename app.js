var idBooks = document.getElementById('inputID'),
    titleBooks = document.getElementById('inputTitulo'),
    authorBooks = document.getElementById('inputAutor'),
    yearBooks = document.getElementById('inputAno'),
    genderBooks = document.getElementById('inputGenero'),
    editionBooks = document.getElementById('inputEdicao'),
    pagesBooks = document.getElementById('inputQtdPaginas'),
    situationBooks = document.getElementById('inputSituacao'),
    localBooks = document.getElementById('inputLocal'),
    photoBooks = document.querySelector('#inputFoto'),
    btnAdd = document.querySelector('#btnSalvar'),
    btnEdit = document.querySelector('#btnEditar'),
    btnDelet = document.querySelector('#btnDeletar'),
    data = document.getElementById('data'),
    file = document.getElementById("imgInput"),
    imgInput = document.querySelector(".img")
myForm = document.getElementById('myForm');


const url = 'https://jsonserver-7.gustavovilarino.repl.co/books';
var output = ' ';


const renderBooks = (books) => {
    books.forEach(book => {
        output += `<tr>
        <td>${book.id}</td>
        <td>${book.autor}</td>
        <td>${book.titulo}</td>
        <td>${book.edicao}</td>
        <td>${book.ano}</td>
        <td>${book.genero}</td>
        <td>${book.qtde_paginas}</td>
        <td><img src= "${book.foto}" width = "50px"></td>
        <td>${book.local}</td>
        <td>${book.emprestado}</td>
        <td data-id=${book.id}><button type="button" id="btnEditar"class="btn btn-success" > Editar </button>
        <button type="button" id="btnDeletar" class="btn btn-success"> Deletar </button>
 </td>`; 

    });

    document.getElementById('data').innerHTML = output;

}

fetch(url)
    .then(resp => resp.json())
    .then(data => renderBooks(data))



myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                autor: authorBooks.value,
                titulo: titleBooks.value,
                edicao: editionBooks.value,
                ano: yearBooks.value,
                genero: genderBooks.value,
                qtde_paginas: pagesBooks.value,
                foto: imgInput.src == undefined ? "/sem_Cadastro_Imagem.png" : imgInput.src,
                local: localBooks.value,
                emprestado: situationBooks.value
            })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderBooks(dataArr);
    })
})



file.onchange = function () {
    if (file.files[0].size < 1000000) {
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("Foto de tamanho incompativel")
    }
}


gridLivros = document.getElementById("grid_Livros");
gridLivros.addEventListener('click', function (e) {



    if (e.target.tagName == "TD") {


        // Obtem as colunas da linha selecionada na tabela
        let linhaLivros = e.target.parentNode;
        colunas = linhaLivros.querySelectorAll("td");

        // Preenche os campos do formulário com os dados da linha selecionada na tabela
        document.getElementById('inputID').value = colunas[0].innerText;
        document.getElementById('inputAutor').value = colunas[1].innerText;
        document.getElementById('inputTitulo').value = colunas[2].innerText;
        document.getElementById('inputEdicao').value = colunas[3].innerText;
        document.getElementById('inputAno').value = colunas[4].innerText;
        document.getElementById('inputGenero').value = colunas[5].innerText;
        document.getElementById('inputQtdPaginas').value = colunas[6].innerText
        document.querySelector('.img').value = colunas[7].innerText;
        document.getElementById('inputLocal').value = colunas[8].innerText
        document.getElementById('inputSituacao').value = colunas[9].innerText



    }


});

data.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'btnDeletar';
    let editButtonIsPressed = e.target.id == 'btnEditar';

    let id = e.target.parentElement.dataset.id;

    if (delButtonIsPressed) {
        fetch(`${url}/${id}`,
            { method: 'DELETE', })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if (editButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                autor: authorBooks.value,
                titulo: titleBooks.value,
                edicao: editionBooks.value,
                ano: yearBooks.value,
                genero: genderBooks.value,
                qtde_paginas: pagesBooks.value,
                foto: imgInput.src == undefined ? "/sem_Cadastro_Imagem.png" : imgInput.src,
                local: localBooks.value,
                emprestado: situationBooks.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
        alert('Livro alterado com sucesso')

    }


});














