const form = document.getElementById("form-contacts");
const nomeContato = document.getElementById("nome-contato");
const numeroContato = document.getElementById("numero-contato");
const btnImg = document.getElementById("btn-img");
const tbody = document.getElementById("table-body");
const contatosLista = [];
const msgError = document.getElementById('error-msg');


form.addEventListener('submit', function(e){
    e.preventDefault();
        const nomeC = nomeContato.value;
        const numeroC = numeroContato.value;
        console.log(numeroC.length, nomeC.length);
        msgError.innerHTML = "";
        let mensagem = "";
        if(nomeC.length > 80){
            mensagem += "Nome ultrapassou caracteres limites.    "
        }
        if(numeroC.length > 11 || numeroC.length < 11){
            mensagem += "Número invalido!"
        }
        if(mensagem !== ""){
            const novoSpan = document.createElement("span");
            novoSpan.innerText = mensagem;
            msgError.appendChild(novoSpan);
            return;
        }
        if(contatosLista.includes(numeroContato.value)){
            const novoSpan = document.createElement("span")
            novoSpan.innerHTML = `O número '${numeroContato.value}' já esta cadastrado. Porfavor tente outro!`
            msgError.appendChild(novoSpan);
        }else{
            inserirNumeroArray();
            inserirContato();
            nomeContato.value = "";
            numeroContato.value = ""; 
        }
});

function inserirContato(){
    const novoTr = document.createElement("tr");
    novoTr.innerHTML = `<td>${nomeContato.value}</td> <td>${numeroContato.value}</td> <td><img src="./img/lixo.png" class="btn-img" id="img-2" alt="imagem de lixeira"></td>`
    tbody.appendChild(novoTr);
}

// remover um contato da lista e do array contatosLista.
tbody.addEventListener("click", function(e){
    if(e.target && e.target.classList.contains("btn-img")){
        const linha = e.target.closest("tr");
        const numeroRemover = linha.querySelectorAll("td")[1].innerText;
        linha.remove();
        const index = contatosLista.indexOf(numeroRemover);
        if (index !== -1){
            contatosLista.splice(index, 1)
        }
    }
});



function inserirNumeroArray (){
    numeroC = numeroContato.value;
    contatosLista.push(numeroC);
    console.log(contatosLista);
}

