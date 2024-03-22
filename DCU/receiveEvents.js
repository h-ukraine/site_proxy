// DCU receiving events handlers

function events_init() {
  if (browser) {
    browser.userOnString = DcuOnString;
    browser.userOnObject = DcuOnObject;
  }
  else {
    console.log("browser DCU events not initialized")
  }
}



function DcuOnString(message) {

  // message - is simple string response from C#
  let info = message;

}







function DcuOnObject_old(obj) {

  //  obj - is response object from c#
  let keys = Object.keys(obj);
  let values = Object.values(obj);


  // Do some usefull job  .....
  //...
  let array = [];

  keys.forEach(key => {
    array.push(obj[key]);

  });
  //....

}





function DcuOnObject(obj) {

  //  obj - is response object from c#
  let keys = Object.keys(obj);
  let values = Object.values(obj);

  let ybj;

  if (obj.hasOwnProperty('action')) {
    if (obj.action == 'transport') {
      let str = obj.message;

      yobj = JSON.parse(str);

      // yobj = [];
    }
    set_select2(yobj['MeterNames']);
  }

  else if (obj.hasOwnProperty('MeterNames')) {
    yobj = obj.MeterNames; //    JSON.parse(obj.MeterNames);

    yobj = [];
  }



  let prp = obj.hasOwnProperty('ContName');

  if (prp) {
    let xx = obj.records;

    //if (xx != undefined)

    obj.records.forEach(element => {

      console.debug(element.Power1);

      let xf = 0;

    });


    let xf = 0;

  }


  // Do some usefull job  .....
  //...
  let array = [];

  keys.forEach(key => {
    array.push(obj[key]);

  });
  //....

}