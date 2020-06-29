const axios = require('axios');



const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/api/profile/:username',(req, res) => {

    const username = req.params.username;

    axios.get('https://instagram.com/'+username+'/?__a=1')
        .then((user) => {
            const profile = user.data;
            const info = profile.graphql.user;
            
            if (info.is_private == false) {
                userId = info.id;
                status = true;
                
                res.json({
                    "status": 200, 
                    "error": null, 
                    "response": {
                        "id" : userId
                    }
                });
            } else if(info.is_private == true) {
                res.send({
                    "status": 200, 
                    "error": 'Account is private', 
                });
            }else{
                res.send({
                    "status": 200, 
                    "error": 'Account not found', 
                });
            }    

        }).catch((err) => {
            res.send({
                "status": 200, 
                "error": 'Account not found', 
            });
        });

});

app.listen(3000,() => {
    console.log('Server started on port 3000...');
});