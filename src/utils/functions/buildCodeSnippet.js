export function buildCodeSnippet(snippetObject, querySelector) {
    if (!!!snippetObject || !!!querySelector) {
        throw new Error('One parameter is missing, try again.');
    }

    snippetObject = JSON.stringify(snippetObject, null, 2);

    const codeSnippetBlock = document.querySelector(querySelector);
    
    codeSnippetBlock.insertAdjacentHTML(
        'afterbegin',
        `<pre>
            ${snippetObject}
        </pre>`
    )
}