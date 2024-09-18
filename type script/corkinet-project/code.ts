
// const baseUrl: string = "https://66e9434487e417609448b25b.mockapi.io/api/v1/scotters";
// const submitCreate: HTMLFormElement = document.getElementById("submit-input") as HTMLFormElement;
// const mainPage: HTMLDivElement = document.getElementById("main-page") as HTMLDivElement;
// const editPage: HTMLDivElement = document.getElementById("edit-page") as HTMLDivElement;
// const saveEditButton: HTMLFormElement = document.getElementById("submit-edit") as HTMLFormElement;
// const backButton: HTMLFormElement = document.getElementById("back-button") as HTMLFormElement;

// enum Status {
//   avaliable = "avaliable",
//   inRepair = "inRepair",
//   unavailable = "unavailable",
// }

// interface Scooter {
//   id?: string;
//   serialNumber: string;
//   model: string;
//   batteryLevel: number;
//   imageUrl: string;
//   color: string;
//   StatusAvaliable: Status;
// }

// const saveToLocalStorage = (items: Scooter[]): void => {
//   localStorage.setItem('items', JSON.stringify(items));
// };

// const loadFromLocalStorage = (): Scooter[] => {
//   const storedItems = localStorage.getItem('items');
//   return storedItems ? JSON.parse(storedItems) : [];
// };

// async function addItem(item: Scooter): Promise<Scooter | undefined> {
//   try {
//     const response: Response = await fetch(baseUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(item),
//     });
//     if (!response.ok) {
//       throw new Error("network error");
//     }
//     const newItem: Scooter = await response.json();

//     const storedItems = loadFromLocalStorage();
//     storedItems.push(newItem);
//     saveToLocalStorage(storedItems);

//     return newItem;
//   } catch (error) {
//     console.log(error);
//     const storedItems = loadFromLocalStorage();
//     const newItem = { ...item, id: Date.now().toString() };
//     storedItems.push(newItem);
//     saveToLocalStorage(storedItems);
//     return newItem;
//   }
// }

// const deleteItem = async (id: string) => {
//   try {
//     const response: Response = await fetch(`${baseUrl}/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       throw new Error("Failed to delete item from the API");
//     }
//     const storedItems = loadFromLocalStorage();
//     const updatedItems = storedItems.filter(item => item.id !== id);
//     saveToLocalStorage(updatedItems);

//     getAllItems();
//   } catch (error) {
//     console.log(error);

//     const storedItems = loadFromLocalStorage();
//     const updatedItems = storedItems.filter(item => item.id !== id);
//     saveToLocalStorage(updatedItems);
//     renderItems(updatedItems);
//   }
// };

// const getAllItems = async () => {
//   try {
//     const response: Response = await fetch(`${baseUrl}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch items from the API");
//     }
//     const items: Scooter[] = await response.json();
    
//     saveToLocalStorage(items);
//     renderItems(items);
//     return items;
//   } catch (error) {
//     console.log(error);
//     const storedItems = loadFromLocalStorage();
//     renderItems(storedItems);
//     return storedItems;
//   }
// };

// const editItem = async (
//   id: string,
//   updatedData: Partial<Scooter>
// ): Promise<void> => {
//   try {
//     const updateResponse = await fetch(`${baseUrl}/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     });
//     if (!updateResponse.ok) {
//       throw new Error("Failed to update item in the API");
//     }

//     const storedItems = loadFromLocalStorage();
//     const updatedItems = storedItems.map(item =>
//       item.id === id ? { ...item, ...updatedData } : item
//     );
//     saveToLocalStorage(updatedItems);
//   } catch (error) {
//     console.log(error);
//     const storedItems = loadFromLocalStorage();
//     const updatedItems = storedItems.map(item =>
//       item.id === id ? { ...item, ...updatedData } : item
//     );
//     saveToLocalStorage(updatedItems);
//   }
// };

// const getItemById = async (id: string): Promise<Scooter | null> => {
//   try {
//     const response = await fetch(`${baseUrl}/${id}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch item from the API");
//     }
//     const item: Scooter = await response.json();
//     return item;
//   } catch (error) {
//     console.log(error);
//     const storedItems = loadFromLocalStorage();
//     return storedItems.find(item => item.id === id) || null;
//   }
// };

// const createItem = async (event: Event) => {
//   event.preventDefault();

//   const serialNumber: string = (
//     document.getElementById("scooter-serialNumber") as HTMLInputElement
//   ).value;
//   const model: string = (document.getElementById("model-input") as HTMLInputElement)
//     .value;
//   const batteryLevel: number = +(
//     document.getElementById("battery-input") as HTMLInputElement
//   ).value;
//   const imageUrl: string = (document.getElementById("image-input") as HTMLInputElement)
//     .value;
//   const color: string = (document.getElementById("color-input") as HTMLInputElement)
//     .value;
//   const status: Status = (document.getElementById("select-input") as HTMLSelectElement)
//     .value as Status;

//   const newItem: Scooter = {
//     serialNumber,
//     model,
//     batteryLevel,
//     imageUrl,
//     color,
//     StatusAvaliable: status,
//   };

