// DevTinder apis

 authrouter
- Post /signup
- Post /login
- Post /logout

profile router 
- Get /profile/view
- Patch /profile/edit
- Patch /profile/password

connectionRequestRouter
- Post /request/send/interested/:userId
- Post /request/send/ignored/:userId
- Post /request/review/accepted/:requestId
- Post /request/review/rejected/:requestId


userRouter
- Get /user/connections
- Get /user/requests/received 
- Get /user/feed - Gets you the profile of the other users of the platfrom 

Status: ignore, intrested, accepted , rejected 