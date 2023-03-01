import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
    const navigateToCreateProductForm = async (e) => {
        history.push("/productform");
    };
	return (
		<div className='main-container'>
			<div className='nav-container'>
			<nav id='nav-bar'>
			<div className='left-side'>
				<NavLink className='home' exact to="/">Home</NavLink>
				<button
					className="create-button"
					onClick={navigateToCreateProductForm}
				>
					Create Product
				</button>
				</div>

				<div className='right-side'>
			{isLoaded && (
				<div className='profile-container'>
					<ProfileButton className='profile' user={sessionUser} />
				</div>
				
			)

			
			
		}
		</div>
		</nav>
		</div>
		</div>
		
	);
}

export default Navigation;