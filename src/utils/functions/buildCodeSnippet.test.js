import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, '../../../public/index.html'), 'utf8');

let dom
let container

const buildCodeSnippetMock = jest.fn((domContainer, snippetObject, querySelector="#root") => {
    snippetObject = Boolean(snippetObject) === true && JSON.stringify(snippetObject, null, 2);

    const codeSnippetBlock = domContainer.querySelector(querySelector);

    if (!!!snippetObject) {
        codeSnippetBlock.insertAdjacentHTML(
            'afterbegin',
            `<pre>Error on fetching data. Try again later.</pre>`
        )
        
        return;
    }
    
    codeSnippetBlock.insertAdjacentHTML(
        'afterbegin',
        `<pre>
            ${snippetObject}
        </pre>`
    )
}) 

/**
 * @jest-environment jsdom
 */

describe('buildCodeSnippet function', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body    
    })

    test("it should render the snippet on the chosen element if the arguments are valid", () => {
        const codeSnippetBlock = container.querySelector('.code-snippet');
        
        const snippetObjectMock = { "test": true }

        buildCodeSnippetMock(container, snippetObjectMock, '.code-snippet');

        expect(codeSnippetBlock.firstChild).not.toBeNull();
        expect(codeSnippetBlock.firstChild.textContent.length).toBeGreaterThan(0);
        expect(codeSnippetBlock.firstChild.textContent).not.toBe('Error on fetching data. Try again later.');
    });

    test("it should not render the snippet on the chosen element if the arguments are invalid", () => {
        const codeSnippetBlock = container.querySelector('.code-snippet');
        
        buildCodeSnippetMock(container, null, '.code-snippet');

        expect(codeSnippetBlock.firstChild).not.toBeNull();
        expect(codeSnippetBlock.firstChild.textContent).toBe('Error on fetching data. Try again later.');
    });
});