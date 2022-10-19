/**
 * Render a code snippet inside a element.
 * 
 * @description Gets the snippet code informed and render into the element selected. If the snippetObject argument is not passed, an error is thrown.
 * 
 * @param {*} snippetObject - The snippet object to be rendered.
 * @param {string} querySelector - The querySelector (class, id, etc.) of the parent element.
 */

export function buildCodeSnippet(snippetObject, querySelector="#root") {
    snippetObject = JSON.stringify(snippetObject, null, 2);

    const codeSnippetBlock = document.querySelector(querySelector);

    if (!!!snippetObject) {
        codeSnippetBlock.insertAdjacentHTML(
            'afterbegin',
            `<pre>Error on fetching data. Try again later.</pre>`
        )
        
        console.error('Error on fetching data. Snippet or selector are missing.');

        return;
    }
    
    codeSnippetBlock.insertAdjacentHTML(
        'afterbegin',
        `<pre>
            ${snippetObject}
        </pre>`
    )
}