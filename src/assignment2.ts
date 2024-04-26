import { clearAssignmentButtons, clearPosts, setupBackButtonTitleAndInput } from './generalFunctions.js'
import { getApiData } from './generalFunctions.js'
import { PostFromOwnApi,netLikesOfPostFromOwnApi,  PostsFromOwnApi } from './types'

async function getPostsThatUserLikedFromDatabase(userIdToUse: number): Promise<PostsFromOwnApi> {
	const postsThatUserLikedFromDatabase = await getApiData(
		`https://internshiptestassignmentbackend.onrender.com/posts/likedby/${userIdToUse}`
	);
	return postsThatUserLikedFromDatabase;
}

async function getNetLikesOfPost(blogId: number): Promise<netLikesOfPostFromOwnApi> {
	const netLikesOfPost: netLikesOfPostFromOwnApi = await getApiData(
		`https://internshiptestassignmentbackend.onrender.com/posts/${blogId}/totallikes`
	);
	return netLikesOfPost;
}

function addPostFromOwnApi(post: PostFromOwnApi, netLikesOfPost: number): void {
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

function setupButtonForAssignment2(buttons: HTMLButtonElement[], divToPutContent: HTMLDivElement) {
    buttons[1].addEventListener("click", async function() {
        clearAssignmentButtons(buttons);
        
        setupBackButtonTitleAndInput(2, buttons, divToPutContent);
    
        document.getElementById('userIdInputSelectionButton').addEventListener("click", async function() {
            const userIdString: string = (<HTMLInputElement> document.getElementById('userIdInput')).value;
    
            clearPosts()
    
            try {
                const userIdNumber: number = Number(userIdString);
    
                const postsUserLiked: PostsFromOwnApi = await getPostsThatUserLikedFromDatabase(userIdNumber);
    
                for (let i = 0; i < postsUserLiked.data.length; i++) {
                    const netLikesOfPost: netLikesOfPostFromOwnApi = await getNetLikesOfPost(postsUserLiked.data[i].blog_id)
    
                    console.log(netLikesOfPost);
                    addPostFromOwnApi(postsUserLiked.data[i], netLikesOfPost.data['SUM(like)']);
                }
            } catch (error) {
                console.log(error)
            }
        })	
    });
}

export { setupButtonForAssignment2 }