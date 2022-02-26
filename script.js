
const Player = (name, marca) => {
  const getName = () => name;
  const getMarca = () => marca;
  return { getName, getMarca };
};

const player1 = Player("Jose", "X");
const player2 = Player("Lean", "O");
const bttnReset = document.getElementById("resetBttn");

const displayAdmin = (
  () => {

    let JUGADAS_PENDIENTES = 9;
    let ganoAlguien = false;
    let turnoJugador = player1;
    let tie = false;
    const getAQuienLetoca = () => turnoJugador;
    const getGanoAlguien = () => ganoAlguien;
    const getJugadasPendientes = () => JUGADAS_PENDIENTES;
    const getEmpate = () => tie;
    const actualizarJugador = () => {
      if (turnoJugador == player1){
        turnoJugador = player2;
      } else {
        turnoJugador = player1;
      }
    }

    const checkWinner = () => {
      JUGADAS_PENDIENTES--;
      winningAxes.forEach((combinacion) => {
        if (tablero.getTableroActual()[combinacion[0]].innerHTML === getAQuienLetoca().getMarca() && 
          tablero.getTableroActual()[combinacion[1]].innerHTML === getAQuienLetoca().getMarca()
          && tablero.getTableroActual()[combinacion[2]].innerHTML === getAQuienLetoca().getMarca()) {
          ganoAlguien = true;

          tablero.modoVictoria(combinacion);

        } else {
          if (getJugadasPendientes() == 0) {
            tie = true;
            tablero.modoEmpate();
          }
        }
      })
    }

    const winningAxes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return {
      checkWinner,
      getAQuienLetoca,
      getGanoAlguien,
      actualizarJugador,
      getJugadasPendientes,
      getEmpate
    }
})()



const tablero = (() => {

  let celdas = document.querySelectorAll(".celda");

  celdas.forEach((celda) => {
    celda.addEventListener("click", () => {
      actualizarCelda(celda, displayAdmin.getAQuienLetoca().getMarca());
    })
  })

  bttnReset.addEventListener("click", () => {resetearTablero()})

  const getTableroActual = () => celdas;

  function resetearTablero(){
    location.reload();
  }

  function celdaLibre(celda) {
    return (celda.innerHTML == "");
  }

  function marcoPosicion(celda, jugadorMarca) {
    celda.innerHTML = jugadorMarca;
    celda.classList.add("active")
  }

  function actualizarCelda(celda, jugadorMarca) {
    if (displayAdmin.getGanoAlguien()) return;
    if (!celdaLibre(celda)) return;
    marcoPosicion(celda, jugadorMarca);
    displayAdmin.checkWinner()
    displayAdmin.actualizarJugador();
  }

  function modoVictoria(posicionCeldas) {
    posicionCeldas.forEach ( posicion => {
      celdas[posicion].classList.add("winner");
    })
    activarReset()
  }

  function modoEmpate() {
    celdas.forEach(celda => {
      celda.classList.add("tie");

    })
    activarReset()
  }

  function activarReset() {
    bttnReset.classList.remove("hidden");
  }

  return {
    getTableroActual,
    modoVictoria,
    modoEmpate,
  };

})();

