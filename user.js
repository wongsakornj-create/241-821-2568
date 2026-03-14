//1.load user ทั้งหมดจากapi/users


const BASE_URL = 'http://localhost:8000';

window.onload =async () => {

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
console.log(response.data);
}


}

//2.นำข้อมูลuserที่ได้มาแสดงในหน้า user.html


const userDOM = document.getElementById('user');
let htmlData = '<div>'
for (let i = 0; i < response.data.length; i++) {
    let user = response.data[i];
    $(user.id); $(user.firstname); $(user.lastname)
    <a href="index.html?id=${user.id}"><button>Edit</button></a>
    <button class ='delete' data-id='${user.id}' >Delete</button>
}


htmlData += '</div>'
userDOM.innerHTML = htmlData;

const delete = document.getElementByClassName('delete');
for (let i = 0; i < delete.length; i++) {
    deleteDOMs[i].addEventListener('click', async (event) => {
        const id =event.target.dataset.id;
        try{
            await axios.delete(`${BASE_URL}/users/${id}`);
            loadData()
        }catch(error) {
            console.error(error);

        }

    })
}