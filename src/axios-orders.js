import axios from 'axios';

 const instance = axios.create({
     baseURL: 'https://react-burger-d91d0.firebaseio.com/'
 });

 export default instance;