//   await addItem(newItem);
//   await getAllItems();

//   (document.querySelector("form") as HTMLFormElement).reset();
// };

// const renderItems = (items: Scooter[]) => {
//   const itemTable = document.getElementById("table-body");

//   if (!itemTable) {
//     console.error("Table body element not found");
//     return;
//   }

//   itemTable.textContent = "";

//   items.forEach((item, index) => {
//     const row = document.createElement("tr");

//     const serialNumberCell = document.createElement("td");
//     serialNumberCell.textContent = item.serialNumber;
//     row.appendChild(serialNumberCell);

//     const modelCell = document.createElement("td");
//     modelCell.textContent = item.model;
//     row.appendChild(modelCell);

//     const batteryLevelCell = document.createElement("td");
//     batteryLevelCell.textContent = item.batteryLevel.toString();
//     row.appendChild(batteryLevelCell);

//     const imageUrlCell = document.createElement("td");
//     const imageElement = document.createElement("img");
//     imageElement.src = item.imageUrl;
//     imageElement.alt = "Item image";
//     imageElement.style.width = "100px";
//     imageElement.style.height = "auto";

//     imageUrlCell.appendChild(imageElement);
//     row.appendChild(imageUrlCell);

//     const colorCell = document.createElement("td");
//     colorCell.textContent = item.color;
//     row.appendChild(colorCell);

//     const statusBatteryCell = document.createElement("td");
//     statusBatteryCell.textContent = item.StatusAvaliable;
//     row.appendChild(statusBatteryCell);

//     const actionCell = document.createElement("td");

//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.classList.add("table-button");
//     editButton.addEventListener("click", (event) => editForm(item, event));
//     actionCell.appendChild(editButton);

//     const deleteButton = document.createElement("button");
//     deleteButton.classList.add("table-button");
//     deleteButton.textContent = "Delete";
//     deleteButton.addEventListener("click", () => {
//       if (item.id) {
//         deleteItem(item.id);
//       } else {
//         console.error("Main page or edit page element not found");
//       }
//     });
//     actionCell.appendChild(deleteButton);

//     row.appendChild(actionCell);
//     itemTable.appendChild(row);
//   });
// };

// let currentItem: Scooter | null = null;

// const editForm = (item: Scooter, event: Event) => {
//   event.preventDefault();
//   currentItem = item;
//   turnPage();

//   (document.getElementById("edit-input") as HTMLInputElement).value = item.batteryLevel.toString();
// };

// saveEditButton.addEventListener("click", async () => {
//   if (currentItem && currentItem.id) {
//     const editInput = +(document.getElementById("edit-input") as HTMLInputElement).value;

//     const updateData: Partial<Scooter> = {
//       batteryLevel: editInput,
//     };

//     await editItem(currentItem.id, updateData);
//     turnPage();
//     getAllItems();
//   }
// });

// const turnPage = () => {
//   mainPage.classList.toggle("hidden");
//   editPage.classList.toggle("visible");
// };

// const formSort = async () => {
//   const itemList: Scooter[] = await getAllItems();
//   const option: string = (document.getElementById("select-sort") as HTMLSelectElement).value;

//   let sortedItems = [];

//   switch (option) {
//     case "serialNumber":
//       sortedItems = itemList.sort((a: Scooter, b: Scooter) =>
//         parseInt(a.serialNumber) - parseInt(b.serialNumber)
//       );
//       break;
//     case "batteryLevel":
//       sortedItems = itemList.sort((a: Scooter, b: Scooter) => b.batteryLevel - a.batteryLevel);
//       break;
//     case "model":
//       sortedItems = itemList.sort((a: Scooter, b: Scooter) => a.model.localeCompare(b.model));
//       break;
//     default:
//       sortedItems = itemList;
//   }
//   renderItems(sortedItems)
// }

// document.getElementById("button-sort")?.addEventListener("click", (event) => {
//   event.preventDefault();
//   formSort();
// });

// const filterList = async () => {
//   const itemList: Scooter[] = await getAllItems();
//   const option: string = (document.getElementById("select-filter") as HTMLSelectElement).value;
//   const filterInput = document.getElementById("filter-list") as HTMLInputElement;
//   const filterText: string = filterInput.value.toLowerCase();

//   let filteredItems: Scooter[] = [];

//   switch (option) {
//     case "serialNumber":
//       filteredItems = itemList.filter((s: Scooter) => s.serialNumber.includes(filterText));
//       break;
//     case "model":
//       filteredItems = itemList.filter((s: Scooter) => s.model.toLowerCase().includes(filterText));
//       break;
//     case "batteryLevel":
//       filteredItems = itemList.filter((s: Scooter) => s.batteryLevel.toString() === filterText);
//       break;
//     default:
//       filteredItems = itemList;
//   }

//   renderItems(filteredItems)
//   filterInput.value = "";
// }

// document.getElementById("filter-button")?.addEventListener("click", (event) => {
//   event.preventDefault();
//   filterList();
// });

// document.addEventListener("DOMContentLoaded", () => {
//   getAllItems();
// });

// submitCreate?.addEventListener("click", createItem);