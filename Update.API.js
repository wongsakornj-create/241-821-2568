const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8000

app.use(bodyParser.json());

let users =[]
let counter = 1;


app.get('/user', (req, res) => {
    let user = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    }
    res.json(user);
});

app.post('/user', (req, res) => {
    let user = req.body
    user.id = counter++;
    users.push(user)
    res.json({
        message : 'User data received successfully',
        user : user
    });  
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateedUser = req.body;
    res.send(id)
    let selectedIndex = users.findIndex(user => user.id == id);

    res.send
});
 user[selectedIndex].name = updateedUser; || user[selectedIndex].name = updateedUser; 
 user[selectedIndex].email = updateedUser; || user[selectedIndex].age = updateedUser;    
 
 if (updateedUser.email) {
    user[selectedIndex].email = updateedUser.email;
 }
res.json({ 
    message : 'User data updated successfully',
    data:{
        user : updateedUser,
        indexUpdated : selectedIndex
    }
});

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let selectedIndex = users.findIndex(user => user.id == id);
    users.splice(selectedIndex, 1);
});

res.json({
    message : 'User data deleted successfully',
    data:{
        indexDeleted : selectedIndex
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
