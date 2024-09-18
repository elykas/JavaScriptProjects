"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const baseUrl = "https://66e9434487e417609448b25b.mockapi.io/api/v1/scotters";
const submitCreate = document.getElementById("submit-input");
const mainPage = document.getElementById("main-page");
const editPage = document.getElementById("edit-page");
const saveEditButton = document.getElementById("submit-edit");
const backButton = document.getElementById("back-button");
var Status;
(function (Status) {
    Status["avaliable"] = "avaliable";
    Status["inRepair"] = "inRepair";
    Status["unavailable"] = "unavailable";
})(Status || (Status = {}));
const saveToLocalStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
};
const loadFromLocalStorage = () => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
};
function addItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error("network error");
            }
            const newItem = yield response.json();
            const storedItems = loadFromLocalStorage();
            storedItems.push(newItem);
            saveToLocalStorage(storedItems);
            return newItem;
        }
        catch (error) {
            console.log(error);
            const storedItems = loadFromLocalStorage();
            const newItem = Object.assign(Object.assign({}, item), { id: Date.now().toString() });
            storedItems.push(newItem);
            saveToLocalStorage(storedItems);
            return newItem;
        }
    });
}
const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete item from the API");
        }
        const storedItems = loadFromLocalStorage();
        const updatedItems = storedItems.filter(item => item.id !== id);
        saveToLocalStorage(updatedItems);
        getAllItems();
    }
    catch (error) {
        console.log(error);
        const storedItems = loadFromLocalStorage();
        const updatedItems = storedItems.filter(item => item.id !== id);
        saveToLocalStorage(updatedItems);
        renderItems(updatedItems);
    }
});
const getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}`);
        if (!response.ok) {
            throw new Error("Failed to fetch items from the API");
        }
        const items = yield response.json();
        saveToLocalStorage(items);
        renderItems(items);
        return items;
    }
    catch (error) {
        console.log(error);
        const storedItems = loadFromLocalStorage();
        renderItems(storedItems);
        return storedItems;
    }
});
const editItem = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResponse = yield fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!updateResponse.ok) {
            throw new Error("Failed to update item in the API");
        }
        const storedItems = loadFromLocalStorage();
        const updatedItems = storedItems.map(item => item.id === id ? Object.assign(Object.assign({}, item), updatedData) : item);
        saveToLocalStorage(updatedItems);
    }
    catch (error) {
        console.log(error);
        const storedItems = loadFromLocalStorage();
        const updatedItems = storedItems.map(item => item.id === id ? Object.assign(Object.assign({}, item), updatedData) : item);
        saveToLocalStorage(updatedItems);
    }
});
const getItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch item from the API");
        }
        const item = yield response.json();
        return item;
    }
    catch (error) {
        console.log(error);
        const storedItems = loadFromLocalStorage();
        return storedItems.find(item => item.id === id) || null;
    }
});
const createItem = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const serialNumber = document.getElementById("scooter-serialNumber").value;
    const model = document.getElementById("model-input")
        .value;
    const batteryLevel = +document.getElementById("battery-input").value;
    const imageUrl = document.getElementById("image-input")
        .value;
    const color = document.getElementById("color-input")
        .value;
    const status = document.getElementById("select-input")
        .value;
    const newItem = {
        serialNumber,
        model,
        batteryLevel,
        imageUrl,
        color,
        StatusAvaliable: status,
    };
    yield addItem(newItem);
    yield getAllItems();
    document.querySelector("form").reset();
});
const renderItems = (items) => {
    const itemTable = document.getElementById("table-body");
    if (!itemTable) {
        console.error("Table body element not found");
        return;
    }
    itemTable.textContent = "";
    items.forEach((item, index) => {
        const row = document.createElement("tr");
        const serialNumberCell = document.createElement("td");
        serialNumberCell.textContent = item.serialNumber;
        row.appendChild(serialNumberCell);
        const modelCell = document.createElement("td");
        modelCell.textContent = item.model;
        row.appendChild(modelCell);
        const batteryLevelCell = document.createElement("td");
        batteryLevelCell.textContent = item.batteryLevel.toString();
        row.appendChild(batteryLevelCell);
        const imageUrlCell = document.createElement("td");
        const imageElement = document.createElement("img");
        imageElement.src = item.imageUrl;
        imageElement.alt = "Item image";
        imageElement.style.width = "100px";
        imageElement.style.height = "auto";
        imageUrlCell.appendChild(imageElement);
        row.appendChild(imageUrlCell);
        const colorCell = document.createElement("td");
        colorCell.textContent = item.color;
        row.appendChild(colorCell);
        const statusBatteryCell = document.createElement("td");
        statusBatteryCell.textContent = item.StatusAvaliable;
        row.appendChild(statusBatteryCell);
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("table-button");
        editButton.addEventListener("click", (event) => editForm(item, event));
        actionCell.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("table-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            if (item.id) {
                deleteItem(item.id);
            }
            else {
                console.error("Main page or edit page element not found");
            }
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        itemTable.appendChild(row);
    });
};
let currentItem = null;
const editForm = (item, event) => {
    event.preventDefault();
    currentItem = item;
    turnPage();
    document.getElementById("edit-input").value = item.batteryLevel.toString();
};
saveEditButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (currentItem && currentItem.id) {
        const editInput = +document.getElementById("edit-input").value;
        const updateData = {
            batteryLevel: editInput,
        };
        yield editItem(currentItem.id, updateData);
        turnPage();
        getAllItems();
    }
}));
const turnPage = () => {
    mainPage.classList.toggle("hidden");
    editPage.classList.toggle("visible");
};
const formSort = () => __awaiter(void 0, void 0, void 0, function* () {
    const itemList = yield getAllItems();
    const option = document.getElementById("select-sort").value;
    let sortedItems = [];
    switch (option) {
        case "serialNumber":
            sortedItems = itemList.sort((a, b) => parseInt(a.serialNumber) - parseInt(b.serialNumber));
            break;
        case "batteryLevel":
            sortedItems = itemList.sort((a, b) => b.batteryLevel - a.batteryLevel);
            break;
        case "model":
            sortedItems = itemList.sort((a, b) => a.model.localeCompare(b.model));
            break;
        default:
            sortedItems = itemList;
    }
    renderItems(sortedItems);
});
(_a = document.getElementById("button-sort")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
    event.preventDefault();
    formSort();
});
const filterList = () => __awaiter(void 0, void 0, void 0, function* () {
    const itemList = yield getAllItems();
    const option = document.getElementById("select-filter").value;
    const filterInput = document.getElementById("filter-list");
    const filterText = filterInput.value.toLowerCase();
    let filteredItems = [];
    switch (option) {
        case "serialNumber":
            filteredItems = itemList.filter((s) => s.serialNumber.includes(filterText));
            break;
        case "model":
            filteredItems = itemList.filter((s) => s.model.toLowerCase().includes(filterText));
            break;
        case "batteryLevel":
            filteredItems = itemList.filter((s) => s.batteryLevel.toString() === filterText);
            break;
        default:
            filteredItems = itemList;
    }
    renderItems(filteredItems);
    filterInput.value = "";
});
(_b = document.getElementById("filter-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => {
    event.preventDefault();
    filterList();
});
document.addEventListener("DOMContentLoaded", () => {
    getAllItems();
});
submitCreate === null || submitCreate === void 0 ? void 0 : submitCreate.addEventListener("click", createItem);
