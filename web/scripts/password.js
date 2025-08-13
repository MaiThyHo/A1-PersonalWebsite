"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.getElementById("length");
  const lengthValue = document.getElementById("length-value");
  const numInput = document.getElementById("num");
  const interestSelect = document.getElementById("interest");
  const includeSymbol = document.getElementById("include-symbol");
  const includeLower = document.getElementById("include-lower");
  const includeUpper = document.getElementById("include-upper");
  const includeInitials = document.getElementById("include-initials");
  const form = document.getElementById("password-form");
  const passwordList = document.getElementById("password-list");
  const morePass = document.getElementById("more-pass");
  // self declared
  const symbols = "@!#$%&+";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const initials = "MTH";
  
  // based on my website
  const interests = {
    education: ["masters", "Latrobe", "Clouds", "DataSQL"],
    industry: ["SupplyChain", "Logistics", "Commodities", "Trading", "Tourism", "Technology", "Fintech"],
    chat: ["Studying", "Online", "Business", "Analyst", "Artificial", "Intelligence", "Python", "Leetcode", "Cooking", "Baking", "Badminton", "Swimming", "YogaFlow"]
  };

  // update the slider value while dragging the slider
  lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
  });

  function generatePassword() {
    const length = parseInt(lengthInput.value);
    const favNum = numInput.value;
    const interestChoice = interestSelect.value;

    // alert when required fields are empty
    if (!favNum || !interestChoice) {
      alert("Please fill in required fields.");
      return "";
    }

    let charPool = "";
    let passwordParts = [];

    if (includeSymbol.checked) {
      passwordParts.push(randomChar(symbols));
    }

    const interestWord = randomItem(interests[interestChoice]);
    passwordParts.push(interestWord);

    passwordParts.push(favNum);

    if (includeInitials.checked) {
      passwordParts.push(initials);
    }

    if (includeLower.checked) charPool += lowerChars;
    if (includeUpper.checked) charPool += upperChars;

    // in case the password has not met the length
    const remainingLength = length - passwordParts.join("").length - (includeSymbol.checked ? 1 : 0);
    for (let i = 0; i < remainingLength; i++) {
      passwordParts.push(randomChar(charPool || lowerChars));
    }

    if (includeSymbol.checked) {
      passwordParts.push(randomChar(symbols));
    }

    let password = shuffleArray(passwordParts).join("");

    // casing rules
    if (!includeLower.checked && includeUpper.checked) {
      password = password.toUpperCase();
    } else if (!includeUpper.checked && includeLower.checked) {
      password = password.toLowerCase();
    }

    return password;
  }

  // randomness
  function randomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // submit gen 1 password
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    passwordList.innerHTML = `<li>${generatePassword()}</li>`;
  });

  // gen 10 passwords
  morePass.addEventListener("click", () => {
    passwordList.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      passwordList.innerHTML += `<li>${generatePassword()}</li>`;
    }
  });
});

