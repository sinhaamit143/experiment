# user-nodejs
documenttaion of this api

//--To get all users at a time follow this step

step 1 :- for geting all usrs information
          http ://localhost:3000/user (use this url to get all users)
          type : GET

step 2 :- for posting or saving or creating an user data 
          http ://localhost:3000/user (u can post or save userdata here)
          type :- POST
          
          use form type for save this data in json format 
          for example
          {
            "name" : "amit",
            "address" : "fhjkhf",
            "productImage" : "fd.jpg"
          }
          
step 3 :- for getting individual user data information
          http ://localhost:3000/user/(userid)
          type : GET
          
step 4 :- for updating the user data
          http ://localhost:3000/user/(userid)
          type : PATCH
          
step 5 :- for deleting the user data
          http ://localhost:3000/user/(userid)
          type : DELETE
"# ProductCart" 
