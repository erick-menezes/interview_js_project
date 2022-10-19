import { Letter } from './services/api.js';

import { copyToClipboard } from './clipboard.js';
import { buildCodeSnippet } from './utils/functions/buildCodeSnippet.js';

const users = await Letter.get();

const buttonClipboardClassName = '.copy-button';
const snippetCodeBlockClassName = '.code-snippet';

buildCodeSnippet(
    users,
    snippetCodeBlockClassName
);

const clipboardButton = document.querySelector(buttonClipboardClassName);

// Adding an event listener for copying to the clipboard after the button is clicked.
clipboardButton.addEventListener('click', () => copyToClipboard(snippetCodeBlockClassName, buttonClipboardClassName));

clipboardButton.removeEventListener('click', () => copyToClipboard(snippetCodeBlockClassName, buttonClipboardClassName))

if (!!users) {
    // Rendering the cards for each user in the API.
    users.forEach((user) => {
        const resultDataBlock = document.querySelector('.result-block');
        
        resultDataBlock.insertAdjacentHTML(
            'afterbegin',
            `<div class="user-card">
                <h2>${user.name} (${user.username}) - ${user.company}</h2>
                <div class="user-info">
                    <object data="../src/assets/email.svg" width="30" height="30"></object>
                    <p><b>E-mail:</b> ${user.email}</p>
                </div>
    
                <div class="user-info">
                    <object data="../src/assets/address.svg" width="30" height="30"></object>
                    <p><b>Address:</b> ${user.address}</p>
                </div>
    
                <div class="user-info">
                    <object data="../src/assets/phone.svg" width="30" height="30"></object>
                    <p><b>Phone:</b> ${user.phone}</p>
                </div>
            </div>`
        );
    })
} else {
    const resultDataBlock = document.querySelector('.result-block');

    resultDataBlock.insertAdjacentHTML(
        'afterbegin',
        `   
            <div class="error-message-container">
                <object data="../src/assets/error.svg" width="30" height="30"></object>
                <p class="error-message">Error while fetching users, try again later.</p>
            </div>
        `
    );
}
