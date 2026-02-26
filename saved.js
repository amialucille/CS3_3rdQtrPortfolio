// Load saved coordinates from localStorage
const container = document.getElementById("savedContainer");

// Get dimension from URL
const urlParams = new URLSearchParams(window.location.search);
const dimensionFilter = urlParams.get('dimension'); // e.g., "Overworld"

let saved = JSON.parse(localStorage.getItem("coordsData")) || [];

// filter by dimension if specified
if (dimensionFilter) {
    saved = saved.filter(item => item.dimension === dimensionFilter);
}

if (saved.length === 0) {
    container.innerHTML = "<p>No saved coordinates yet for this dimension.</p>";
} else {
    saved.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "saved-card";

        card.innerHTML = `
            <div class="card-image">
                <img src="${item.imgSrc}" alt="Structure Image">
            </div>
            <div class="card-info">
                <p><strong>User:</strong> ${item.username}</p>
                <p><strong>Title:</strong> ${item.title}</p>
                <p><strong>Dimension:</strong> ${item.dimension}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p class="coords">
                    <span class="coords-default">X:${item.coords.x} Y:${item.coords.y} Z:${item.coords.z}</span>
                    <div class="coords-expanded">
                        <p>X: ${item.coords.x}</p>
                        <p>Y: ${item.coords.y}</p>
                        <p>Z: ${item.coords.z}</p>
                    </div>
                </p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });

    // delete functionality
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            let allData = JSON.parse(localStorage.getItem("coordsData")) || [];
            // remove from full array
            const itemToDelete = saved[idx]; // filtered array
            const fullIndex = allData.findIndex(d => d === itemToDelete);
            if(fullIndex > -1){
                allData.splice(fullIndex, 1);
                localStorage.setItem("coordsData", JSON.stringify(allData));
                location.reload(); // refresh to re-filter
            }
        });
    });
}