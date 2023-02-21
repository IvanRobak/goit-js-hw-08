import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  const email = refs.input.value;
  const message = refs.textarea.value;
  const formData = { email, message };
  e.currentTarget.reset();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

  console.log(formData);
}

function onTextareaInput(e) {
  const message = e.target.value;
  localStorage.setItem(STORAGE_KEY, message);

  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  if (savedFormData) {
    const { email, message } = JSON.parse(savedFormData);
    refs.input.value = email;
    refs.textarea.value = message;
  }
}
