# NodeJS-Program
NodeJS Global Mentoring Program Homeworks

To launch Homework 2,3 and 4, execute:
*npm run express-server*

To get auto-suggest list from limit users, sorted by login property and filtered by loginSubstring in the login property navigate to 
http://localhost:3000/users?loginSubstring=STRING&limit=NUM
You can either use both of the parameters, one or none at all (to return all existing users)

To GET all groups or POST a new one, navigate to
http://localhost:3000/groups

To GET all usergroups navigate to
http://localhost:3000/usergroups

To add users to a group, send POST to
http://localhost:3000/usergroups with request body like: 
{
    "groupId": GROUP1,
    "userIds": [USER1, USER2]
}


To DELETE, UPDATE or GET a user by id, navigate to 
http://localhost:3000/users/ID

To DELETE, UPDATE AND GET a group by id, navigate to 
http://localhost:3000/groups/ID

To UPDATE a user or a group, pass the object with updated values.
**FIND VALIDATION ERRORS IN CONSOLE