"use strict";
const saveLocalStorage = (key, todos) => {
    window.localStorage.setItem(key, JSON.stringify(todos));
};
const getStorage = (key) => {
    const todos = window.localStorage.getItem(key);
    if (todos != null) {
        return JSON.parse(todos);
    }
};
let elForm = document.querySelector(".form");
let elList = document.querySelector(".form__list");
let elInput = document.querySelector(".form__input");
let elmodalWrapper = document.querySelector(".wrapper__modal");
let elModal = document.querySelector(".modal");
let elAll = document.querySelector(".all");
let elCompleted = document.querySelector(".Complete");
let elUncompleted = document.querySelector(".unComplete");
let elAllcount = document.querySelector(".all-count");
let elCompletecount = document.querySelector(".complete-count");
let elUncompletecount = document.querySelector(".uncomplete-count");
const todoList = getStorage("todo") || [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (elInput && elInput instanceof HTMLInputElement) {
        const data = {
            id: todoList.length + 1,
            //    id:todoList.length ? Number(todoList[todoList.length - 1].id + 1) : 1,
            value: elInput.value,
            isCompleted: false
        };
        todoList.push(data);
    }
    renderTodo(todoList);
    const target = e.target;
    if (target) {
        target.reset();
    }
    ;
    saveLocalStorage("todo", todoList);
});
function renderTodo(arr) {
    if (elList) {
        elList.innerHTML = "";
    }
    arr.map((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = "p-2 bg-slate-200 rounded-md flex items-center justify-between";
        elItem.innerHTML = `
       <span class="${item.isCompleted ? "complete" : "noComplete"}">${index + 1}. ${item.value}</span>
       <div class="flex items-center gap-[5px]">
       <label>
       <input class="item__input visually-hidden" type="checkbox">  
       <span class="${item.isCompleted ? "check-open" : "item-line"}" id="${item.id}"></span>
       </label> 
            <button onclick="updateClick(${item.id})" class="p-2 flex items-center justify-center w-[40px] bg-blue-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                </svg>
            </button>
            <button onclick="deleteClick(${item.id})" class="p-2 flex items-center justify-center w-[40px] bg-red-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
       </div>
     `;
        elList === null || elList === void 0 ? void 0 : elList.appendChild(elItem);
    });
    if (elAllcount) {
        elAllcount.textContent = todoList.length.toString();
    }
    if (elCompletecount) {
        elCompletecount.textContent = todoList.filter(item => item.isCompleted === true).length.toString();
    }
    if (elUncompletecount) {
        elUncompletecount.textContent = todoList.filter(item => item.isCompleted === false).length.toString();
    }
}
renderTodo(todoList);
if (elAll) {
    elAll.addEventListener("click", function () {
        renderTodo(todoList);
    });
}
if (elCompleted) {
    elCompleted.addEventListener("click", function () {
        renderTodo(todoList.filter(item => item.isCompleted == true));
    });
}
if (elUncompleted) {
    elUncompleted.addEventListener("click", function () {
        renderTodo(todoList.filter(item => item.isCompleted == false));
    });
}
// ---------------Checkbox start-------------------------
if (elList) {
    elList.addEventListener("click", function (evt) {
        const target = evt.target;
        if (target && target.matches(".item-line")) {
            const data = todoList.find(item => item.id === Number(target.id));
            if (data) {
                data.isCompleted = !data.isCompleted;
                renderTodo(todoList);
                window.localStorage.setItem("todo", JSON.stringify(todoList));
            }
        }
    });
}
// ------------------Checkbox end-------------------------
// ---------Delete start--------------------------
function deleteClick(id) {
    if (elmodalWrapper && elModal) {
        elmodalWrapper.classList.add("open-modal");
        elModal.innerHTML = `
        <div class="delete-card">
            <h2>Are you sure you want to delete it?</h2>
            <div>
                <button onclick="cancelClick()">Cancel</button>
                <button onclick="deleteBtnClick(${id})">Delete</button>
            </div>
        </div>
        `;
    }
}
function cancelClick() {
    if (elmodalWrapper) {
        elmodalWrapper.classList.remove("open-modal");
    }
}
function deleteBtnClick(id) {
    const index = todoList.findIndex(item => item.id === id);
    if (index !== -1) {
        todoList.splice(index, 1);
        saveLocalStorage("todo", todoList);
        renderTodo(todoList);
        if (elmodalWrapper) {
            elmodalWrapper.classList.remove("open-modal");
        }
    }
}
// ---------Delete end----------------
//------------------------------ Update Start-------------------
function updateClick(id) {
    if (elmodalWrapper && elModal) {
        elmodalWrapper.classList.add("open-modal");
        const data = todoList.find(item => item.id === id);
        if (data) {
            elModal.innerHTML = `
            <div class="modal-card flex flex-col">
           
            <strong class="modal-bold text-[30px] text-center mb-[10px]">Update your todo</strong>
            <input required value="${data.value}" class="modal-input p-2 rounded-md mb-2 " type="text" placeholder="Enter new todo">
             <div class="flex items-center mt-2 gap-1 justify-end">
             <button onclick="modalexit(${id})" class="modal-exit bg-red-500 p-2 w-[200px] rounded-md text-[20px] font-bold text-white">Cancel</button>
             <button type="submit"  onclick="updateBtnClick(${id})" class="modal-update bg-blue-500 p-2 w-[200px] rounded-md text-[20px] font-bold text-white">Update</button>
             </div>
            </div>
            `;
        }
    }
}
function updateBtnClick(id) {
    let elIpnutvalue = document.querySelector(".modal-input");
    if (elIpnutvalue !== null) {
        const data = todoList.find(item => item.id === id);
        if (data && elmodalWrapper) {
            data.value = elIpnutvalue.value;
            elmodalWrapper.classList.remove("open-modal");
            renderTodo(todoList);
        }
        window.localStorage.setItem("todo", JSON.stringify(todoList));
    }
}
//-------------------Update end-----------------
// -------------Modal remove --------------
if (elmodalWrapper) {
    elmodalWrapper.addEventListener("click", function (evt) {
        if (evt.target.id === "wrapper__modal") {
            if (elmodalWrapper) {
                elmodalWrapper.classList.remove("open-modal");
            }
        }
    });
}
function modalexit() {
    if (elmodalWrapper) {
        elmodalWrapper.classList.remove("open-modal");
    }
}
// ----------------------Modal end -----------------------
