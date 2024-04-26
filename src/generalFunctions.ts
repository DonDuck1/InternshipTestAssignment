function clearAssignmentButtons(buttons: HTMLButtonElement[]): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
    }
}

function clearPosts(): void {
	document.getElementById('divToPutPosts').replaceChildren();
}

async function getApiData(url: string) {
	try {
		let response = await fetch(url);
		let returnedResponse = await response.json();
		return returnedResponse;
	} catch (err) {
		console.error('Error: ', err);
	}
}

function makeNewLineHTMLElement(): HTMLBRElement {
	return document.createElement('br');
}

function resetHomescreen(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'inline-block';
    }

	divToPutContent.replaceChildren();
}

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