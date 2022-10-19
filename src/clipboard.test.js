// import { fireEvent, queryByTestId } from '@testing-library/dom'
import { fireEvent, getByText } from '@testing-library/dom';

import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

let dom;
let container;

let clipboardButton;

const copyToClipboardMock = jest.fn((domContainer, buttonElement) => {
    const clipboardButton = domContainer.querySelector(buttonElement);

    clipboardButton.innerHTML = `<object data="../src/assets/check.svg" width="300" height="300"></object>Copied!`

    setTimeout(() => {
        clipboardButton.innerHTML = `<object data="../src/assets/copy.svg" width="300" height="300"></object>Copy to clipboard`
    }, 1000)
});

/**
 * @jest-environment jsdom
 */

describe('buildCodeSnippet function', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body

        clipboardButton = container.querySelector('.copy-button');
        clipboardButton.addEventListener('click', () => copyToClipboardMock(container, '.copy-button'));
    })

    afterEach(() => {
        clipboardButton.addEventListener('click', () => copyToClipboardMock(container, '.copy-button'));
    })

    test("it should change the text of the button when the button is clicked", () => {
        const buttonElement = container.querySelector('.copy-button');
        
        const button = getByText(container, 'Copy to clipboard');
        expect(buttonElement.textContent).toMatch(/Copy to clipboard/i);

        fireEvent.click(button);
        expect(buttonElement.textContent).toBe('Copied!');
    });

    test("it should not render the snippet on the chosen element if the arguments are invalid", () => {});
});