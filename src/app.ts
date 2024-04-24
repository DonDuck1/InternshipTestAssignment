export {}

const allPosts: { userId: number, id: number, title: string, body: string }[] = await getApiData('https://jsonplaceholder.typicode.com/posts');

const divToPutContent: HTMLElement = document.getElementById('divToPutContent');

const buttonForAssignment1: HTMLElement = document.getElementById('buttonForAssignment1');
const buttonForAssignment2: HTMLElement = document.getElementById('buttonForAssignment2');
const buttonForAssignment3: HTMLElement = document.getElementById('buttonForAssignment3');
const buttonForAssignment4: HTMLElement = document.getElementById('buttonForAssignment4');


buttonForAssignment1.addEventListener("click", function() {
	clearAssignmentButtons();
	
	setupBackButtonAndTitle(1);

	const postsOfUser8: { userId: number, id: number, title: string, body: string }[] = selectPostsFromUser(allPosts, 8);

	for (let i = 0; i < postsOfUser8.length; i++) {
		addPost(postsOfUser8[i]);
		console.log(postsOfUser8[i].id);
	}
});

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

function resetHomescreen(): void {
	buttonForAssignment1.style.display = 'inline-block';
	buttonForAssignment2.style.display = 'inline-block';
	buttonForAssignment3.style.display = 'inline-block';
	buttonForAssignment4.style.display = 'inline-block';

	divToPutContent.replaceChildren();
}

function addPost(post: {userId: number, id: number, title: string, body: string}): void {
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

	divToPutContent.append(postDiv);
}

function selectPostsFromUser(posts: { userId: number, id: number, title: string, body: string }[], userIdToFind: number): { userId: number, id: number, title: string, body: string }[] {
	const postsOfUser: { userId: number, id: number, title: string, body: string }[] = posts.filter((post) => post.userId == userIdToFind);

	return postsOfUser;
}
