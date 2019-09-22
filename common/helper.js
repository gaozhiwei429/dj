const now = Date.now || function () {  
    return new Date().getTime();  
};
const BASE_URL = '/';
const isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};  

export default {
    now,  
    isArray  
}