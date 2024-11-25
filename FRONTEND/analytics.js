const apiKey = 'ae948b4627b7974dc7686b83b973dac6';

const form = document.getElementById('formid'); 

form.addEventListener('submit', async function(event){
    event.preventDefault()
    if(document.querySelector('.container-resultado')){
        document.querySelector('.container-resultado').classList.remove('invisivel');
    }

    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

    const data = await response.json();
    console.log(data);
    const umidade = data.main.humidity;
    const velocidadeVento = (data.wind.speed); 
    const temperatura = (data.main.temp - 273.15);

    calcularRiscoDeFogo(temperatura, umidade, velocidadeVento);
})

function calcularRiscoDeFogo(temperatura, umidade, velocidadeVento){

    if ( document.querySelector('.container-resultado')) {
        document.querySelector('.container-resultado').remove();
    }

    const container = document.createElement('div');
    container.className = 'container-resultado';
    container.innerHTML = `
        <h3 class="risco-text"></h3>
        <div class="grafico-risco">
            <canvas id="myChart"></canvas>
        </div>
    `;
    document.body.appendChild(container);

    window.scrollTo({
        top: container.offsetTop,
        behavior: 'smooth'
      });

    const result = (temperatura / umidade) + velocidadeVento;
    const ctx = document.getElementById('myChart');

    let barColor;
    let classificacao;
    if (result < 3) {
        barColor = 'green';
        classificacao = 'Risco Baixo';
    } else if (result >= 3 && result < 6) {
        barColor = 'yellow';
        classificacao = 'Risco Moderado';
    } else {
        barColor = 'red';
        classificacao = 'Risco Alto';
    }

    document.querySelector('.risco-text').innerHTML = classificacao;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [classificacao],
        datasets: [{
          label: 'Risco de Fogo',
          data: [result],
          borderWidth: 1,
          backgroundColor: barColor
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 10,
            stepSize: 1,
          }
        }
      }
    });
}


