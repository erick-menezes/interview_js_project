/**
 * Copies the content inside the element selected.
 *  
 * @param {string} elementToCopy - The querySelector (class, id, etc.) of the element that will have its content copied.
 * @param {string} buttonElement  - The querySelector (class, id, etc.) of the button that will trigger the action.
 */
export function copyToClipboard(elementToCopy, buttonElement) {
    const clipboardButton = document.querySelector(buttonElement);
    const copyableArea = document.querySelector(elementToCopy);

    navigator.clipboard.writeText(copyableArea.textContent);
        
    clipboardButton.innerHTML = `
        <object data="../src/assets/check.svg" width="300" height="300"></object>
        Copied!
    `

    setTimeout(() => {
        clipboardButton.innerHTML = `
            <object data="../src/assets/copy.svg" width="300" height="300"></object>
            Copy to clipboard
        ` 
    }, 1000)
}