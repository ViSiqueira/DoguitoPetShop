import {valida} from `.validacao.js`

const inputs = documente.querySelectorAll (`input`)

inputs.forEach (input => {

    if(input.dataset.tipo==='preco') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSparator: ',',
            thousandsSeparetor: '.',
            cursor: 'end'
        })
    }
    input.addEventListener(`blur`, (evento) => {
        valida (evento.target)
    })
})