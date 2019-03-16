(function() {

    var url = 'http://localhost:3000';
    var primus = new Primus(url, { strategy: [ 'online', 'timeout', 'disconnect' ]});

    var uid = 0;

    function emit(cmd, params) {
        params = params || {};
        Object.assign(params, { uid: uid });
        var str = JSON.stringify({ cmd: cmd, params: params });
        primus.write(str);
    }
    window.emit = emit;

    primus.on('open', function open() {
        console.log('Connection is alive and kicking');
    });

    primus.on('data', function message(data) {
        console.log('Received:', data);
    });


    emit('init');

    setTimeout(() => {
        emit('start');
        
        setTimeout(() => {
            emit('go', { mx: 1, my: 0 });
        }, 2000);

    }, 2000);
   

})();