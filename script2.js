var loggedInUsername = localStorage.getItem('username');
document.getElementById('userr').innerText = loggedInUsername;


todoMain();

function todoMain() {
const DEFAULT_OPTION = "Select Status";
  let inputElem,
    inputElem2,
    inputElem3,
    dateInput, 
    timeInput,
    addButton,
    sortButton,
    updateBtn,
    selectElemS,
    todoList = [];

  getElements();
  addListeners();
  load();
  renderRows();

  function getElements() {
    inputElem = document.getElementsByTagName("input")[0];
    inputElem2 = document.getElementsByTagName("input")[1];
    inputElem3 = document.getElementsByTagName("input")[2];
    dateInput = document.getElementById("dateInput");
    timeInput = document.getElementById("timeInput");
    addButton = document.getElementById("addBtn");
    sortButton = document.getElementById("sortBtn")
    selectElemS = document.getElementById("statusFilter");
  }

  function addListeners() {
    addButton.addEventListener("click", addEntry, false);
    selectElemS.addEventListener("change", filterEntriesS, false);
    sortButton.addEventListener("click", sortEntry, false);
  }

  function addEntry(event) {

    let inputValue = inputElem.value;
    inputElem.value = "";

    let inputValue2 = inputElem2.value;
    inputElem2.value = "";

    let inputValue3 = inputElem3.value;
    inputElem3.value = "";

    let dateValue = dateInput.value;
    dateInput.value = "";

    let timeValue = timeInput.value;
    timeInput.value = "";

    if (!inputValue || !dateValue || !timeValue) {
      alert("Please enter all required details.");
      return;
  }
    let obj = {
        id: _uuid(),
        todo: inputValue, 
        description: inputValue2,
        status: inputValue3,
        date: dateValue, 
        time: timeValue,
        done: false,
    }
    renderRows(obj);
    todoList.push(obj);
    save();  
    location.reload(); 
  }

  function filterEntriesS() {

    let selection = selectElemS.value;
    console.log('Selected Status:', selection);

    if (selection === DEFAULT_OPTION) {

      let rows = document.getElementsByTagName("tr");

      Array.from(rows).forEach((row, index) => {
        row.style.display = "";
      });

    } else {
      let rows = document.getElementsByTagName("tr");

      Array.from(rows).forEach((row, index) => {
        if (index === 0) {
          return;
        }

        let status = row.getElementsByTagName("td")[7].innerText;
        console.log('Row Status:', status);
        if (status === selectElemS.value) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }
  }

  function save(){
    let stringified = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringified);
  }
  function load() {
    let retrieved = localStorage.getItem("todoList");
    console.log("Retrieved data:", retrieved);
    todoList = JSON.parse(retrieved);
    if(todoList == null)
    todoList = [];
  }

  function renderRows() {
    if (Array.isArray(todoList) && todoList.length > 0) {
            todoList.forEach(todoObj => {
                rendowRows(todoObj);
            });
        }
  }

  function rendowRows({todo: inputValue, description: inputValue2, status: inputValue3, 
                        id, date, time, done}) {

    let table = document.getElementById("todoTable");

    let trElem = document.createElement("tr");
    trElem.dataset.id = id;
    table.appendChild(trElem);

    // checkbox cell
    let checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.addEventListener("click", checkboxClickCallback, false);
    checkboxElem.dataset.id = id;
    let tdElem1 = document.createElement("td");
    tdElem1.appendChild(checkboxElem);
    trElem.appendChild(tdElem1);

    //Current Date cell
    let CdateElem = document.createElement("td");
    let CdateObj = new Date();
    let Cdate = CdateObj.toLocaleDateString("en-IN");
    CdateElem.innerText = Cdate;
    trElem.appendChild(CdateElem);

    //DeadLine date cell
    let dateElem = document.createElement("td");
    let dateObj = new Date(date);
    let formattedDate = dateObj.toLocaleString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
    });
    dateElem.innerText = formattedDate;
    trElem.appendChild(dateElem);

    //DeadLine time cell
    let timeElem = document.createElement("td");
    timeElem.innerText = time;
    trElem.appendChild(timeElem);

    // to-do cell
    let tdElem2 = document.createElement("td");
    tdElem2.innerText = inputValue;
    trElem.appendChild(tdElem2);

    // description cell
    let tdElem3 = document.createElement("td");
    tdElem3.innerText = inputValue2;
    trElem.appendChild(tdElem3);

    // delete cell
    let tdElem4 = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", deleteItem, false);
    deleteBtn.dataset.id = id;
    tdElem4.appendChild(deleteBtn);

    trElem.appendChild(tdElem4);
    //status cell
    let tdElem5 = document.createElement("td");
    tdElem5.innerText = inputValue3;
    trElem.appendChild(tdElem5);

    //update cell
    let tdElem6 = document.createElement("td");
    let updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.className = "update-btn";
    updateBtn.addEventListener("click", function() {
     updateEntry(this, id, tdElem2, inputElem, inputElem2, inputElem3, dateInput, timeInput);
  }, false);
    updateBtn.dataset.id = id;
    tdElem6.appendChild(updateBtn);
    trElem.appendChild(tdElem6);

    checkboxElem.type = "checkbox";
    checkboxElem.checked = done;
    if(done){
        trElem.classList.add("strike");
    } else {
        trElem.classList.remove("strike");
    }

    function deleteItem() {
        trElem.remove();

        for(let i=0; i<todoList.length; i++) {
            if(todoList[i].id == this.dataset.id) {
                todoList.splice(i, 1);
            }
        }
        save();
      }
  
      function checkboxClickCallback() {
        trElem.classList.toggle("strike");
        for(let i=0; i<todoList.length; i++) {
            if(todoList[i].id == this.dataset.id) {
                todoList[i]["done"] = this.checked;
            }
        }
        save();
      }

    function updateEntry(updateBtn, id, tdElem2, inputElem, inputElem2, inputElem3, dateInput, timeInput) {
      let selectedRow = document.querySelector(`tr[data-id="${id}"]`);
      console.log(selectedRow);
      
      selectedRow.classList.toggle("selected");

      if (updateBtn.innerText.toLowerCase() === "update") {
          inputElem.value = tdElem2.innerText;
          inputElem2.value = tdElem3.innerText;
          inputElem3.value = tdElem5.innerText;
          dateInput.value = dateElem.innerText;
          timeInput.value = timeElem.innerText;

          updateBtn.innerText = "Save";
          updateBtn.removeAttribute("disabled");
          inputElem.removeAttribute("readonly");
          inputElem2.removeAttribute("readonly");
          inputElem3.removeAttribute("readonly");
          dateInput.removeAttribute("readonly");
          timeInput.removeAttribute("readonly");
  
          dateInput.focus();
      } else {
        tdElem2.innerText = inputElem.value;
        tdElem3.innerText = inputElem2.value;
        tdElem5.innerText = inputElem3.value;
        dateElem.innerText = dateInput.value;
        timeElem.innerText = timeInput.value;

        let index = todoList.findIndex(item => item.id === id);
      if (index !== -1) {
        todoList[index].todo = inputElem.value;
        todoList[index].description = inputElem2.value;
        todoList[index].status = inputElem3.value;
        todoList[index].date = dateInput.value;
        todoList[index].time = timeInput.value;
        todoList[index].done = false; 
      }
  
        updateBtn.innerText = "Update";
        updateBtn.setAttribute("readonly", "readonly");
        inputElem.setAttribute("readonly", "readonly");
        inputElem2.setAttribute("readonly", "readonly");
        inputElem3.setAttribute("readonly", "readonly");
        dateInput.setAttribute("readonly", "readonly");
        timeInput.setAttribute("readonly", "readonly");
  
        save(); 
    } 
  }  
  }
  
  function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  function sortEntry() {
    todoList.sort((a, b) => {
      let aDate = Date.parse(a.date);
      let bDate = Date.parse(b.date);
      return aDate - bDate;
    });

    save();

    let trElems = document.getElementsByTagName("tr");
    for(let i = trElems.length - 1; i > 0; i--){
      trElems[i].remove();
    }
    renderRows();
    location.reload();
  }
}
