import throttle from "lodash.throttle";

const feedbackForm = document.querySelector('.feedback-form');
const storageKey = "feedback-form-state";
const emailEl = feedbackForm.elements.email;
const messageEl = feedbackForm.elements.message;

const autocompleteOnLoad = () => {
    if (!localStorage[storageKey]) {
        return;
    }
    
    const storageData = JSON.parse(localStorage[storageKey]);

    emailEl.value = storageData.email ? storageData.email : '';
    messageEl.value = storageData.message ? storageData.message : '';
}
    
const saveDataOnInput = () => {
    
    const { elements: {
        email, message, }, } = feedbackForm;
    
    const feedbackData = { email: email.value, message: message.value };

    if (feedbackData.email || feedbackData.message.trim()) {
        localStorage.setItem(storageKey, JSON.stringify(feedbackData));
    }

    if (!feedbackData.email && !feedbackData.message.trim()) {
        localStorage.removeItem(storageKey);
    }
}

const onSubmit = e => {
    e.preventDefault();
    console.log(localStorage[storageKey]);
    localStorage.removeItem(storageKey);
    emailEl.value = '';
    messageEl.value = '';
}

    
window.addEventListener('load', autocompleteOnLoad);
feedbackForm.addEventListener('input', throttle(saveDataOnInput, 500));
feedbackForm.addEventListener('submit', onSubmit)