class GenericWebSocketClient {

  get status() {
    let stat = ['CONNECTING', "OPEN", 'CLOSING', 'CLOSED'];
    let result = stat[this.wsocket.readyState];
    return result;
  }

  callback = {
    onanymessage: (msg) => { },
    onstring: (str) => { },
    onobject: (obj) => { }
  }


  restart() {
    if (this.wsocket)
      this.wsocket.close();
    this.wsocket = new WebSocket(this.targethost);
    this.wsocket.parentclass = this;

    this.wsocket.onerror = (evt) => {
      let g = evt.currentTarget;
      console.log(this.status);
    }

    // обработчик проинформирует в консоль когда соединение установится
    this.wsocket.onopen = function (evt) {
      this.parentclass.wsSendObject({ action: 'hello', data: 'Hello World!' });
      console.log('подключился');
    };

    // обработчик сообщений от сервера
    this.wsocket.onmessage = function (message) {
      var typ = typeof (message.data);
      let isjson = false;

      if (message.data.includes('{') && message.data.includes('}')) {
        try { isjson = isJSON(message.data); }
        catch (ee) { }
      }
      if (isjson) {
        let received = JSON.parse(message.data);
        typ = typeof (received);

        if (typ == 'object')
          this.parentclass.callback.onobject(received);
        else if (typ == 'string') {
          this.parentclass.callback.onstring(received);
        }
      }
      else if (typ == 'string') {
        this.parentclass.callback.onstring(message.data);
      }



      let styleobj = 'color:rgb(50,255,50); font-size:14px; background: linear-gradient(gold, rgba(0,0,0,0.8));padding:2px;';
      let stylestr = 'color:blue; font-size:13px;'
      // console.log('Message: %c%s', style, message.data);
      // console.log('Message: %c%s', style, `${message.data}`);
      console.log(`${typ}: %c%s`, typ == 'object' ? styleobj : stylestr, message.data);

    }
  };



  // функция для отправки echo-сообщений на сервер
  wsSendEcho(value) {
    this.wsocket.send(JSON.stringify({ action: 'ECHO', data: value.toString() }));
    // this.wsocket.#trySend(JSON.stringify({ action: 'ECHO', data: value.toString() }));
  }

  // функция для отправки команды ping на сервер
  wsSendPing() {
    this.wsocket.send(JSON.stringify({ action: 'PING' }));
  }


  // функция для отправки object на сервер
  wsSendObject(obj) {
    let str = JSON.stringify(obj);
    this.#_trySend(str);
  }



  wsSendTXT(message) {
    this.#_trySend(message);
  }



  // readonly property  settable only by constructor!    
  get reconnectInterval() {
    return this.#local.period;
  }

  //Private functions and properties
  #local = {
    period: 4950,
  }

  #_trySend(str) {
    try {
      if (this.wsocket.readyState == WebSocket.OPEN)
        this.wsocket.send(str);
    }
    catch (ex) {
      console.log(`${ex}`);
    }
  }

  #_loop_reconnect = () => {
    if (!this.wsocket || this.wsocket.readyState != WebSocket.OPEN)
      this.restart();

    setTimeout(this.#_loop_reconnect, this.#local.period);
  }


  // Constructor
  constructor(hostname, reconnect_timeeout = 4990) {
    this.targethost = hostname;
    this.#local.period = reconnect_timeeout;
    this.#_loop_reconnect();
  }


}


