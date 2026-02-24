// Conversor de unidades con validaciones
// No usa librerías externas

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funciones de conversión
function convertirTemperatura(valor, from, to) {
  let resultado;

  if (from === "C" && to === "F") {
    resultado = (valor * 9/5) + 32;
  } 
  else if (from === "F" && to === "C") {
    resultado = (valor - 32) * 5/9;
  } 
  else if (from === "C" && to === "K") {
    resultado = valor + 273.15;
  } 
  else {
    throw new Error("Conversión de temperatura no soportada");
  }

  return resultado.toFixed(2);
}

function convertirLongitud(valor, from, to) {
  let resultado;

  if (from === "m" && to === "km") {
    resultado = valor / 1000;
  } 
  else if (from === "km" && to === "m") {
    resultado = valor * 1000;
  } 
  else if (from === "cm" && to === "m") {
    resultado = valor / 100;
  } 
  else {
    throw new Error("Conversión de longitud no soportada");
  }

  return resultado.toFixed(2);
}

// Validar número
function validarNumero(valor) {
  if (isNaN(valor) || !isFinite(valor)) {
    throw new Error("El valor ingresado no es un número válido");
  }
}

// Menú principal
console.log("=== CONVERSOR DE UNIDADES ===");
console.log("1. Temperatura");
console.log("2. Longitud");

rl.question("Selecciona una opción (1 o 2): ", (opcion) => {

  if (opcion !== "1" && opcion !== "2") {
    console.log("❌ Opción inválida");
    rl.close();
    return;
  }

  rl.question("Ingresa el valor a convertir: ", (valorInput) => {
    const valor = parseFloat(valorInput);

    try {
      validarNumero(valor);
    } catch (error) {
      console.log("❌ Error:", error.message);
      rl.close();
      return;
    }

    rl.question("Unidad origen (C, F, K, m, km, cm): ", (from) => {
      rl.question("Unidad destino (C, F, K, m, km, cm): ", (to) => {

        try {
          let resultado;

          if (opcion === "1") {
            resultado = convertirTemperatura(valor, from, to);
            console.log(`✅ Resultado: ${resultado} ${to}`);
          } 
          else {
            resultado = convertirLongitud(valor, from, to);
            console.log(`✅ Resultado: ${resultado} ${to}`);
          }

        } catch (error) {
          console.log("❌ Error:", error.message);
        }

        rl.close();
      });
    });
  });
});