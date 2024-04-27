# InternshipTestAssignment
This is one of the repos used for my internship test assignment. The other repo (the backend) can be found here: https://github.com/DonDuck1/InternshipTestAssignmentBackend. The assignment(s) was (/were) as follows:

1. Build a component (in a language of choice) that fetches the data from
https://jsonplaceholder.typicode.com/posts and displays the title and body from user 8
2. Given this database, write a query that gets all of the blog posts that have been liked by user 8 (https://github.com/YourSurpriseCom/database-test)
3. Build an endpoint in a language of choice that can validate the data below. Make sure that 1. The email address is valid, 2. All numeric values are between 1 and 10. If it succeeds, return a response that everything went fine, if the validation fails, make sure to return an insightful response.\
{\
$\quad$&quot;email&quot;: &quot;test@test.nl&quot;,\
$\quad$&quot;likes&quot; : 7,\
$\quad$&quot;reposts&quot; : 8,\
$\quad$&quot;views&quot;: 11\
}
4. Bonus: Write a unit test that tests the validation component from assignment 3

The website is uploaded using Render, and can be accessed from the following link:\
https://internshiptestassignment.onrender.com/

In order for the website to function properly, the backend webservice should also be running. Because the version of Render used is the free one, the backend will go down when no traffic is detected within 2 minutes. When accessing the following link, the backend will go up again, which can take up to 5 minutes:\
https://internshiptestassignmentbackend.onrender.com