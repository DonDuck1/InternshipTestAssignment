export {}

const allPostsFromApi: { userId: number, id: number, title: string, body: string }[] = await getApiData('https://jsonplaceholder.typicode.com/posts');

const divToPutContent: HTMLElement = document.getElementById('divToPutContent');

const buttonForAssignment1: HTMLElement = document.getElementById('buttonForAssignment1');
const buttonForAssignment2: HTMLElement = document.getElementById('buttonForAssignment2');
const buttonForAssignment3: HTMLElement = document.getElementById('buttonForAssignment3');
const buttonForAssignment4: HTMLElement = document.getElementById('buttonForAssignment4');

buttonForAssignment1.addEventListener("click", function() {
	clearAssignmentButtons();
	
	setupBackButtonTitleAndInput(1);

	document.getElementById('userIdInputSelectionButton').addEventListener("click", function() {
		const userIdString: string = (<HTMLInputElement> document.getElementById('userIdInput')).value;

		clearPosts()

		try {
			const userIdNumber: number = Number(userIdString);

			const postsOfUser: { userId: number, id: number, title: string, body: string }[] = selectPostsFromUser(allPostsFromApi, userIdNumber);

			for (let i = 0; i < postsOfUser.length; i++) {
				addPostFromYourSurpriseApi(postsOfUser[i]);
				console.log(postsOfUser[i].id);
			}
		} catch (error) {
			console.log(error)
		}
	})
});

buttonForAssignment2.addEventListener("click", async function() {
	clearAssignmentButtons();
	
	setupBackButtonTitleAndInput(2);

	document.getElementById('userIdInputSelectionButton').addEventListener("click", async function() {
		const userIdString: string = (<HTMLInputElement> document.getElementById('userIdInput')).value;

		clearPosts()

		try {
			const userIdNumber: number = Number(userIdString);

			const postsUserLiked = await getPostsThatUserLikedFromDatabase(userIdNumber);

			for (let i = 0; i < postsUserLiked.data.length; i++) {
				const netLikesOfPost = await getNetLikesOfPost(postsUserLiked.data[i].blog_id)

				console.log(await netLikesOfPost);
				addPostFromOwnApi(await postsUserLiked.data[i], await netLikesOfPost.data['SUM(like)']);
			}
		} catch (error) {
			console.log(error)
		}
	})	
});

