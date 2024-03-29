// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const EDIT_USER = 'session/EDIT_USER'

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const editUser = (users) =>{
	return{
	  type: EDIT_USER,
	  payload: users
	}
  }
const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, firstName, lastName, brandName, is_brand) => async (dispatch) => {
	
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			firstName,
			lastName,
			brandName,
			is_brand
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();

		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const editAUser = (id, userData) => async (dispatch) =>{

	const {about, imageUrl} = userData
	const formData = new FormData()
  
	formData.append("about", about)
  
	formData.append("imageUrl", imageUrl)
  
	const response = await fetch(`/api/users/${id}`,{
		method: 'PATCH',
	  
		body: formData
	})
  
  
	if(response.ok){
		const data = await response.json();
		console.log(data, 'data')
		dispatch(editUser(data))
		return data
	} else{
		const error = response.json()
		return error
	}
  }

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case EDIT_USER:
			return {user: action.payload}
		default:
			return state;
	}
}