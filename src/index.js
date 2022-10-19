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

clipboardButton.addEventListener('click', () => copyToClipboard(snippetCodeBlockClassName, buttonClipboardClassName));

clipboardButton.removeEventListener('click', () => copyToClipboard(snippetCodeBlockClassName, buttonClipboardClassName))

users.map((user) => {
    const resultDataBlock = document.querySelector('.result-block');
    
    resultDataBlock.insertAdjacentHTML(
        'afterbegin',
        `<div class="user-card">
            <h2>${user.name} (${user.username}) - ${user.company}</h2>
            <p><b>E-mail:</b> ${user.email}</p>
            <p><b>Address:</b> ${user.address}</p>
            <p><b>Phone:</b> ${user.phone}</p>
        </div>`
    );
})