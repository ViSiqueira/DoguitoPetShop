export function valida(input) {

    const tipoDeInput=input.dataset.tipo

    if (validadores [tipoDeInput]) {
        validadores [tipoDeInput] (input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove (`input-container--invalido`)
        input.parentElement.querySelector (`.input-mensagem-erro`).innerHTML = " "
    } else {
        input.parentElement.classList.add (`input-container--invalido`)
        input.parentElement.querySelector (".input-mesagem-erro").innerHTML = mostraMensagemDeErro (tipoDeInput,input)
    }
}
    
    const tiposDeErro = [
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError"
    ]

    const mensagensDeErro = {
        nome: {
            valueMissing:"O campo nome nao pode estar vazio."
        },
        email:{
            valueMissing:"O campo email nao pode estar vazio.",
            typeMismatch:"O email digitado não é válido." 
        },
        senha: {
            valueMissing: "O campo senha não pode estar vazio.",
            patternMismatch:" A senha deve conter de 6 a 12 caracteres, deve conter uma letra maiúscula, uma letra minúscula e nao deve conter símbolos."
        },
        dataNascimento: {
            valueMissing:"O campo data de nascimento nao pode estar vazio.",
            customError:"Voce deve ter mais de 18 anos parase cadastrar."
        },

        cpf:  { 
            valueMissing:'O campo de CPF não pode estar vazio.',
            customError: 'O CPF digitado não é valido.'
        }, 

        cep: {
            valueMissing:'O campo de CEP não pode estar vazio.',
            patternMismatch:'O CEP digitado não é válido.',
            customError: 'Nao foi possivel encontrar o CEP.'
        }, 

        logradouro:{
            valueMissing:'O campo logradouro nao pode estar vazio.'
        }, 

        cidade: {
            valueMissing:'O campo cidade não pode estar vazio.'
        },

        estado: {
            valueMissing:'O campo estado nao pode estar vazio.'
        },
        preco: {
            valueMissing:'O campo de preço nao pode estar vazio.'
        }

    }
    const validadores = {
        dataNascimento:input => validaDataNascimento(input),
        cpf: input => validaCPF (input),
        cep:input => recuperarCEP (input)
    }

function mostraMensagemDeErro (tipoDeInput, input) {
    let mensagem=" "
        tiposDeErro.forEach (erro => {
            if (input.validity [erro]) {
                mensagem = mensagensDeErro [tipoDeInput] [erro]
            }
        })
    return mensagem 
}

function validaDataNascimento (input) {

    const dataRecebida = newDate (input.value)
    let mensagem = ""
    if(!maiorQue18 (dataRecebida)) {
        mensagem="Vode deve ter mais de 18 anos para se cadastrar."
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {

    const dataAtual=newDate()
    const dataMais18=newDate (data.getUTCFullYear() + data.getUTCMonth(), data.getUTCDate())
    return dataMais18<=dataAtual
}

function validaCPF (input) {
    
    const cpfFormatado= input.value.replace (/\D/g, '')
    let mensagem = ''
    if (!checaCPFRepetido (cpfFormatado)|| !checaEstruturaCPF (cpfFormatado)) {
        mensagem = 'O CPF digitado não é valido.'
    }
    input.setCustomValidity (mensagem)
}

function checaCPFRepetido (cpf) {
    
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true
    .valoresRepetidos.foreach (valor => {
        if (valor == cpf) {
            cpfValido= false
        }
        })

    return cpfValido
}

function checaEstruturaCPF (cpf) {
    const multiplicador = 10
    return checaDigitoVerfificador (cpf, multiplicador)
}

function checaDigitoVerificador (cpf, multiplicador) {
    if (mutiplicador>=12) {
        return true
    }
    let mutiplicadorInicial = multiplicador
    let soma=0
    const cpfSemDigitos = cpf.substr (0, multiplicador-1).split ('')
    const digitoVerificador = cpf.charAt(multiplicador-1)
    for (let contador=0; multiplidadorInicial>1; multiplicadorInicial--) {
        somo=soma+cpfSemDigitos [contador]*multiplicadorInicial
        contador++
    }
    if (digitoVerificado== confirmaDigito(soma)) {
        return checaDigitoVerficados (cpf,multiplicador+1)
    }
    return false

    function confirmaDigito(soma)    {
        return 11 - (soma % 11)
    }
}

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '')
    const url = 'https://viacep.com.br/ws/${cep}/json/'
    const options = {
        method: 'GET',
        mode: 'cors',
            headers: {
            'content-type':'application/json;charset=UTF-8'
            }
        }
        if(!input.validity.patternMismatch && !input.validity.valueMissing) {
            fetch(url, options) .then (
                response => response.json ()
            ) .then (
                data => {
                    if (data.erro) {
                        input.setCustomValidity('Nao foi possivel encontrar o CEP.')
                        return 
                    }
                    input.setCustomValidity(' ')
                    preencheCamposComCEP(data)
                    return
                }
            ) 
        }
    }

function preencheCamposComCEP(data) {
    const logradouro = document.querySelector ('[data-tipo="logradouro"]')
    const cidade = document.querySelector ('[data-tipo="cidade"]')
    const estado = document.querySelector ('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf

}
