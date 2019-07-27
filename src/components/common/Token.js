class Token {    
    static get_token = () => {
        return { 
            'token': localStorage.getItem('token'),
            'username': localStorage.getItem('username')
        }
    };
    static set_token = (token, username) => {
        localStorage.setItem('token', token);
		localStorage.setItem('username', username);
    };
    static remove_token = () => {
        localStorage.removeItem('token');
		localStorage.removeItem('username');
    };
}

export default Token;