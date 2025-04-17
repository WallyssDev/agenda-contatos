document.addEventListener("DOMContentLoaded", function () {
    Inputmask({"mask": "(99) 99999-9999"}).mask("#numero-contato");

    const form = document.getElementById("form-contacts");
    const nomeContato = document.getElementById("nome-contato");
    const numeroContato = document.getElementById("numero-contato");
    const tbody = document.getElementById("table-body");
    const contatosLista = [];
    const msgError = document.getElementById('error-msg');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        const nomeC = nomeContato.value;
        const numeroC = numeroContato.value.replace(/\D/g, '');
        msgError.innerHTML = "";
        let mensagem = "";

        if(nomeC.length > 80){
            mensagem += "Nome ultrapassou caracteres limites. ";
        }

        if(numeroC.length !== 11){
            mensagem += "Número inválido! ";
        }

        if(mensagem !== ""){
            const novoSpan = document.createElement("span");
            novoSpan.innerText = mensagem;
            msgError.appendChild(novoSpan);
            return;
        }

        if(contatosLista.includes(numeroC)){
            const novoSpan = document.createElement("span");
            novoSpan.innerHTML = `O número '${numeroContato.value}' já está cadastrado. Por favor, tente outro!`;
            msgError.appendChild(novoSpan);
        } else {
            inserirNumeroArray(numeroC);
            inserirContato();
            nomeContato.value = "";
            numeroContato.value = ""; 
        }
    });

    function inserirContato(){
        const novoTr = document.createElement("tr");
        novoTr.innerHTML = `<td>${nomeContato.value}</td> <td>${numeroContato.value}</td> <td><img src="./img/lixo.png" class="btn-img" id="img-2" alt="imagem de lixeira"></td>`;
        tbody.appendChild(novoTr);
    }

    tbody.addEventListener("click", function(e){
        if(e.target && e.target.classList.contains("btn-img")){
            const linha = e.target.closest("tr");
            const numeroRemover = linha.querySelectorAll("td")[1].innerText.replace(/\D/g, '');
            linha.remove();
            const index = contatosLista.indexOf(numeroRemover);
            if (index !== -1){
                contatosLista.splice(index, 1);
            }
        }
    });

    function inserirNumeroArray(numeroC){
        contatosLista.push(numeroC);
    }
});
