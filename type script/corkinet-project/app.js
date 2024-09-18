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
const saveToLocalStorage = (scooters) => {
    localStorage.setItem('scooters', JSON.stringify(scooters));
};
const loadFromLocalStorage = () => {
    const storedScooters = localStorage.getItem('scooters');
    return storedScooters ? JSON.parse(storedScooters) : [];
};
function addScooter(scooter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(scooter),
            });
            if (!response.ok) {
                throw new Error("network error");
            }
            const newScooter = yield response.json();
            const storedScooters = loadFromLocalStorage();
            storedScooters.push(newScooter);
            saveToLocalStorage(storedScooters);
            return newScooter;
        }
        catch (error) {
            console.log(error);
            const storedScooters = loadFromLocalStorage();
            const newScooter = Object.assign(Object.assign({}, scooter), { id: Date.now().toString() });
            storedScooters.push(newScooter);
            saveToLocalStorage(storedScooters);
            return newScooter;
        }
    });
}
const deleteScooter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete scooter from the API");
        }
        const storedScooters = loadFromLocalStorage();
        const updatedScooters = storedScooters.filter(scooter => scooter.id !== id);
        saveToLocalStorage(updatedScooters);
        getAllScooter();
    }
    catch (error) {
        console.log(error);
        const storedScooters = loadFromLocalStorage();
        const updatedScooters = storedScooters.filter(scooter => scooter.id !== id);
        saveToLocalStorage(updatedScooters);
        renderScooters(updatedScooters);
    }
});
const getAllScooter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}`);
        if (!response.ok) {
            throw new Error("Failed to delete scooter from the API");
        }
        const scooters = yield response.json();
        saveToLocalStorage(scooters);
        renderScooters(scooters);
        return scooters;
    }
    catch (error) {
        console.log(error);
        const storedScooters = loadFromLocalStorage();
        renderScooters(storedScooters);
        return storedScooters;
    }
});
const editScooter = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResponse = yield fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!updateResponse.ok) {
            throw new Error("Failed to update scooter in the API");
        }
        const storedScooters = loadFromLocalStorage();
        const updatedScooters = storedScooters.map(scooter => scooter.id === id ? Object.assign(Object.assign({}, scooter), updatedData) : scooter);
        saveToLocalStorage(updatedScooters);
    }
    catch (error) {
        console.log(error);
        const storedScooters = loadFromLocalStorage();
        const updatedScooters = storedScooters.map(scooter => scooter.id === id ? Object.assign(Object.assign({}, scooter), updatedData) : scooter);
        saveToLocalStorage(updatedScooters);
    }
});
const getScooterById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error("Failed to delete scooter from the API");
        }
        const scooter = yield response.json();
        return scooter;
    }
    catch (error) {
        console.log(error);
        const storedScooters = loadFromLocalStorage();
        return storedScooters.find(scooter => scooter.id === id) || null;
    }
});
const createScooter = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newScooter = {
        serialNumber,
        model,
        batteryLevel,
        imageUrl,
        color,
        StatusAvaliable: status,
    };
    yield addScooter(newScooter);
    yield getAllScooter();
    document.querySelector("form").reset();
});
const renderScooters = (scooters) => {
    const scooterTable = document.getElementById("table-body");
    if (!scooterTable) {
        console.error("Table body element not found");
        return;
    }
    scooterTable.textContent = "";
    scooters.forEach((scooter, index) => {
        const row = document.createElement("tr");
        const serialNumberCell = document.createElement("td");
        serialNumberCell.textContent = scooter.serialNumber;
        row.appendChild(serialNumberCell);
        const modelCell = document.createElement("td");
        modelCell.textContent = scooter.model;
        row.appendChild(modelCell);
        const batteryLevelCell = document.createElement("td");
        batteryLevelCell.textContent = scooter.batteryLevel.toString();
        row.appendChild(batteryLevelCell);
        const imageUrlCell = document.createElement("td");
        const imageElement = document.createElement("img");
        imageElement.src = scooter.imageUrl;
        imageElement.alt = "Scooter image";
        imageElement.style.width = "100px";
        imageElement.style.height = "auto";
        imageUrlCell.appendChild(imageElement);
        row.appendChild(imageUrlCell);
        const colorCell = document.createElement("td");
        colorCell.textContent = scooter.color;
        row.appendChild(colorCell);
        const statusBatteryCell = document.createElement("td");
        statusBatteryCell.textContent = scooter.StatusAvaliable;
        row.appendChild(statusBatteryCell);
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("table-button");
        editButton.addEventListener("click", (event) => editForm(scooter, event));
        actionCell.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("table-button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            if (scooter.id) {
                deleteScooter(scooter.id);
            }
            else {
                console.error("Main page or edit page element not found");
            }
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        scooterTable.appendChild(row);
    });
};
let currentScooter = null;
const editForm = (scooter, event) => {
    event.preventDefault();
    currentScooter = scooter;
    turnPage();
    document.getElementById("edit-input").value = scooter.batteryLevel.toString();
};
saveEditButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (currentScooter && currentScooter.id) {
        const editInput = +document.getElementById("edit-input").value;
        const updateData = {
            batteryLevel: editInput,
        };
        yield editScooter(currentScooter.id, updateData);
        turnPage();
        getAllScooter();
    }
}));
const turnPage = () => {
    mainPage.classList.toggle("hidden");
    editPage.classList.toggle("visible");
};
const formSort = () => __awaiter(void 0, void 0, void 0, function* () {
    const scooterList = yield getAllScooter();
    const option = document.getElementById("select-sort").value;
    let sortedScooters = [];
    switch (option) {
        case "serialNumber":
            sortedScooters = scooterList.sort((a, b) => parseInt(a.serialNumber) - parseInt(b.serialNumber));
            break;
        case "batteryLevel":
            sortedScooters = scooterList.sort((a, b) => b.batteryLevel - a.batteryLevel);
            break;
        case "model":
            sortedScooters = scooterList.sort((a, b) => a.model.localeCompare(b.model));
            break;
        default:
            sortedScooters = scooterList;
    }
    renderScooters(sortedScooters);
});
(_a = document.getElementById("button-sort")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
    event.preventDefault();
    formSort();
});
const filterList = () => __awaiter(void 0, void 0, void 0, function* () {
    const scooterList = yield getAllScooter();
    const option = document.getElementById("select-filter").value;
    const filterInput = document.getElementById("filter-list");
    const filterText = filterInput.value.toLowerCase();
    let sortedScooters = [];
    switch (option) {
        case "serialNumber":
            sortedScooters = scooterList.filter((s) => s.serialNumber.includes(filterText));
            break;
        case "model":
            sortedScooters = scooterList.filter((s) => s.model.toLowerCase().includes(filterText));
            break;
        case "batteryLevel":
            sortedScooters = scooterList.filter((s) => s.batteryLevel.toString() === filterText);
            break;
        default:
            sortedScooters = scooterList;
    }
    renderScooters(sortedScooters);
    filterInput.value = "";
});
(_b = document.getElementById("filter-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => {
    event.preventDefault();
    filterList();
});
document.addEventListener("DOMContentLoaded", () => {
    getAllScooter();
});
submitCreate === null || submitCreate === void 0 ? void 0 : submitCreate.addEventListener("click", createScooter);
