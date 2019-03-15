(function() {

    var url = 'http://localhost:3000';
    var primus = new Primus(url, { strategy: [ 'online', 'timeout', 'disconnect' ]});

    function emit(cmd, params) {
        var str = JSON.stringify({ cmd: cmd, params: params });
        primus.write(str);
    }

    primus.on('open', function open() {
        console.log('Connection is alive and kicking');
    });

    primus.on('data', function message(data) {
        console.log('Received a new message from the server', data);
    });


    emit('init', { uid: 124 });

    setTimeout(() => {
        emit('start', { uid: 124 })
    }, 3000);
   

})();