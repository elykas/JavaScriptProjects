const baseUrl:string = "https://66e9434487e417609448b25b.mockapi.io/api/v1/scotters";
const submitCreate:HTMLFormElement = document.getElementById("submit-input") as HTMLFormElement;
const mainPage:HTMLDivElement = document.getElementById("main-page") as HTMLDivElement;
const editPage:HTMLDivElement = document.getElementById("edit-page") as HTMLDivElement;
const saveEditButton:HTMLFormElement = document.getElementById(
  "submit-edit"
) as HTMLFormElement;
const backButton: HTMLFormElement = document.getElementById("back-button") as HTMLFormElement;

enum Status {
  avaliable = "avaliable",
  inRepair = "inRepair",
  unavailable = "unavailable",
}

interface Scooter {
  id?: string;
  serialNumber: string;
  model: string;
  batteryLevel: number;
  imageUrl: string;
  color: string;
  StatusAvaliable: Status;
}

const saveToLocalStorage = (scooters: Scooter[]): void => {
    localStorage.setItem('scooters', JSON.stringify(scooters));
  };
  
  const loadFromLocalStorage = (): Scooter[] => {
    const storedScooters = localStorage.getItem('scooters');
    return storedScooters ? JSON.parse(storedScooters) : [];
  };

async function addScooter(scooter: Scooter): Promise<Scooter| undefined> {
  try {
    const response:Response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scooter),
    });
    if (!response.ok) {
      throw new Error("network error");
    }
    const newScooter:Scooter = await response.json();

    const storedScooters = loadFromLocalStorage();
    storedScooters.push(newScooter);
    saveToLocalStorage(storedScooters);

    return newScooter;
  } catch (error) {
        console.log(error);
        const storedScooters = loadFromLocalStorage();
        const newScooter = { ...scooter, id: Date.now().toString() }; 
        storedScooters.push(newScooter);
        saveToLocalStorage(storedScooters);
        return newScooter;
  }
}

const deleteScooter = async (id: string) => {
  try {
    const response:Response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete scooter from the API");
    }
    const storedScooters = loadFromLocalStorage();
    const updatedScooters = storedScooters.filter(scooter => scooter.id !== id);
    saveToLocalStorage(updatedScooters);

    getAllScooter();
  } catch (error) {
    console.log(error);

    const storedScooters = loadFromLocalStorage();
    const updatedScooters = storedScooters.filter(scooter => scooter.id !== id);
    saveToLocalStorage(updatedScooters);
    renderScooters(updatedScooters);
  }
};

const getAllScooter = async() => {
  try {
    const response:Response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error("Failed to delete scooter from the API");
    }
    const scooters: Scooter[] = await response.json();
    saveToLocalStorage(scooters); 
    renderScooters(scooters);
    return scooters;
  } catch (error) {
      console.log(error);
      const storedScooters = loadFromLocalStorage();
      renderScooters(storedScooters);
      return storedScooters;
  }
};

const editScooter = async (
  id: string,
  updatedData: Partial<Scooter>
): Promise<void> => {
  try {
    const updateResponse = await fetch(`${baseUrl}/${id}`, {
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
    const updatedScooters = storedScooters.map(scooter => 
      scooter.id === id ? { ...scooter, ...updatedData } : scooter
    );
    saveToLocalStorage(updatedScooters);
  } catch (error) {
    console.log(error);
    const storedScooters = loadFromLocalStorage();
    const updatedScooters = storedScooters.map(scooter => 
      scooter.id === id ? { ...scooter, ...updatedData } : scooter
    );
    saveToLocalStorage(updatedScooters);
  }
};

const getScooterById = async (id: string): Promise<Scooter | null> => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to delete scooter from the API");
    }
    const scooter:Scooter = await response.json();
    return scooter;
  } catch (error) {
    console.log(error);
    const storedScooters = loadFromLocalStorage();
    return storedScooters.find(scooter => scooter.id === id) || null;
  }
};

