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

        if (!username || !title || !dimension || !description || !x || !y || !z) {
            alert("Please fill in all required fields!");
            return;
        }

        const coords = { x, y, z };

        const reader = new FileReader();
        reader.onload = function () {
            const imgSrc = reader.result || "assets/placeholder.png";

            let savedData = JSON.parse(localStorage.getItem("coordsData")) || [];

            let editObj = JSON.parse(localStorage.getItem("editData"));

            if (editObj) {
                // UPDATE EXISTING
                savedData[editObj.index] = {
                    username,
                    title,
                    dimension,
                    description,
                    coords,
                    imgSrc
                };

                localStorage.removeItem("editData");
                alert("Updated successfully! ✏️");
            } else {
                // NORMAL SAVE
                savedData.push({
                    username,
                    title,
                    dimension,
                    description,
                    coords,
                    imgSrc
                });

                alert("Your info has been saved! ✅");
            }

            localStorage.setItem("coordsData", JSON.stringify(savedData));

            form.reset();
            document.getElementById("username").value = username;
        };

        if (imageInput.files[0]) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            reader.onload();
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

// LOAD username + EDIT DATA
window.addEventListener("DOMContentLoaded", function () {
    const savedName = localStorage.getItem("savedUsername");
    if (savedName) {
        document.getElementById("username").value = savedName;
    }

    const editObj = JSON.parse(localStorage.getItem("editData"));

    if (editObj) {
        const { data } = editObj;

        document.getElementById("username").value = data.username;
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("coordX").value = data.coords.x;
        document.getElementById("coordY").value = data.coords.y;
        document.getElementById("coordZ").value = data.coords.z;

        const radios = document.querySelectorAll('input[name="dimension"]');
        radios.forEach(r => {
            if (r.value === data.dimension) {
                r.checked = true;
            }
        });

        const saveBtn = document.querySelector(".save");
        if(saveBtn) saveBtn.textContent = "Update";
    }
});