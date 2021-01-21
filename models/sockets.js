const Marcadores = require('./marcadores');

class Sockets {
  constructor(io) {
    this.io = io;

    this.marcadores = new Marcadores();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('cliente conectado ', socket.id);

      socket.emit('marcadores-activos', this.marcadores.activos);

      socket.on('marcador-nuevo', (marcador) => {
        this.marcadores.agregarMarcador(marcador);

        // broadcast permite emitir un evento para todos los clientes menos al que envió la info
        socket.broadcast.emit('marcador-nuevo', marcador);
      });

      socket.on('marcador-actualizado', (marcador) => {
        this.marcadores.actualizarMarcador(marcador);
        socket.broadcast.emit('marcador-actualizado', marcador);
      });
    });
  }
}

module.exports = Sockets;
