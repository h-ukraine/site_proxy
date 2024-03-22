
// ---------------  Meter names -------------------
let ttt_str = `{ "MeterNames": ["FSF2341048380481", "FSF2341048380480", "FSF2341048380580", "FSF2341048380680"] }`;

let str234 = { "action": "transport", "message": { "MeterNames": ["INC2341048380481", "INC2341048380480", "INC2341048380580", "INC2341048380680"] } };


let tttobj = JSON.parse(ttt_str);

function set_select2(arr = []) {
  var s2 = document.querySelector('#select2');

  s2.options.length = 0;



  if (arr.length == 0) { arr = tttobj["MeterNames"]; }

  arr.forEach(x => {
    var opt = document.createElement('option');

    opt.value = x;
    opt.innerHTML = x;
    s2.appendChild(opt);
  });

  let ev = document.getElementById('event1');
  ev.innerText = 'count: ' + s2.options.length;

}

function select2OnChange(evt) {

  sel = evt.currentTarget;
  let meter = sel.options[sel.selectedIndex];
  let labl = sel.labels[0]
  // labl.innerText = `Meters [` + sel.options.length + `]: `;


  let ev = document.getElementById('event1');
  // ev.innerText = "your choice: " + meter.innerText;
  ev.innerText = 'count: ' + sel.options.length;

}
//-------------------------------------------



// let init_once = [];
window.onload = () => {

  var theme = localStorage.getItem('dcutheme');
  var sel = document.getElementById('theme-select');
  if ((theme == null)) {

    var eee = document.getElementsByClassName('ukraine');
    var ggg = document.querySelector('.ukraine');

    sel.children.forEach(x => {
      if (x.innerText.includes("Ukraine")) {
        let ind = Array.from(sel.children).indexOf(x);
        if (ind >= 0)
          sel.selectedIndex = ind;
      }
    });
    var text = sel.children[sel.selectedIndex].innerText;
    localStorage.setItem('dcutheme', text);
  }
  else {
    for (i = 0; i < sel.childElementCount; i++) {
      if (sel.children[i].innerText == theme) {
        sel.selectedIndex = i;

      }

    }
  }

  themeOnChange();

  // this.init_once = [init_page1_buttonHandlers, null, null, null];
  set_page(currpage);
  init_table1();

  browser = new BrowserClient();
  events_init();

  //   set select for meters
  // set_select2();
}


// get current page id from localStorage
let currpage = localStorage.getItem('nodejs_page');
currpage = (currpage == null) ? 'pg0' : currpage;

//   and make current page visible
// let init_once = [init_page1_buttonHandlers, null, null, null];
function set_page(current) {

  function set_pagedisplay(butind) {
    let pages = document.getElementsByTagName('page');
    pages?.forEach(p => {
      p.style.display = p.id == ('pg' + butind) ? 'block' : 'none';
    });

    // if (init_once[butind] != null) {
    //   (init_once[butind])();
    //   init_once[butind] = null;
    // }

  }


  if (typeof (current) == 'string') {

    if (navi = document.querySelector('.navi')) {
      for (let i = 0; i < navi.childElementCount; i++) {
        navi.children[i].className = i == current.slice(2, 3) ? 'navpressed' : 'navbutton';
      }
    }
    let ind = current.slice(2, 3);
    set_pagedisplay(ind);
  }

  else {  //navi button pressed
    let butind = -1;
    let parent = current.parentNode;
    if (parent)
      parent.children.forEach(button => {
        if (button == current) {
          button.className = 'navpressed';
          butind = Array.from(parent.children).indexOf(button);
          localStorage.setItem('nodejs_page', `pg${butind}`);
        }
        else button.className = 'navbutton';
      });
    set_pagedisplay(butind);
  }

}


// initialise navigation buttons
if (navidiv = document.querySelector('.navi')) {
  Array.from(navidiv.children).forEach(element => {
    // element.addEventListener('mousedown', navhandler);
    element.addEventListener('mousedown', (evt) => set_page(evt.currentTarget));
  });

  let page = localStorage.getItem('nodejs_page');
  let but;
  if (!page || page == 'pg0') {
    but = navidiv.children[0];
    but.click();
    localStorage.setItem('nodejs_page', 'pg0');
  }
  else {
    arr = Array.from(navidiv.children);
    but = arr.filter(x => x.innerText == page);

  }
}

function themeOnChange() {
  // var sel2 = document.getElementById('theme-select');
  if (sel2 = document.getElementById('theme-select'))
    switch (sel2.selectedIndex) {
      case 0:
        setGlobalProp('--common-green', getGlobalProp('--ukraine-green'));
        setGlobalProp('--common-background', getGlobalProp('--ukraine-background'));
        break;
      case 1:
        setGlobalProp('--common-green', getGlobalProp('--default-green'));
        setGlobalProp('--common-background', getGlobalProp('--default-background'))
        break;
      case 2:
        setGlobalProp('--common-green', getGlobalProp('--light-green'));
        setGlobalProp('--common-background', getGlobalProp('--light-background'))
        break;

    }
  localStorage.setItem('dcutheme', sel2.children[sel2.selectedIndex].innerText);
}