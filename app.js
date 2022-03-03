
let loadButton=document.getElementById('loadBooks');
let tableTbody=document.querySelectorAll('table>tbody')[0];

  loadButton.addEventListener('click',function () {

      let promise=fetch(`https://books-cf072-default-rtdb.firebaseio.com/Books/.json`);
      promise
          .then(res=>res.json())
          .then(data=>{
              let arrays=Object.keys(data);

              console.log(arrays);

              tableTbody.innerHTML=arrays.map(x=>`<tr><td>${data[x].title}</td> <td>${data[x].author}</td> <td>${data[x].isbn}</td> 
           <td><button data-key=${x}>Edit</button>  <button data-key=${x}>Delete</button></td></tr>`).join('');

              let allButtons=document.querySelectorAll('button');
              let buttons=Array.from(allButtons);

              for(let index in buttons){

                  if(index%2!==0){

                      buttons[index].addEventListener('click',function () {
                          let id=buttons[index].getAttribute('data-key');

                         fetch(`https://books-cf072-default-rtdb.firebaseio.com/Books/${id}/.json`)
                             .then(res=>res.json())
                             .then(({title,author,isbn})=>{

                                 console.log(title);

                                 let editTitle=document.getElementById('edit-title');
                                 editTitle.value=title;
                                 let editAuthor=document.getElementById('edit-author');
                                 editAuthor.value=author;
                                 let editIsbn=document.getElementById('edit-isbn');
                                 editIsbn.value=isbn;

                                 let buttonEdit=document.getElementById('submit');
                                 buttonEdit.setAttribute('data-key',id);

                                 buttonEdit.addEventListener('click',function (e) {
                                   e.preventDefault()
                                     let editForm=document.querySelectorAll('#create-form')[1];
                                     editForm.style.display='none';
                                     console.log(editForm);



                                     let object={method:'PATCH',
                                         headers:{'Content-type':'application/json'},
                                         body:JSON.stringify({title:editTitle.value,author:editAuthor.value,isbn:editIsbn.value})};

                                     fetch(`https://books-cf072-default-rtdb.firebaseio.com/Books/${id}/.json`,object)
                                         .then(res=>res.json())
                                         .then()

                                 });

                          })


                          let body=document.body;
                          let form=document.createElement('form');
                          form.setAttribute('id','create-form')
                        let h3=document.createElement('h3');
                          h3.textContent=' Edit FORM';

                          let labelTitle=document.createElement('label');
                          labelTitle.textContent='TITLE';
                          let inputTitle=document.createElement('input');
                          inputTitle.setAttribute('type','title')
                          inputTitle.setAttribute('id','edit-title');
                          inputTitle.setAttribute('placeholder','Title...');

                          let labelAuthor=document.createElement('label');
                          labelAuthor.textContent='AUTHOR'
                          let inputAuthor=document.createElement('input');
                          inputAuthor.setAttribute('type','title')
                          inputAuthor.setAttribute('id','edit-author');
                          inputAuthor.setAttribute('placeholder','Author...');

                          let labelIsbn=document.createElement('label');
                          labelIsbn.textContent='ISBN';
                          let inputIsbn=document.createElement('input');
                          inputIsbn.setAttribute('type','title')
                          inputIsbn.setAttribute('id','edit-isbn');
                          inputIsbn.setAttribute('placeholder','Isbn...');

                          let buttonSubmit=document.createElement('button');
                          buttonSubmit.setAttribute('id','submit');
                          buttonSubmit.textContent='Edit';

                          form.appendChild(h3);
                          form.appendChild(labelTitle);
                          form.appendChild(inputTitle);
                          form.appendChild(labelAuthor);
                          form.appendChild(inputAuthor);
                         form.appendChild(labelIsbn);
                         form.appendChild(inputIsbn);
                         form.appendChild(buttonSubmit);
                         body.appendChild(form);

                      })

                  }else if(index%2===0){
                      buttons[index].addEventListener('click',function (e) {
                          let id=buttons[index].getAttribute('data-key');

                          let object={
                              method:'DELETE',
                          }

                          fetch(`https://books-cf072-default-rtdb.firebaseio.com/Books/${id}/.json`,object)
                              .then(res=>res.json())

                      });

                  }
              }

          });

  });


  let buttonSubmit=document.querySelectorAll('button')[5];
console.log(buttonSubmit);


 buttonSubmit.addEventListener('click',function (e) {

      e.preventDefault();

     let createTitle=document.getElementById('create-title');
     let createAuthor=document.getElementById('create-author');
     let createIsbn=document.getElementById('create-isbn');

     fetch(`https://books-cf072-default-rtdb.firebaseio.com/Books/.json`,{method:'POST',headers:{'Content-type':'application/json'},
         body:JSON.stringify({title:createTitle.value,author:createAuthor.value,isbn:createIsbn.value})})
      .then(res=>res.json())
         .then(data=>{

         });

      let tBody=document.querySelectorAll('table>tbody')[0];
     console.log(tBody);

      let tr=document.createElement('tr');
      let tdTitle=document.createElement('td');
      let tdAuthor=document.createElement('td');
      let tdIsbn=document.createElement('td');
     let buttonEdit=document.createElement('button');
      buttonEdit.textContent='Edit';
     let buttonDelete=document.createElement('button');
     buttonDelete.textContent='Delete';

      tdTitle.textContent=createTitle.value;
      tdAuthor.textContent=createAuthor.value;
      tdIsbn.textContent=createIsbn.value;

      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdIsbn);
      tr.appendChild(buttonEdit);
      tr.appendChild(buttonDelete);

      tBody.appendChild(tr);

 });






