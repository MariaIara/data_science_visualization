const apiKey = 'ae948b4627b7974dc7686b83b973dac6';

const form = document.getElementById('formid'); 

form.addEventListener('submit', async function(event){
    event.preventDefault()
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    const umidade = data.main.humidity;
    const velocidadeVento = (data.wind.speed * 3.6).toFixed(2); 
    const temperatura = (data.main.temp - 273.15).toFixed(2);
    const riscoFogo = ((temperatura * 0.7) - (umidade * 0.3) + (velocidadeVento * 0.5)).toFixed(2);
    const riscoNormalizado = Math.max(0, Math.min(riscoFogo, 100));

    console.log(`Temperatura: ${temperatura} °C`);
    console.log(`Velocidade do Vento: ${velocidadeVento} km/h`);
    console.log(`Umidade: ${umidade}%`);
    console.log(`Risco de Fogo: ${riscoNormalizado}`);
})

