import axios from 'axios';

export const loginFromApi = async(userName:HTMLFormElement,password:HTMLFormElement) => {
    try {
        const response = await axios.post(`http://localhost:3000/login`,{
            userName:userName.value,
            password:password.value
        });
        console.log('Login successful:', response.data);
    } catch (error) {
        console.error('Login failed')  
    }
}

const getAllBooksFromApi = ()=>{

}