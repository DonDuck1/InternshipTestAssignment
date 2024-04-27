import { clearAssignmentButtons, clearPosts, getApiData, setupBackButtonTitleAndInput } from './generalFunctions.js'
import { PostFromYourSurpriseApi } from './types'

const allPostsFromYourSurpriseApi: PostFromYourSurpriseApi[] = await getApiData('https://jsonplaceholder.typicode.com/posts');

/**
 * Function that adds a single post to the div with id "divToPutPosts"
 * 
 * @param {PostFromYourSurpriseApi} post A post from the YourSurprise API
 */
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

/**
 * Function that selects the posts of a certain user from an array of posts
 * 
 * @param {PostFromYourSurpriseApi[]} posts The array of posts to select the posts of a certain user from
 * @param {number} userIdToFind The userId of the certain user
 * 
 * @returns {PostFromYourSurpriseApi[]} The posts of a certain user
 */
function selectPostsFromUser(posts: PostFromYourSurpriseApi[], userIdToFind: number): PostFromYourSurpriseApi[] {
	const postsOfUser: PostFromYourSurpriseApi[] = posts.filter((post) => post.userId == userIdToFind);

	return postsOfUser;
}

/**
 * Function that sets up the button that leads to a page for assignment 1
 * 
 * @param {HTMLButtonElement[]} buttons The buttons on the home page
 * @param {HTMLDivElement} divToPutContent The div to put content in
 */
function setupButtonForAssignment1(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement) {
    buttons[0].addEventListener("click", function() {
        clearAssignmentButtons(buttons);
        
        setupBackButtonTitleAndInput(1, buttons, divToPutContent);
    
        document.getElementById('userIdInputSelectionButton').addEventListener("click", function() {
            const userIdString: string = (<HTMLInputElement> document.getElementById('userIdInput')).value;
    
            clearPosts();
    
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