buttonForAssignment3.addEventListener("click", async function() {
	clearAssignmentButtons();
	
	setupBackButtonAndTitle(3);

	setupInputsForAddingPost();

	document.getElementById('sendDataButton').addEventListener("click", async function() {
		clearErrorAndSuccessMessages();

		const emailString: string = (<HTMLInputElement> document.getElementById('email')).value;
		const likesString: string = (<HTMLInputElement> document.getElementById('likes')).value;
		const repostsString: string = (<HTMLInputElement> document.getElementById('reposts')).value;
		const viewsString: string = (<HTMLInputElement> document.getElementById('views')).value;

		try {
			const dataForPost = {
				email: emailString,
				likes: likesString,
				reposts: repostsString,
				views: viewsString
			};

			const incomingJson = await postData("https://internshiptestassignmentbackend.onrender.com/posts", dataForPost);

			const errors = await incomingJson.data;

			if (await errors.length > 0) {
				for (let i = 0; i < await errors.length; i++) {
					const errorElement = document.getElementById(`${await errors[i].errorComponent}Errors`);
					errorElement.append(`${await errors[i].errorMessage}.`);
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


async function postData(url: string, data: { email: string, likes: string, reposts: string, views: string }) {
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

function clearErrorAndSuccessMessages() {
	document.getElementById('emailErrors').replaceChildren();
	document.getElementById('likesErrors').replaceChildren();
	document.getElementById('repostsErrors').replaceChildren();
	document.getElementById('viewsErrors').replaceChildren();
	document.getElementById('successMessage').replaceChildren();
}

type Post = {
    blog_id: number;
    user_id: number;
    post: string;
};

type Meta = {
    name: string;
    title: string;
    date: string;
    originalUrl: string;
};

type DataItem = {
    meta: Meta;
    data: Post[];
};

type ArrayWithPosts = DataItem[];

async function getPostsThatUserLikedFromDatabase(userIdToUse: number) {
	const postsThatUserLikedFromDatabase = await getApiData(
		`https://internshiptestassignmentbackend.onrender.com/posts/likedby/${userIdToUse}`
	);
	return postsThatUserLikedFromDatabase;
}

async function getNetLikesOfPost(blogId: number) {
	const netLikesOfPost = await getApiData(
		`https://internshiptestassignmentbackend.onrender.com/posts/${blogId}/totallikes`
	);
	return netLikesOfPost;
}

function addPostFromOwnApi(post: {blog_id: number, user_id: number, post: string}, netLikesOfPost: number): void {
	const postDiv: HTMLDivElement = document.createElement('div');
	const titleDiv: HTMLDivElement = document.createElement('div');
	const bodyDiv: HTMLDivElement = document.createElement('div');

	const titleText: HTMLParagraphElement = document.createElement('p');
	const actualLikesSpan: HTMLSpanElement = document.createElement('span');
	const likesTextSpan: HTMLSpanElement = document.createElement('span');
	const likesText: HTMLParagraphElement = document.createElement('p');
	const bodyText: HTMLParagraphElement = document.createElement('p');
	
	titleText.innerHTML = `<b>Unknown title</b> - by user ${post.user_id}<br>`
	actualLikesSpan.innerHTML = `${netLikesOfPost}`
	likesTextSpan.innerHTML = ' net likes!'
	titleText.style.fontSize = '18px';
	bodyText.innerHTML = `${post.post}`

	titleDiv.style.borderBottom = '2px solid';
	titleDiv.style.paddingLeft = '16px';
	titleDiv.style.paddingRight = '16px';

	bodyDiv.style.paddingLeft = '16px';
	bodyDiv.style.paddingRight = '16px';

	if (netLikesOfPost > 0) {
		actualLikesSpan.style.color = 'green';
	} else if (netLikesOfPost < 0) {
		actualLikesSpan.style.color = 'red';
	}

	likesText.append(actualLikesSpan);
	likesText.append(likesTextSpan);
	titleText.append(likesText);

	titleDiv.append(titleText);
	bodyDiv.append(bodyText);

	postDiv.append(titleDiv);
	postDiv.append(bodyDiv);

	postDiv.style.display = 'inline-block';
	postDiv.style.width = '15%';
	postDiv.style.margin = '8px';
	postDiv.style.border = '4px solid';
	postDiv.style.borderRadius = '25px';

	document.getElementById('divToPutPosts').append(postDiv);
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

function clearAssignmentButtons(): void {
	buttonForAssignment1.style.display = 'none';
	buttonForAssignment2.style.display = 'none';
	buttonForAssignment3.style.display = 'none';
	buttonForAssignment4.style.display = 'none';
}

function makeNewLineHTMLElement(): HTMLBRElement {
	return document.createElement('br');
}

function setupInputsForAddingPost() {
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

function setupBackButtonAndTitle(assignmentNumber: number): void {
	const backButton: HTMLButtonElement = document.createElement('button');
	const assignmentTitleDiv: HTMLDivElement = document.createElement('div');
	const assignmentTitleText: HTMLParagraphElement = document.createElement('p');

	backButton.innerHTML = 'Back to assignment selection';
	assignmentTitleText.innerHTML = `<b>Assignment ${assignmentNumber}:</b>`;

	backButton.addEventListener("click", function() {
		resetHomescreen();
	})

	assignmentTitleText.style.fontSize = '30px';
	assignmentTitleText.style.textDecoration = 'underline';

	assignmentTitleDiv.append(assignmentTitleText);

	divToPutContent.append(backButton);
	divToPutContent.append(assignmentTitleDiv);
}

function setupBackButtonTitleAndInput(assignmentNumber: number): void {
	setupBackButtonAndTitle(assignmentNumber)

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

function resetHomescreen(): void {
	buttonForAssignment1.style.display = 'inline-block';
	buttonForAssignment2.style.display = 'inline-block';
	buttonForAssignment3.style.display = 'inline-block';
	buttonForAssignment4.style.display = 'inline-block';

	divToPutContent.replaceChildren();
}

function addPostFromYourSurpriseApi(post: {userId: number, id: number, title: string, body: string}): void {
	const postDiv: HTMLDivElement = document.createElement('div');
	const titleDiv: HTMLDivElement = document.createElement('div');
	const bodyDiv: HTMLDivElement = document.createElement('div');

	const titleText: HTMLParagraphElement = document.createElement('p');
	const bodyText: HTMLParagraphElement = document.createElement('p');

	titleText.innerHTML = `<b>${post.title}</b> - by user ${post.userId}`
	titleText.style.fontSize = '18px';
	bodyText.innerHTML = `${post.body}`

	titleDiv.style.borderBottom = '2px solid';
	titleDiv.style.paddingLeft = '16px';
	titleDiv.style.paddingRight = '16px';

	bodyDiv.style.paddingLeft = '16px';
	bodyDiv.style.paddingRight = '16px';

	titleDiv.append(titleText);
	bodyDiv.append(bodyText);

	postDiv.append(titleDiv);
	postDiv.append(bodyDiv);

	postDiv.style.display = 'inline-block';
	postDiv.style.width = '15%';
	postDiv.style.margin = '8px';
	postDiv.style.border = '4px solid';
	postDiv.style.borderRadius = '25px';

	document.getElementById('divToPutPosts').append(postDiv);
}

function selectPostsFromUser(posts: { userId: number, id: number, title: string, body: string }[], userIdToFind: number): { userId: number, id: number, title: string, body: string }[] {
	const postsOfUser: { userId: number, id: number, title: string, body: string }[] = posts.filter((post) => post.userId == userIdToFind);

	return postsOfUser;
}