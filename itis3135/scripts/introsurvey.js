document.addEventListener("DOMContentLoaded", function () {
    // Existing fields
    const nameInput = document.getElementById("name");
    const mascotInput = document.getElementById("mascot");
    const imageInput = document.getElementById("image");
    const imageCaptionInput = document.getElementById("image-caption");
    const personalBackgroundInput = document.getElementById("personal-background");
    const professionalBackgroundInput = document.getElementById('professional-background');
    const academicBackgroundInput = document.getElementById("academic-background");
    const backgroundWebDevInput = document.getElementById("background-web-dev");
    const computerInput = document.getElementById("computer");
    const funnyThingInput = document.getElementById("funny-thing");
    const anythingInput = document.getElementById("anything");
    const agreementCheckbox = document.getElementById("agreement");
    const coursesTakingDiv = document.getElementById("courses-taking");
    const submitBtn = document.getElementById('btn-submit');
    const resetBtn = document.getElementById('btn-reset');
    const addBtn = document.getElementById('add-class');
    
    let outputDiv = document.getElementById('output');

    const fields = [
        nameInput, mascotInput, imageInput, imageCaptionInput,
        personalBackgroundInput, professionalBackgroundInput,
        academicBackgroundInput, backgroundWebDevInput, 
        computerInput, funnyThingInput, anythingInput
    ];

    const emptyFields = () => fields.some((field) => field.value === '');

    const agreement = () => agreementCheckbox.checked;

    const addCourses = () => {
        const courseInputs = coursesTakingDiv.querySelectorAll('input');
        let courseList = '<ul>';
        courseInputs.forEach((course) => {
            courseList += `<li>${course.value}</li>`;
        });
        courseList += '</ul>';
        return courseList;
    };

    submitBtn.addEventListener('click', () => {
        if (outputDiv.innerHTML !== '') outputDiv.innerHTML = '';

        if (emptyFields()) {
            alert('One or more fields is empty.');
            return;
        }
        if (!agreement()) {
            alert('You must check the checkbox.');
            return;
        }
        if (!['image/png', 'image/jpg', 'image/jpeg'].includes(imageInput.files[0]?.type)) {
            alert('Invalid File upload, try again!');
            return;
        }

        outputDiv.innerHTML += `
            <figure>
                <img src="${URL.createObjectURL(imageInput.files[0])}" alt="${imageCaptionInput.value}">
                <figcaption><i>${imageCaptionInput.value}</i></figcaption>
            </figure>
            <p><span>Personal Background:</span> ${personalBackgroundInput.value}</p>
            <p><span>Professional Background:</span> ${professionalBackgroundInput.value}</p>
            <p><span>Academic Background:</span> ${academicBackgroundInput.value}</p>
            <p><span>Primary Computer Platform:</span> ${computerInput.value}</p>
            <p><span>Courses I'm Taking:</span></p>`;
        outputDiv.innerHTML += addCourses();
        outputDiv.innerHTML += `<p><span>Funny thing:</span> ${funnyThingInput.value}</p><p><span>Anything Else: </span> ${anythingInput.value}</p>`;
    });

    resetBtn.addEventListener('click', () => {
        if (!confirm('Do you want to reset the form?')) return;
        fields.forEach((field) => {
            field.value = '';
        });
        coursesTakingDiv.innerHTML = ''; // Clear courses
        outputDiv.innerHTML = '';
    });

    // Add Course Button First
    const addCourseBtn = document.getElementById("add-class");
    const removeCourseBtn = document.createElement("button");
    removeCourseBtn.type = "button";
    removeCourseBtn.textContent = "Remove Course";
    removeCourseBtn.id = "remove-course";
    removeCourseBtn.style.display = "none"; // Initially hidden

    addCourseBtn.parentNode.insertBefore(removeCourseBtn, coursesTakingDiv);

    function addCourse() {
        const courseEntry = document.createElement("div");
        courseEntry.classList.add("course-entry");

        const input = document.createElement("input");
        input.type = "text";
        input.name = "courses[]";
        input.placeholder = "Enter a course";
        input.required = true;

        courseEntry.appendChild(input);
        coursesTakingDiv.appendChild(courseEntry);

        removeCourseBtn.style.display = "inline-block"; // Show Remove button
    }

    function removeCourse() {
        if (coursesTakingDiv.lastChild) {
            coursesTakingDiv.removeChild(coursesTakingDiv.lastChild);
        }
        if (coursesTakingDiv.childElementCount === 0) {
            removeCourseBtn.style.display = "none"; // Hide Remove button when no courses exist
        }
    }

    addCourseBtn.addEventListener("click", addCourse);
    removeCourseBtn.addEventListener("click", removeCourse);
});
