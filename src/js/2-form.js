const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.input-email');
const inputMessage = document.querySelector('.message');
const done = document.querySelector('.text');
const emailError = document.querySelector('.error');
const emptyError = document.querySelector('.empty-error');

// Объект для хранения состояния формы
let feedbackFormState = {
  email: '',
  message: '',
};

// Восстанавливаем данные из localStorage
local();

form.addEventListener('submit', oneClickSend);
form.addEventListener('input', handleInput);

function oneClickSend(event) {
  event.preventDefault();

  const email = event.target.elements.email.value.trim().toLowerCase();
  const message = event.target.elements.message.value.trim();

  // Проверка 1: на недопустимые символы в email
  const forbiddenChars = ['!', '£', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '#', '~', '/', '?', '{', '}', '[', ']', '`', '¬', '|', '"', ',', '<', '>', ':', ';'];

  for (let i = 0; i < forbiddenChars.length; i += 1) {
    if (email.includes(forbiddenChars[i])) {
      emailError.textContent = `Invalid character in email: ${forbiddenChars[i]}`;
      return;
    }
  }

  emailError.textContent = '';

  // Проверка 2: на заполненность полей
  if (!email || !message) {
    done.textContent = '';
    emptyError.textContent = 'Please fill in all fields';
    return;
  }

  emptyError.textContent = '';

  // Результат
  const formData = {
    userEmail: email,
    userMessage: message,
  };

  done.textContent = 'Success!';
  console.log(formData);

  // Очищаем объект состояния формы и сбрасываем форму
  feedbackFormState = { email: '', message: '' };
  form.reset();
  localStorage.removeItem('feedback-form-state');
}

function handleInput(event) {
  const { name, value } = event.target;

  // Обновляем объект состояния формы при вводе данных
  feedbackFormState[name] = value;

  // Сохраняем данные в localStorage
  saveData();
}

function saveData() {
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormState));
}

function local() {
  const storageData = JSON.parse(localStorage.getItem('feedback-form-state')) || {
    email: '',
    message: '',
  };

  // Восстанавливаем данные в форме
  inputEmail.value = storageData.email;
  inputMessage.value = storageData.message;

  // Обновляем объект состояния формы
  feedbackFormState = { ...storageData };
}

// Проверка правильности подключения файла стилей
const styleLink = document.querySelector('link[rel="stylesheet"]');
styleLink.addEventListener('error', () => {
  console.error('Stylesheet could not be loaded.');
});
