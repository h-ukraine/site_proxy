var handlers = {
  L1_Click: () => { },
  L2_Click: () => { },
  L3_Click: () => { },
  L4_Click: () => { },
  //
  But1_Click: () => { },
  But2_Click: () => { },
  But3_Click: () => { },
  But4_Click: () => { }
}


// --------------- send strings ----------------------- 
//send hello
handlers.L1_Click = () => {
  browser.client.wsSendObject({
    action: 'hello',
    data: 'greeting string'
  });
}


//send greeting
handlers.L2_Click = () => {
  // browser.client.wsSendObject(
  //   {
  //     action: 'greeting',
  //     data: 'greeting string'
  //   });

  browser.client.wsSendObject(
    {
      action: 'transport',
      data: 'transported message2'
    });

}





handlers.L3_Click = () => {
  // var longmessage;


  // let m100;
  // let blong;

  // for (i = 0; i < 100; i++) {
  //   let mess = "aaaaabbbbb";
  //   m100 += mess;
  // }

  // for (i = 0; i < 1; i++) {

  //   blong += m100;
  // }
  blong = '';

  for (i = 0; i < 22000 - 31; i++)
    blong += 'v';


  // browser.client.wsSendTXT(blong);

  browser.client.wsSendObject(
    {
      action: 'greeting',
      message: blong
    });
  // browser.client.wsSendObject(
  //   {
  //     action: 'greeting',
  //     data: blong
  //   });

}



handlers.L4_Click = () => {
  let str = "11111222223333344444";

  let str100 = str + str + str + str + str;

  let str_500 = str100 + str100 + str100 + str100 + str100;
  let str_1000 = str_500 + str_500;

  let max = '';

  for (i = 0; i < 132 * 1; i++)
    max += str_1000;
  let nlen = max.length;
  console.log(`send length = ${nlen}`);
  // browser.client.wsSendTXT(max);

  browser.client.wsSendObject(
    {
      action: 'greeting',
      message: max
    });

  browser.client.wsSendObject(
    {
      action: 'greeting',
      message: max
    });
  // browser.client.wsSendTXT(max);
  // browser.client.wsSendTXT(str_10000);
}




// ---------------- send command objects -----------------------

// Command1
handlers.But1_Click = () => {
  browser.client.wsSendObject(
    {
      action: 'command1',
      id: 765,
      msg: "Button1 clicked",
      temperature: 23.5,

    }
  )
}

//Command2
handlers.But2_Click = () => {
  // browser.client.wsSendObject(
  //   {
  //     action: 'command2',
  //     msg: "Button2 clicked",
  //     ActivePower: 100,
  //     nmb: 999
  //   }
  // )
  browser.client.wsSendObject(
    {
      action: 'greeting',
      data: 'transported message2'
    });
}



handlers.But3_Click = () => {

}




var tim = null;
var sav_color = 'grey;'

var eperiod = 330;


handlers.But4_Click = () => {

  if (tim == null) {
    tim = setInterval(() => {
      browser.client.wsSendObject(
        {
          action: 'transport',
          data: 'periodic text\r\n'
        });

    }, eperiod);

    // if (div = document.getElementById('bbut4')) {
    //   sav_color = div.style.background;
    //   div.style.background = 'rgb(255,120,110)';
    // }

    if (list = document.getElementsByName('togglebutton')) {
      Array.from(list).forEach(element => {
        sav_color = element.style.background;
        element.style.background = 'rgb(255,120,110)';
      });
    }


  }
  else {
    clearInterval(tim);
    tim = null;
    // if (div = document.getElementById('bbut4')) {
    //   div.style.background = sav_color;
    // }
    if (list = document.getElementsByName('togglebutton')) {
      Array.from(list).forEach(element => {
        element.style.background = sav_color;
      });
    }

  }

}