const API_KEY = "YOU API KEY";

const submitButton = document.querySelector("#submit");
const inputElement = document.querySelector("#input");
const outputElement = document.querySelector("#output");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector(".button-new-chat");

function changeInput(value) {
  const inputElement = document.querySelector("#input");
  inputElement.value = value;
}

async function getMessage() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputElement.value }],
      max_tokens: 100,
    }),
  };

  let input = inputElement.value;
  clearInput();

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();

    if (data.choices[0].message.content && input) {
      outputElement.textContent = data.choices[0].message.content;

      const pElement = document.createElement("p");
      pElement.textContent = input;

      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );

      historyElement.append(pElement);
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

function clearInput() {
  inputElement.value = "";
}

submitButton.addEventListener("click", getMessage);

buttonElement.addEventListener("click", clearInput);
