/**
 * Function that clears the buttons on the main page, by setting their display to "none".
 * 
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 */
function clearAssignmentButtons(buttons: HTMLButtonElement[]): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
    }
}

/**
 * Function that clears the posts on the page, inside the div with id "divToPutPosts"
 */
function clearPosts(): void {
	document.getElementById('divToPutPosts').replaceChildren();
}

/**
 * Function that fetches data from an api.
 * 
 * @param {string} url The url of the api
 * 
 * @returns The response in json format
 */
async function getApiData(url: string) {
	try {
		let response = await fetch(url);
		let returnedResponse = await response.json();
		return returnedResponse;
	} catch (err) {
		console.error('Error: ', err);
	}
}

/**
 * A function that creates a HTMLBRElement
 * 
 * @returns {HTMLBRElement} A new HTMLBRElement
 */
function makeNewLineHTMLElement(): HTMLBRElement {
	return document.createElement('br');
}

/**
 * Function that resets the home screen
 * 
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function resetHomescreen(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'inline-block';
    }

	divToPutContent.replaceChildren();
}

/**
 * Function that sets up a button that brings you back to the home page and a HTMLParagraphElement with the title
 * 
 * @param {number} assignmentNumber The number of the selected assignment
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function setupBackButtonAndTitle(assignmentNumber: number, buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement): void {
	const backButton: HTMLButtonElement = document.createElement('button');
	const assignmentTitleDiv: HTMLDivElement = document.createElement('div');
	const assignmentTitleText: HTMLParagraphElement = document.createElement('p');

	backButton.innerHTML = 'Back to assignment selection';
	assignmentTitleText.innerHTML = `<b>Assignment ${assignmentNumber}:</b>`;

	backButton.addEventListener("click", function() {
		resetHomescreen(buttons, divToPutContent);
	})

	assignmentTitleText.style.fontSize = '30px';
	assignmentTitleText.style.textDecoration = 'underline';

	assignmentTitleDiv.append(assignmentTitleText);

	divToPutContent.append(backButton);
	divToPutContent.append(assignmentTitleDiv);
}

/**
 * Function that sets up a button that brings you back to the home page, a HTMLParagraphElement with the title and an input to put the userId in
 * 
 * @param {number} assignmentNumber The number of the selected assignment
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function setupBackButtonTitleAndInput(assignmentNumber: number, buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement): void {
	setupBackButtonAndTitle(assignmentNumber, buttons, divToPutContent)

	const input: HTMLInputElement = document.createElement('input');
	const inputSelectionButton: HTMLButtonElement = document.createElement('button');
	const divToPutPosts: HTMLDivElement = document.createElement('div');

	inputSelectionButton.innerHTML = 'Select user';

	input.id = 'userIdInput';
	inputSelectionButton.id = 'userIdInputSelectionButton';
	divToPutPosts.id = 'divToPutPosts';

	divToPutContent.append(input);
	divToPutContent.append(inputSelectionButton);
	divToPutContent.append(makeNewLineHTMLElement());
	divToPutContent.append(divToPutPosts);
}

export { clearAssignmentButtons, clearPosts, getApiData, makeNewLineHTMLElement, resetHomescreen, setupBackButtonAndTitle, setupBackButtonTitleAndInput }