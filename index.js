const BASE_URL = 'http://localhost:8000';

let mode ='create';
let selectedID = '';

window.onload =async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id) {
        mode = 'Edit';
        selectedID = id;

        //1.ข้อมูลuserที่ต้องการแก้ไข
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const user = response.data;
             let firstNameDOM =document.querySelector('input[name="firstname"]');
             let lastNameDOM =document.querySelector('input[name="lastname"]');
    let ageDOM =document.querySelector('input[name="age"]');
    let descriptionDOM =document.querySelector('textarea[name="description"]');

    firstNameDOM.value = user.firstName;
    lastNameDOM.value = user.lastName;
    ageDOM.value = user.age;
    descriptionDOM.value = user.description;

    let interestsDOM =document.querySelectorAll('input[name="interests"]:') || {};
    let genderDOM =document.querySelectorALL('input[name="gender"]:') || {};
    for (let i = 0; i < interestsDOM.length; i++) {
        if(genderDOM[i].checked ===user.gender){
            genderDOM[i].checked = true;
        }
    }
    for (let i = 0; i < interestsDOM.length; i++) {
        if(user.interests.includes(interestsDOM[i].value) ){
            interestsDOM[i].checked = true;
        }
    }
    } catch (error) {
        console.log('error message', error.message);
       

        }


        //2.นำข้อมูลที่ได้แสดงใน form เพื่อให้ผู้ใช้แก้ไข
    }

}
    


const validateData=(userData) => {
    let errors =[];
   if (!userData.firstName){
        errors.push('กรุณากรอกชื่อ');
   } 
    if (!userData.lastName){
        errors.push('กรุณากรอกนามสกุล');
   }
    if (!userData.age){
        errors.push('กรุณากรอกอายุ');
   }
    if (!userData.gender){
        errors.push('กรุณาเลือกเพศ');
   }
    if (!userData.interests){
        errors.push('กรุณาเลือกงานอดิเรก');
   }
    if (!userData.description){
        errors.push('กรุณากรอกคำอธิบาย');
   }
    return errors;
};

const submitdata = async () => {
    let firstNameDOM =document.querySelector('input[name="firstname"]');
    let lastNameDOM =document.querySelector('input[name="lastname"]');
    let ageDOM =document.querySelector('input[name="age"]');
    let genderDOM =document.querySelector('input[name="gender"]:checked') || {};
    let interestsDOM =document.querySelectorAll('input[name="interests"]:checked') || {};
    let descriptionDOM =document.querySelector('textarea[name="description"]');

    let userData = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: parseInt(ageDOM.value),
        gender: genderDOM ? genderDOM.value : null,
        interests: Array.from(interestsDOM).map(checkbox => checkbox.value),
        description: descriptionDOM.value
    };



    let errors = validateData(userData);
    if (errors.length > 0) {
        //ถ้ามีerror 
        throw{
            message :"กรอกข้อมูลไม่ครบ",
           errors: errors
        }
        displayErrors(errors);
        return;
    }
    let message ='บันทึกข้อมูลสำเร็จ';


    if (mode === 'create') {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        console.log('User created:', response.data);
    } else {
        const response = await axios.put(`${BASE_URL}/users/${selectedID}`, userData);
        message = 'แก้ไขข้อมูลสำเร็จ';
        console.log('response:', response.data);
    }

    try {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        console.log('User created:', response.data);
        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';
  
    } catch (error) {
        console.log('error message',error.message);
        console.log('error,error.errors')
        console.error('Error creating user:', error);
        error.message = error.response.data.message;
        error.errors = error.response.data.errors;
    }
    let htmlData ='<div>'
    htmlData += '<div>$(error.message)</div>'
    for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>${error.errors[i]}</li>`;
    }
    htmlData += '</ul>'
    htmlData += '</div>'
    message.innerHTML = htmlData
    message.className = 'message danger';
};

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1;
let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    });
}

//path = GET /users สำหรับด get ข้อมูล users ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0]);
});

//path = POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message: 'User created successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});

// path GET /users/:id สำหรับด get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json(results[0][0]);
    }
    catch (error) {
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
})



//PUT /users/:id สำหรับแก้ไขข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id])
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
})

// DELETE /users/:id สำหรับลบ user ที่มี id ตรงกับที่ส่งมา
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', id)
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }   
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on port ${port}`);
});
