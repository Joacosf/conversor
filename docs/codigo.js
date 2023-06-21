const monedaUno = document.getElementById("moneda-uno");
const monedaDos = document.getElementById("moneda-dos");
const cantidadUno = document.getElementById("cantidad-uno");
const cantidadDos = document.getElementById("cantidad-dos");
const cambio = document.getElementById("cambio");
const tazaCambio = document.getElementById("taza");

// funcion calcular y fetch

function calcular(){
    const moneda1 = monedaUno.value;
    const moneda2 = monedaDos.value;


    const moneda = fetch(`https://api.exchangerate-api.com/v4/latest/${moneda1}`)
                .then(res => res.json())
                .then(data => {
                    const taza = data.rates[moneda2];
                    cambio.innerText = `1 ${moneda1} = ${taza} ${moneda2}`;
                    cantidadDos.value = (cantidadUno.value * taza).toFixed(2);
                });
}

// eventos
monedaUno.addEventListener("change", calcular);
cantidadUno.addEventListener("input", calcular);
monedaDos.addEventListener("change", calcular);
cantidadDos.addEventListener("input", calcular);

taza.addEventListener("click", () => {
    const temp = monedaUno.value;
    monedaUno.value = monedaDos.value;
    monedaDos.value = temp;
    calcular();
});

calcular();
