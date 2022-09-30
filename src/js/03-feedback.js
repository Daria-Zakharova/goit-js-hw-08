import throttle from "lodash.throttle";

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";
const emailEl = feedbackForm.elements.email;
const messageEl = feedbackForm.elements.message;

const autocompleteOnLoad = () => {
    if (!localStorage[STORAGE_KEY]) {
        return;
    }
    
    const storageData = JSON.parse(localStorage[STORAGE_KEY]);

    emailEl.value = storageData.email;
    messageEl.value = storageData.message;
}
    
const saveDataOnInput = () => {
    const { elements: {
        email, message, }, } = feedbackForm;
    
    const feedbackData = { email: email.value, message: message.value };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}

const onSubmit = e => {
    e.preventDefault();
    if (!emailEl.value || !messageEl.value) {
        alert('Please, fill in all required fields and try again.');
    }
    else {
        console.log(JSON.parse(localStorage[STORAGE_KEY]));
        localStorage.removeItem(STORAGE_KEY);
        e.currentTarget.reset();
    }
}

    
window.addEventListener('load', autocompleteOnLoad);
feedbackForm.addEventListener('input', throttle(saveDataOnInput, 500));
feedbackForm.addEventListener('submit', onSubmit)