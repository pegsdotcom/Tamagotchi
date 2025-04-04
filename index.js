// Tamagotchi Class
class Tamagotchi {
    constructor(name, animalType) {
        this.name = name;
        this.animalType = animalType;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.interval = setInterval(() => this.decreaseStats(), 10000);
    }

    decreaseStats() {
        this.energy -= 15;
        this.fullness -= 15;
        this.happiness -= 15;
        this.checkStatus();
        updateDOM();
    }

    nap() {
        this.energy = Math.min(this.energy + 40, 100);
        this.happiness = Math.max(this.happiness - 10, 0);
        this.fullness = Math.max(this.fullness - 10, 0);
        logAction(`You took a nap with ${this.name}!`);
        this.checkStatus();
        updateDOM();
    }

    play() {
        this.happiness = Math.min(this.happiness + 30, 100);
        this.fullness = Math.max(this.fullness - 10, 0);
        this.energy = Math.max(this.energy - 10, 0);
        logAction(`You played with ${this.name}!`);
        this.checkStatus();
        updateDOM();
    }

    eat() {
        this.fullness = Math.min(this.fullness + 30, 100);
        this.happiness = Math.min(this.happiness + 5, 100);
        this.energy = Math.max(this.energy - 15, 0);
        logAction(`You fed ${this.name}!`);
        this.checkStatus();
        updateDOM();
    }

    checkStatus() {
        if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
            logAction(`${this.name} ran away due to neglect!`);
            clearInterval(this.interval);
            pets = pets.filter(pet => pet !== this);
            updateDOM();
        }
    }
}

let pets = [];

function addPet() {
    if (pets.length >= 4) return alert("You can only have 4 pets!");

    const name = document.getElementById("petName").value.trim();
    const animalType = document.getElementById("pet-type").value; 

    if (!name) {
        alert("Please enter a pet name!");
        return;
    }

    pets.push(new Tamagotchi(name, animalType));
    updateDOM();
}

function logAction(message) {
    const log = document.getElementById("history");
    log.innerHTML += `<p>${message}</p>`;
}

function updateDOM() {
    const container = document.getElementById("pets");
    container.innerHTML = "";

    pets.forEach((pet, index) => {
        const petDiv = document.createElement("div");
        petDiv.innerHTML = `
            <h3>${pet.name} (${pet.animalType})</h3>
            <p>Energy: ${pet.energy}</p>
            <p>Fullness: ${pet.fullness}</p>
            <p>Happiness: ${pet.happiness}</p>
            <button class="nap-btn" data-index="${index}">Nap</button>
            <button class="play-btn" data-index="${index}">Play</button>
            <button class="eat-btn" data-index="${index}">Eat</button>
        `;
        container.append(petDiv);
    });

//eventlistener
    document.querySelectorAll(".nap-btn").forEach(button => {
        button.addEventListener("click", () => pets[button.dataset.index].nap());
    });

    document.querySelectorAll(".play-btn").forEach(button => {
        button.addEventListener("click", () => pets[button.dataset.index].play());
    });

    document.querySelectorAll(".eat-btn").forEach(button => {
        button.addEventListener("click", () => pets[button.dataset.index].eat());
    });
}
