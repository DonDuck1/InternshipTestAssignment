import { postData } from '../src/assignment3.js';
import { DataToMakeNewPost } from '../src/types';

function createDataForNewPost(emailString: string, likesString: string, repostsString: string, viewsString: string): DataToMakeNewPost {
    const dataForPost = {
        email: emailString,
        likes: likesString,
        reposts: repostsString,
        views: viewsString
    };

    return dataForPost;
}

describe('Testing validation of adding new post', () => {
    test('Empty email string should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: 'The email must not be empty'
                }
            ].toString()
        );
    });

    test('Empty likes string should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'likes',
                    errorMessage: 'The likes must not be empty'
                }
            ].toString()
        );
    });

    test('Empty reposts string should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '1', '', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'reposts',
                    errorMessage: 'The reposts must not be empty'
                }
            ].toString()
        );
    });

    test('Empty views string should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '1', '1', ''))).data.toString()).toBe(
            [
                {
                    errorComponent: 'views',
                    errorMessage: 'The views must not be empty'
                }
            ].toString()
        );
    });

    test('Email consisting of only letters should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The email must include an '@'"
                }
            ].toString()
        );
    });

    test('Email with only @ should give errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('@', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part in front of the '@' must contain at least one letter or number"
                },
                {
                    errorComponent: 'email',
                    errorMessage: "The part after the '@' must contain one (and only one) '.'"
                }
            ].toString()
        );
    });

    test('Email with only . should give errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('.', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The email must include an '@'"
                }
            ].toString()
        );
    });

    test('Email with only @ and . should give errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('@.', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part in front of the '@' must contain at least one letter or number"
                },
                {
                    errorComponent: 'email',
                    errorMessage: "The part between the '@' and '.' must contain at least one letter or number"
                },
                {
                    errorComponent: 'email',
                    errorMessage: "The part between after the last '.' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with only letters/numbers before @ should give errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@.', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part between the '@' and '.' must contain at least one letter or number"
                },
                {
                    errorComponent: 'email',
                    errorMessage: "The part between after the last '.' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with only letters/numbers between @ and . should give errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('@a.', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part in front of the '@' must contain at least one letter or number"
                },
                {
                    errorComponent: 'email',
                    errorMessage: "The part after the last '.' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with only letters/numbers after . should give errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('@.a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part in front of the '@' must contain at least one letter or number"
                },
                {
                    errorComponent: 'email',
                    errorMessage: "The part between the '@' and '.' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with letter missing before @ should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('@a.a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part in front of the '@' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with letter missing between @ and . should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@.a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part between the '@' and '.' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with letter missing after . should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@a.', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part between after the last '.' must contain at least one letter or number"
                }
            ].toString()
        );
    });

    test('Email with 2 @ should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@@a.a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The email must only include a single '@'"
                }
            ].toString()
        );
    });

    test('Email with 2 dots (.) after @ should give error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@a..a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part after the '@' must only include a single '.'"
                }
            ].toString()
        );
    });

    test('Emails with a front part (in front of @) longer than 50 characters should give an error', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@a.a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part in front of the '@' may not be longer than 50 characters"
                }
            ].toString()
        );
    });

    test('Emails with a back part (after @) longer than 30 characters should give an error, with most characters before .', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@aaaaaaaaaaaaaaaaaaaaaaaaaaaaa.a', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part after the '@' may not be longer than 30 characters"
                }
            ].toString()
        );
    });

    test('Emails with a back part (after @) longer than 30 characters should give an error, with most characters after .', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('a@a.aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '1', '1', '1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'email',
                    errorMessage: "The part after the '@' may not be longer than 30 characters"
                }
            ].toString()
        );
    });

    test('The numerical values are not allowed to be less than 1', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '0', '0', '0'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'likes',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                },
                {
                    errorComponent: 'reposts',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                },
                {
                    errorComponent: 'views',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                }
            ].toString()
        );
    });

    test('The numerical values are not allowed to be negative numbers', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '-1', '-1', '-1'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'likes',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                },
                {
                    errorComponent: 'reposts',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                },
                {
                    errorComponent: 'views',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                }
            ].toString()
        );
    });

    test('The numerical values are not allowed to be more than 10', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '11', '11', '11'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'likes',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                },
                {
                    errorComponent: 'reposts',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                },
                {
                    errorComponent: 'views',
                    errorMessage: 'The number of likes must lie between 1 and 10, 1 and 10 included'
                }
            ].toString()
        );
    });

    test('The numerical values are not allowed to contain letters', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', 'a', 'b', 'c'))).data.toString()).toBe(
            [
                {
                    errorComponent: 'likes',
                    errorMessage: 'The likes may consist of only numbers'
                },
                {
                    errorComponent: 'reposts',
                    errorMessage: 'The likes may consist of only numbers'
                },
                {
                    errorComponent: 'views',
                    errorMessage: 'The likes may consist of only numbers'
                }
            ].toString()
        );
    });

    test('A successfull creation of a post should have no errors', async () => {
        expect((await postData('https://internshiptestassignmentbackend.onrender.com/posts', createDataForNewPost('test@test.com', '1', '2', '3'))).data.toString()).toBe(
            [].toString()
        );
    });
});