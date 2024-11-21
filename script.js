const addBtn = document.querySelector("#addExpenseButton");
const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const tbody = document.querySelector("tbody");
const totalAmount = document.querySelector(".total-amount");

const obj = {
  id: "",
  names: "",
  price: 0,
};

let todos = [];

const setLocalStorage = (item) => {
  localStorage.setItem("data", JSON.stringify(item));
};

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("data")) || [];
  getShow();
});

addBtn.addEventListener("click", (e) => {
  let names = expenseName.value;
  let price = expenseAmount.value;
  todos.push({
    ...obj,
    id: todos?.length + 1,
    names,
    price,
  });
  localStorage.setItem("data", JSON.stringify(todos));
  getShow();

  expenseName.value = "";
  expenseAmount.value = "";
});

const getShow = () => {
  totalAmountFunc();
  tbody.innerHTML = "";
  let getLocal = JSON.parse(localStorage.getItem("data"));
  getLocal.forEach((todo) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdBtns = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = "Duzelt";
    editBtn.dataset.id = todo.id;
    editBtn.style.marginRight = "10px";
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Sil";
    deleteBtn.dataset.id = todo.id;
    tdName.textContent = todo.names;
    tdPrice.textContent = todo.price;
    tdBtns.append(editBtn, deleteBtn);
    tr.append(tdName, tdPrice, tdBtns);
    tbody.append(tr);
  });
  deleteTodo();
  editTodo();
};

const deleteTodo = () => {
  const btns = document.querySelectorAll(".delete");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      todos = todos.filter((item) => item.id != id);
      setLocalStorage(todos);
      getShow();
    });
  });
};

const editTodo = () => {
  const btns = document.querySelectorAll(".edit");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      let editTodo = todos.find((item) => item.id == id);
      setLocalStorage(todos);
      getShow();
    });
  });
};

const totalAmountFunc = () => {
  let amount = 0;
  let getLocal = JSON.parse(localStorage.getItem("data"));
  getLocal.forEach((item) => {
    amount += +item.price;
  });
  totalAmount.textContent = `Ümumi Məbləğ: ${amount}`;
};
