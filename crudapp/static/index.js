window.onload = initall;

var saveBookButton;
var showBookButton;
function initall(){
    saveBookButton = document.getElementById('save_book')
    saveBookButton.onclick = saveBook;

    showBookButton = document.getElementById('nav-profile-tab')
    showBookButton.onclick = showBook;
}

function saveBook(){
    var name = document.getElementById('book_name').value;
    var page = document.getElementById('book_pages').value;
    var price = document.getElementById('book_price').value;
    var msg = document.getElementById('msg');

    // alert(name);
    // alert(price);
    // alert(page);
    var url = '/addBook?name='+name+'&price='+price+'&pages='+page;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState ==4 && this.status ==200){
            if (req.responseText =='true'){
                document.getElementById('book_name').value='';
                document.getElementById('book_pages').value='';
                document.getElementById('book_price').value='';
                document.getElementById('msg').className = 'alert alert-success d-block';
                // alert('add book successfully....')
            }
        }
    };
    req.open('GET',url,true);
    req.send();
}

function showBook(){
    var url = '/showBook';
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (this.readyState ==4 && this.status ==200){
            var data =eval(req.responseText); //eval convert data into object
            // alert(data[0].name);
            var div = document.getElementById('nav-profile');
            div.innerHTML = '';//it is for clear all 

            var table = document.createElement('TABLE');
            
            //for create header of table 
            var row = table.insertRow(0);

            var name = row.insertCell(0);
            var price = row.insertCell(1);
            var page = row.insertCell(2);
            var deletebutton = row.insertCell(3);

            name.innerHTML = 'Book Name';
            price.innerHTML = 'Price';
            page.innerHTML = 'Pages';
            deletebutton.innerHTML = 'Delete Action'; 

             // crate button
            //  var b = document.createElement('BUTTON');
            //  var text  = document.createTextNode('Button');
            //  b.appendChild(text);

            // for add row in table
            for(var i=1;i<data.length;i++){
                var row = table.insertRow(i);
                // for insert cell in row of table
                var name = row.insertCell(0);
                var price = row.insertCell(1);
                var page = row.insertCell(2);
                var deletedata = row.insertCell(3);

               
                // insert value in cell of row
                name.innerHTML = data[i].name;
                price.innerHTML = data[i].price;
                page.innerHTML = data[i].pages;
                deletedata.innerHTML= '&times;'
                deletedata.className= 'text-danger ';
                deletedata.id = data[i].id;

                deletedata.style.fontSize = '25px';
                deletedata.style.cursor = 'pointer';
                // deletedata.className = 'deleteBook';

                deletedata.onclick = function(){
                    // alert(this.id);
                    var obj = this;
                    var id = this.id;
                    var url = '/deleteBook?id='+id;
                    var req = new XMLHttpRequest();
                    req.onreadystatechange = function(){
                        if (this.readyState ==4 && this.status ==200){
                            if (req.responseText == 'true'){
                                table.deleteRow(obj.parentNode.rowIndex);
                            }
                        }
                    };
                    req.open('GET',url,true);
                    req.send();

                }
            }
            
            table.className = 'table table-striped table-hover ';
            div.appendChild(table);

        }
    };
    req.open('GET',url,true);
    req.send();
}