const createScooter = async(event: Event) => {
  event.preventDefault();

  const serialNumber:string = (
    document.getElementById("scooter-serialNumber") as HTMLInputElement
  ).value;
  const model:string = (document.getElementById("model-input") as HTMLInputElement)
    .value;
  const batteryLevel:number = +(
    document.getElementById("battery-input") as HTMLInputElement
  ).value;
  const imageUrl:string = (document.getElementById("image-input") as HTMLInputElement)
    .value;
  const color:string = (document.getElementById("color-input") as HTMLInputElement)
    .value;
  const status:Status = (document.getElementById("select-input") as HTMLSelectElement)
    .value as Status;

  const newScooter: Scooter = {
    serialNumber,
    model,
    batteryLevel,
    imageUrl,
    color,
    StatusAvaliable: status,
  };

  await addScooter(newScooter);
  await getAllScooter();
  
  (document.querySelector("form") as HTMLFormElement).reset();
};

const renderScooters = (scooters: Scooter[]) => {
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
      } else {
        console.error("Main page or edit page element not found");
      }
    });
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);
    scooterTable.appendChild(row);
  });
};


let currentScooter: Scooter | null = null;

const editForm = (scooter: Scooter, event: Event) => {
    event.preventDefault();
    currentScooter = scooter; 
    turnPage();
    
    (document.getElementById("edit-input") as HTMLInputElement).value = scooter.batteryLevel.toString();
  };

saveEditButton.addEventListener("click", async () => {
    if (currentScooter && currentScooter.id) {
      const editInput = +(document.getElementById("edit-input") as HTMLInputElement).value;
  
      const updateData: Partial<Scooter> = {
        batteryLevel: editInput,
      };
  
      await editScooter(currentScooter.id, updateData); 
      turnPage(); 
      getAllScooter(); 
    }
  });

const turnPage = () => {
  mainPage.classList.toggle("hidden"); 
  editPage.classList.toggle("visible");
};

const formSort = async() => {
    const scooterList: Scooter[] = await getAllScooter();
    const option:string =  (document.getElementById("select-sort") as HTMLSelectElement).value;
    
    let sortedScooters = [];

    switch(option){
            case "serialNumber":
            sortedScooters = scooterList.sort((a: Scooter, b: Scooter) =>
            parseInt(a.serialNumber) - parseInt(b.serialNumber)
            );
            break;
            case "batteryLevel":
                sortedScooters = scooterList.sort((a:Scooter, b:Scooter) => b.batteryLevel - a.batteryLevel);
                break;
            case "model":
                sortedScooters = scooterList.sort((a:Scooter, b:Scooter) => a.model.localeCompare(b.model));
                break;
            default:
                sortedScooters = scooterList;
    }
    renderScooters(sortedScooters)
}

document.getElementById("button-sort")?.addEventListener("click", (event) => {
    event.preventDefault(); 
    formSort(); 
  });

const filterList = async() => {
    const scooterList:Scooter[] = await getAllScooter();
    const option:string =  (document.getElementById("select-filter") as HTMLSelectElement).value;
    const filterInput = document.getElementById("filter-list") as HTMLInputElement;
    const filterText:string = filterInput.value.toLowerCase();

    let sortedScooters:Scooter[] = [];

    switch(option){
        case "serialNumber":
        sortedScooters = scooterList.filter((s: Scooter) => s.serialNumber.includes(filterText));
        break;
        case "model":
            sortedScooters = scooterList.filter((s: Scooter) => s.model.toLowerCase().includes(filterText));
            break;
        case "batteryLevel":
            sortedScooters = scooterList.filter((s: Scooter) => s.batteryLevel.toString() === filterText);
            break;
        default:
            sortedScooters = scooterList;
}
    
    renderScooters(sortedScooters)
    filterInput.value = "";
}

document.getElementById("filter-button")?.addEventListener("click", (event) => {
    event.preventDefault(); 
    filterList();
  });

document.addEventListener("DOMContentLoaded", () => {
  getAllScooter();
});

submitCreate?.addEventListener("click", createScooter);
