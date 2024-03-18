class BrowserClient {


  userOnString = () => { };

  userOnObject = () => { };

  constructor() {
    // this.client = new GenericWebSocketClient('ws://' + location.hostname + ':8080', 5000);
    // this.client = new GenericWebSocketClient('ws://' + location.hostname + ':50730/chat=gena', 5000);
    this.client = new GenericWebSocketClient('ws://' + 'localhost:63500/chat=gena', 5000);

    let cnt = 0, cnt1 = 0;
    this.client.callback.onstring = (str) => {

      let div = document.createElement('div');
      div.className = 'onestring';
      div.innerText = (cnt1++).toString() + ': ' + str;


      let area = document.getElementById('area1');
      area.appendChild(div);
      if (area.childElementCount > 13)
        area.firstChild.remove();

      this.userOnString(str);
    }


    this.client.callback.onobject = (obj) => {

      let div = document.createElement('div');
      div.className = 'autoHeight';   //= 'onestring';

      let msg = (cnt++).toString() + ':\n';   //'data:\n';
      var bbb = Object.keys(obj);

      bbb.forEach(key => {
        var k = key;

        var v = obj[key];
        msg = msg + key + ' : ' + obj[key] + '\n';
      });

      div.innerText = msg; //            `data: ` + obj.data;


      let area = document.getElementById('area2')
      area.appendChild(div);
      if (area.childElementCount >= 6)
        area.firstChild.remove();

      // area.scrollTo(0, document.body.scrollHeight);
      // area.scrollTo(0, area.scrollHeight);
      area.scrollTop = area.scrollHeight;

      this.userOnObject(obj);
    }
  }

}