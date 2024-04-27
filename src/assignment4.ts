import { clearAssignmentButtons, makeNewLineHTMLElement, setupBackButtonAndTitle } from './generalFunctions.js'

/**
 * Function that sets up the button that leads to a page for assignment 4
 * 
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function setupButtonForAssignment4(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement) {
    buttons[3].addEventListener("click", async function() {
        clearAssignmentButtons(buttons);
        
        setupBackButtonAndTitle(4, buttons, divToPutContent);
    
        const explanationText: HTMLParagraphElement = document.createElement('p');

        explanationText.innerHTML = "Open the root folder with a terminal like git bash. Run the command 'npm run test'. The actual unit tests are defined in the relative path <i>'./tests/testsForAssignment3.ts'</i>. If you get an error like ' Test suite failed to run: Unable to process $path/testsForAssignment3.ts, something about the outDir and transformIgnorePatterns', make sure you have commented out 'noEmitOnError' in 'tsconfig.json'.";

        divToPutContent.append(explanationText);
    });
}

export { setupButtonForAssignment4 }