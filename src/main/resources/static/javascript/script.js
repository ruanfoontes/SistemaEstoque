let validator = {
    handleSubmit: async (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if (check !== true) {
                send = false;
                validator.showError(input, check);
            }
        }

        if (send) {
            await submitToServer();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value.trim() === '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        let min = parseInt(rDetails[1], 10);
                        if (input.value.length < min) {
                            return `Campo deve ter no mínimo ${min} caracteres.`;
                        }
                        break;
                    case 'email':
                        if (input.value !== '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido.';
                            }
                        }
                        break;
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }
        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validator');

function getFormData() {
    const emailInput = form.querySelector('#input-email');
    const passInput = form.querySelector('#input-pass');

    return {
        email: emailInput ? emailInput.value.trim() : '',
        password: passInput ? passInput.value : '',
        name: form.dataset.endpoint === '/register' && emailInput ? emailInput.value.trim() : ''
    };
}

async function submitToServer(event) {
    if (event) event.preventDefault();

    console.log("Tentando enviar para o Java...");

    const path = form.dataset.endpoint || '/login';
    const endpoint = 'http://localhost:8080{path}';

    console.log("Enviando para o endpoint:", endpoint);
    const payload = getFormData();

    console.log("JSON que será enviado:", JSON.stringify(playload));

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        console.log("Resposta do java:", text);

        if (response.ok || text.toLoswerCase().include("sucesso")) {

            const destino = (path === '/register') ? 'index.html' : 'homepage.html'; // Ajuste 'dashboard.html' para o seu nome real

            console.log("Tentando navegar para: " + destino);
            window.location.assign(destino);

        } else {
            alert("Erro: verifique os dados informados.");
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Não foi possível conectar ao servidor Java.');
    }
}

form.addEventListener('submit', validator.handleSubmit);











//icones do linkedin

const btnLinkedin = document.getElementById('btn-linkedin');
const menuDevs = document.getElementById('menu-devs');

// Abre/Fecha ao clicar no ícone
btnLinkedin.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede o clique de chegar no 'window'
    menuDevs.classList.toggle('mostrar');
});

// Fecha o menu se clicar em qualquer outro lugar da tela
window.addEventListener('click', () => {
    if (menuDevs.classList.contains('mostrar')) {
        menuDevs.classList.remove('mostrar');
    }
});
