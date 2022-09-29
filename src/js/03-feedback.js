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
        return;
    }

    if (!feedbackData.email && !feedbackData.message.trim()) {
        localStorage.removeItem(storageKey);
        return;
    }
}

const onSubmit = e => {
    e.preventDefault();
    console.log(JSON.parse(localStorage[storageKey]));
    localStorage.removeItem(storageKey);
    feedbackForm.reset();
}

    
window.addEventListener('load', autocompleteOnLoad);
feedbackForm.addEventListener('input', throttle(saveDataOnInput, 500));
feedbackForm.addEventListener('submit', onSubmit)