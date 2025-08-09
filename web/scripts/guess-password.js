"use strict";
const form = document.getElementById("password-form");
const output = document.getElementById("generated-password");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const options = form.querySelectorAll("input[name='option']:checked");
    const password = Array.from(options).map(o => o.value).join("");
    output.textContent = `Generated Password: ${password}`;
});
