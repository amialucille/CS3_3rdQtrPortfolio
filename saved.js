// Load saved coordinates from localStorage
const container = document.getElementById("savedContainer");

let saved = JSON.parse(localStorage.getItem("coordsData")) || [];

if(saved.length === 0){
    container.innerHTML = "<p>No saved coordinates yet.</p>";
}

saved.forEach(item => {

    const card = document.createElement("div");
    card.className = "saved-card";

    card.innerHTML = `
        <!-- LEFT HALF -->
        <div class="card-left">
            <img src="${item.imgSrc}" alt="Structure Image" style="width:100px; height:100px; object-fit:cover;">
        </div>

        <!-- RIGHT HALF -->
        <div class="card-right">
            <div><strong>Username:</strong> ${item.username}</div>
            <div><strong>Title:</strong> ${item.title}</div>
            <div><strong>Dimension:</strong> ${item.dimension}</div>
            <div><strong>Description:</strong> ${item.description}</div>

            <!-- inline coordinates -->
            <div class="coords-inline">
                <strong>Coordinates:</strong> X:${item.coords.x} Y:${item.coords.y} Z:${item.coords.z}
            </div>
        </div>
    `;

    container.appendChild(card);
});