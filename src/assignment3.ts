import { clearAssignmentButtons, makeNewLineHTMLElement, setupBackButtonAndTitle } from './generalFunctions.js'
import { DataToMakeNewPost, Error, ErrorsFromMakingNewPost } from './types'

/**
 * Function that sends a POST request with data to an api
 * 
 * @param {string} url Url of API
 * @param {{}} data The data to put in the body of the request
 * 
 * @returns The response
 */
async function postData(url: string, data: {}) {
	const response = await fetch(url, {
		method: "POST",
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache",
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		redirect: "manual", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: new URLSearchParams(data)
	});

	// return response.text(); // parses JSON response into native JavaScript objects
	return response.json();
}

/**
 * Function that clears the previous error or success message(s)
 */
function clearErrorAndSuccessMessages() {
	document.getElementById('emailErrors').replaceChildren();
	document.getElementById('likesErrors').replaceChildren();
	document.getElementById('repostsErrors').replaceChildren();
	document.getElementById('viewsErrors').replaceChildren();
	document.getElementById('successMessage').replaceChildren();
}

/**
 * Function that sets up the inputs for adding a new post (sending data to the backend)
 * 
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function setupInputsForAddingPost(divToPutContent: HTMLDivElement) {
	const emailInputTitle: HTMLParagraphElement = document.createElement('p');
	const emailInputErrors: HTMLParagraphElement = document.createElement('p');
	const emailInput: HTMLInputElement = document.createElement('input');

	const likesInputTitle: HTMLParagraphElement = document.createElement('p');
	const likesInputErrors: HTMLParagraphElement = document.createElement('p');
	const likesInput: HTMLInputElement = document.createElement('input');

	const repostsInputTitle: HTMLParagraphElement = document.createElement('p');
	const repostsInputErrors: HTMLParagraphElement = document.createElement('p');
	const repostsInput: HTMLInputElement = document.createElement('input');

	const viewsInputTitle: HTMLParagraphElement = document.createElement('p');
	const viewsInputErrors: HTMLParagraphElement = document.createElement('p');
	const viewsInput: HTMLInputElement = document.createElement('input');

	const sendDataButton: HTMLButtonElement = document.createElement('button');

	const successMessage: HTMLParagraphElement = document.createElement('p');

	emailInputTitle.innerHTML = 'Email:'
	likesInputTitle.innerHTML = 'Likes:'
	repostsInputTitle.innerHTML = 'Reposts:'
	viewsInputTitle.innerHTML = 'Views:'
	sendDataButton.innerHTML = 'Send data';

	emailInputTitle.style.marginBottom = '8px'
	emailInputErrors.id = 'emailErrors';
	emailInputErrors.style.color = 'red';
	emailInput.id = 'email';

	likesInputTitle.style.marginTop = '24px'
	likesInputTitle.style.marginBottom = '8px'
	likesInputErrors.id = 'likesErrors';
	likesInputErrors.style.color = 'red';
	likesInput.id = 'likes';

	repostsInputTitle.style.marginTop = '24px'
	repostsInputTitle.style.marginBottom = '8px'
	repostsInputErrors.id = 'repostsErrors';
	repostsInputErrors.style.color = 'red';
	repostsInput.id = 'reposts';

	viewsInputTitle.style.marginTop = '24px'
	viewsInputTitle.style.marginBottom = '8px'
	viewsInputErrors.id = 'viewsErrors';
	viewsInputErrors.style.color = 'red';
	viewsInput.id = 'views';

	sendDataButton.id = 'sendDataButton';

	successMessage.id = 'successMessage';

	divToPutContent.append(emailInputTitle);
	divToPutContent.append(emailInputErrors);
	divToPutContent.append(emailInput);

	divToPutContent.append(likesInputTitle);
	divToPutContent.append(likesInputErrors);
	divToPutContent.append(likesInput);

	divToPutContent.append(repostsInputTitle);
	divToPutContent.append(repostsInputErrors);
	divToPutContent.append(repostsInput);

	divToPutContent.append(viewsInputTitle);
	divToPutContent.append(viewsInputErrors);
	divToPutContent.append(viewsInput);

	divToPutContent.append(makeNewLineHTMLElement());
	divToPutContent.append(makeNewLineHTMLElement());

	divToPutContent.append(sendDataButton);

	divToPutContent.append(successMessage);
}

/**
 * Function that sets up the button that leads to a page for assignment 3
 * 
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function setupButtonForAssignment3(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement) {
    buttons[2].addEventListener("click", async function() {
        clearAssignmentButtons(buttons);
        
        setupBackButtonAndTitle(3, buttons, divToPutContent);
    
        setupInputsForAddingPost(divToPutContent);
    
        document.getElementById('sendDataButton').addEventListener("click", async function() {
            clearErrorAndSuccessMessages();
    
            const emailString: string = (<HTMLInputElement> document.getElementById('email')).value;
            const likesString: string = (<HTMLInputElement> document.getElementById('likes')).value;
            const repostsString: string = (<HTMLInputElement> document.getElementById('reposts')).value;
            const viewsString: string = (<HTMLInputElement> document.getElementById('views')).value;
    
            try {
                const dataForPost: DataToMakeNewPost = {
                    email: emailString,
                    likes: likesString,
                    reposts: repostsString,
                    views: viewsString
                };
    
                const incomingJson: ErrorsFromMakingNewPost = await postData("https://internshiptestassignmentbackend.onrender.com/posts", dataForPost);
                console.log(incomingJson);

                const errors: Error[] = incomingJson.data;
    
                if (errors.length > 0) {
                    for (let i = 0; i < errors.length; i++) {
                        const errorElement: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById(`${errors[i].errorComponent}Errors`);
                        errorElement.append(`${errors[i].errorMessage}.`);
                        errorElement.append(makeNewLineHTMLElement());
                    }
                } else {
                    document.getElementById('successMessage').innerHTML = 'Information successfully sent!';
                }
            } catch (error) {
                console.log(error);
            }
        })	
    });
}

export { setupButtonForAssignment3, postData }