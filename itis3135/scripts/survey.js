document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("byoIntroForm");
    const coursesContainer = document.getElementById("coursesContainer");
    const addCourseBtn = document.getElementById("addCourse");
    const removeCourseBtn = document.getElementById("removeCourse");
    const outputDiv = document.getElementById("output");

    addCourseBtn.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "text";
        input.name = "courses[]";
        input.placeholder = "Enter a course:";
        input.required = true;
        coursesContainer.appendChild(input);
        removeCourseBtn.style.display = "inline-block";
    });

    removeCourseBtn.addEventListener("click", function () {
        if (coursesContainer.children.length > 1) {
            coursesContainer.removeChild(coursesContainer.lastChild);
        }
        if (coursesContainer.children.length === 1) {
            removeCourseBtn.style.display = "none";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        outputDiv.innerHTML = "";

        const firstName = document.getElementById("firstName").value;
        const middleName = document.getElementById("middleName").value;
        const initial = document.getElementById("initial").value;
        const nickname = document.getElementById("nickname").value;
        const mascot = document.getElementById("mascot").value;
        const imageFile = document.getElementById("image").files[0];
        const caption = document.getElementById("caption").value;
        const personalBackground = document.getElementById("personalBackground").value;
        const professionalBackground = document.getElementById("professionalBackground").value;
        const academicBackground = document.getElementById("academicBackground").value;
        const webDevBackground = document.getElementById("webDevBackground").value;
        const computerPlatform = document.getElementById("computerPlatform").value;
        const funnyThing = document.getElementById("funnyThing").value;

        if (!imageFile || !["image/png", "image/jpg", "image/jpeg"].includes(imageFile.type)) {
            alert("Invalid image file. Please upload a PNG, JPG, or JPEG.");
            return;
        }

        const coursesArray = [...document.getElementsByName("courses[]")]
            .map((input) => input.value.trim())
            .filter((course) => course !== "");

        const coursesList = coursesArray.length > 0
            ? `<ul>${coursesArray.map((course) => `<li>${course}</li>`).join("")}</ul>`
            : "<p>No courses entered.</p>";

        const reader = new FileReader();
        reader.onload = function (e) {
            outputDiv.innerHTML = `
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Middle Name:</strong> ${middleName}</p>
                <p><strong>Initial:</strong> ${initial}</p>
                <p><strong>Nickname:</strong> ${nickname || "N/A"}</p>
                <p><strong>Mascot:</strong> ${mascot}</p>
                <img src="${e.target.result}" alt="Uploaded Image" style="max-width: 300px; display: block; margin-top: 10px;">
                <p><strong>Image Caption:</strong> ${caption}</p>
                <p><strong>Personal Background:</strong> ${personalBackground}</p>
                <p><strong>Professional Background:</strong> ${professionalBackground}</p>
                <p><strong>Academic Background:</strong> ${academicBackground}</p>
                <p><strong>Programming/Software Background:</strong> ${webDevBackground}</p>
                <p><strong>Primary Computer Platform:</strong> ${computerPlatform}</p>
                <h3>Courses Taking:</h3>
                ${coursesList}
                <p><strong>Funny/Interesting Item:</strong> ${funnyThing}</p>
            `;
        };
        reader.readAsDataURL(imageFile);
    });
});
