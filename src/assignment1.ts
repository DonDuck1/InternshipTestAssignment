import { clearAssignmentButtons, clearPosts, getApiData, setupBackButtonTitleAndInput, } from './generalFunctions.js'
import { PostFromYourSurpriseApi } from './types'

const allPostsFromYourSurpriseApi: PostFromYourSurpriseApi[] = await getApiData('https://jsonplaceholder.typicode.com/posts');

function addPostFromYourSurpriseApi(post: PostFromYourSurpriseApi): void {
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

function selectPostsFromUser(posts: PostFromYourSurpriseApi[], userIdToFind: number): PostFromYourSurpriseApi[] {
	const postsOfUser: { userId: number, id: number, title: string, body: string }[] = posts.filter((post) => post.userId == userIdToFind);

	return postsOfUser;
}

function setupButtonForAssignment1(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement) {
    buttons[0].addEventListener("click", function() {
        clearAssignmentButtons(buttons);
        
        setupBackButtonTitleAndInput(1, buttons, divToPutContent);
    
        document.getElementById('userIdInputSelectionButton').addEventListener("click", function() {
            const userIdString: string = (<HTMLInputElement> document.getElementById('userIdInput')).value;
    
            clearPosts()
    
            try {
                const userIdNumber: number = Number(userIdString);
    
                const postsOfUser: PostFromYourSurpriseApi[] = selectPostsFromUser(allPostsFromYourSurpriseApi, userIdNumber);
    
                for (let i = 0; i < postsOfUser.length; i++) {
                    addPostFromYourSurpriseApi(postsOfUser[i]);
                    console.log(postsOfUser[i].id);
                }
            } catch (error) {
                console.log(error)
            }
        })
    });
}

export { setupButtonForAssignment1 }