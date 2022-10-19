export function copyToClipboard(elementToCopy, buttonElement) {
    const clipboardButton = document.querySelector(buttonElement);
    const copyableArea = document.querySelector(elementToCopy);

    console.log('veio pra cá!');

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