const form = document.getElementById("password-form") as HTMLFormElement;
const output = document.getElementById("generated-password") as HTMLParagraphElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const options = form.querySelectorAll("input[name='option']:checked") as NodeListOf<HTMLInputElement>;
  const password = Array.from(options).map(o => o.value).join("");
  output.textContent = `Generated Password: ${password}`;
});
