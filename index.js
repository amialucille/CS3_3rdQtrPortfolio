const portals = document.querySelectorAll(".portal");

portals.forEach(portal => {
    portal.addEventListener("mouseover", () => {
        portal.src = portal.dataset.hover;
    });
    portal.addEventListener("mouseout", () => {
        portal.src = portal.dataset.original;
    });
});

/* ================= COORDINATE SYSTEM ================= */

// save form
const form = document.getElementById("coordForm");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const title = document.getElementById("title").value.trim();
        const dimension = document.querySelector('input[name="dimension"]:checked')?.value;
        const description = document.getElementById("description").value.trim();
        const x = document.getElementById("coordX").value.trim();
        const y = document.getElementById("coordY").value.trim();
        const z = document.getElementById("coordZ").value.trim();
        const imageInput = document.getElementById("image");

        // Check required fields
        if (!username || !title || !dimension || !description || !x || !y || !z) {
            alert("Please fill in all required fields!");
            return;
        }

        const coords = { x, y, z };

        // Handle image file
        const reader = new FileReader();
        reader.onload = function () {
            const imgSrc = reader.result || "assets/placeholder.png";

            // Get existing saved data
            let savedData = JSON.parse(localStorage.getItem("coordsData")) || [];

            // Add new entry
            savedData.push({
                username,
                title,
                dimension,
                description,
                coords,
                imgSrc
            });

            // Save back to localStorage
            localStorage.setItem("coordsData", JSON.stringify(savedData));

            alert("Your info has been saved! ✅");

            // Reset form except username
            form.reset();
            document.getElementById("username").value = username;
        };

        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            reader.onload(); // call manually if no image
        }
    });
}

// clear form
function clearForm(){
    document.getElementById("coordForm").reset();
}

// SAVE username
document.getElementById("username")?.addEventListener("input", function () {
    localStorage.setItem("savedUsername", this.value);
});

// LOAD username when page opens
window.addEventListener("DOMContentLoaded", function () {
    const savedName = localStorage.getItem("savedUsername");
    if (savedName) {
        document.getElementById("username").value = savedName;
    }
});