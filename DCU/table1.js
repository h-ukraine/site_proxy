var tabl = null;

function init_table1() {

  let htmlcontainer_id = 'table1';

  tabl = new jsTable("my-first-table", 18, 10, htmlcontainer_id);


  // +++++++ Comment next string for normal work !!!
  // setTimeout(() => Show_Methods_Example(), 3000);
  // ------------------------------------------------
  // tabl.clear();
  tabl.show();

}




function SetPage1Title(text) {
  let sav = '';
  if (div = document.getElementById('pg1')) {
    sav = div.firstElementChild.innerText;
    div.firstElementChild.innerText = text;
  }
  return sav;
}


function Show_Methods_Example() {
  // Show some Methods:

  // temporary change Title of page1 if need...
  // let savedTitle = SetPage1Title("Show some table features ...");
  let savedTitle = SetPage1Title("To remove playing of this example  please comment line 11 in table1.js ");

  // set columns  amount
  setTimeout(() => tabl.setcolumns(13), 3000);

  //set row amount
  setTimeout(() => tabl.setrows(14), 4500);

  // whole row container background :  USE CAREFULLY or use tabl.RowColors instead !!!
  tabl.row(1).style.background = 'red';
  //

  // set whole row #3 background, don't change foreground color
  tabl.RowColors(3, null, 'yellow');

  // whole row #4 foreground color
  tabl.RowColors(4, 'magenta');


  // set column foreground  color
  tabl.ColumnColors(1, 'rgb(100,255,20');

  // set  whole column background color  (foreground  = null - means not changes)
  tabl.ColumnColors(1, null, 'grey');



  // Old method of setting Cell text  - do not use it
  {
    tabl.cell(0, 0).innerText = "Left";
    tabl.cell(0, tabl.colCount - 1).innerText = "Right";
    tabl.cell(2, 2).innerText = "Cell 2.2";
  }

  // Same as above but modern method - Set Text for one Cell(row,column, text)
  {
    tabl.Text(0, 0, "Left");
    tabl.Text(0, tabl.colCount - 1, "Right");
    tabl.Text(2, 2, "Cell 2.2");
  }

  //  Read text from  Cell
  let rvalue = tabl.Text(0, 0);


  // New  method of complete settings of one Cell:
  /*   Text(row, column, text, color = null, background = null)
          note:  null - optional,   means "not change"
  */
  tabl.Text(7, 0, "Helper1", 'white', 'blue');
  tabl.Text(8, 1, "Helper2", 'white',);
  tabl.Text(9, 2, "Helper3");
  tabl.Text(10, 3, "Helper3", null, 'navy');



  // tabl.RowBackground(7, 'blue');
  tabl.RowColors(7, null, 'blue');


  // erase whole table - 
  setTimeout(() => tabl.clear(), 8000);

  // making erased cells visible setting their Text = '.'
  setTimeout(() => {
    tabl.show();
    SetPage1Title(savedTitle);
  }, 10000);




}




