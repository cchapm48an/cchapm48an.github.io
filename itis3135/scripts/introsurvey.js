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

        const name = document.getElementById("name").value;
        const mascot = document.getElementById("mascot").value;
        const imageFile = document.getElementById("image").files[0];
        const caption = document.getElementById("caption").value;
        const personalBackground = document.getElementById("personalBackground").value;
        const professionalBackground = document.getElementById("professionalBackground").value;
        const academicBackground = document.getElementById("academicBackground").value;
        const webDevBackground = document.getElementById("webDevBackground").value;
        const computerPlatform = document.getElementById("computerPlatform").value;
        const funnyThing = document.getElementById("funnyThing").value;
        const anythingElse = document.getElementById("anythingElse").value;
        const agreement = document.getElementById("agreement").checked;

        if (!imageFile || !["image/png", "image/jpg", "image/jpeg"].includes(imageFile.type)) {
            alert("Invalid image file.");
            return;
        }

        if (!agreement) {
            alert("You must agree to the terms.");
            return;
        }

        const courses = [...document.getElementsByName("courses[]")].map(input => input.value).join(", ");

        outputDiv.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mascot:</strong> ${mascot}</p>
            <p><strong>Courses:</strong> ${courses}</p>
            <p><strong>Funny Thing:</strong> ${funnyThing}</p>
            <p><strong>Anything Else:</strong> ${anythingElse}</p>
        `;
    });
});
