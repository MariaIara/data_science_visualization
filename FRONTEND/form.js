const cep = document.getElementById('cep')
const estado = document.getElementById('input_estado')
const cidade = document.getElementById('input_cidade')

cep.addEventListener('change', async function(){
    if(cep.value.length != 8){
        alert('CEP inválido')
        return
    }
    try{
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        const data = await response.json()
        console.log(data)

        if(data.estado == undefined || data.localidade == undefined){
            alert('CEP inválido')
            return
        }

        estado.value = data.estado
        cidade.value = data.localidade
    }
    catch(error){
        alert("Houve um erro. Tente novamente.")
    }
})

function updateValue(value) {
    document.getElementById('output').textContent = value;
}

