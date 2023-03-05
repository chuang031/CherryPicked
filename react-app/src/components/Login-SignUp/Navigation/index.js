import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import cherry from '../../../images/cherry.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function Navigation({ isLoaded }){
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
   
	return (
		<div className='main-container'>
			<div className='nav-container'>
			
			<div className='left-side'>
				<NavLink className='home' exact to="/"><img className = 'cherryhome' src={cherry}></img></NavLink>
			
			</div>

			
			<div className='right-side'>
		
		{!sessionUser && (
			<>
			  <OpenModalButton
				buttonText="Log In"
		
				modalComponent={<LoginFormModal />}
			  />
  
			  <OpenModalButton
				buttonText="Sign Up"
			
				modalComponent={<SignupFormModal />}
			  />
			</>
	)}


			{ sessionUser && (
				<div className='profile-container'>
					<NavLink  exact to='/profile'><img className='user-profile' src={!(sessionUser?.imageUrl) ?  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-5Ga9DOBo0Xl-QkZK8TmKUH0IOcLmn4t_wTNzOIgBQPET6MM1uk8BI7v69cQ1nBNwJs&usqp=CAU': sessionUser.imageUrl }></img></NavLink> 
					<ProfileButton className='profile' user={sessionUser} />
					
				</div>
				
			)

			
			
		}
		</div>
		</div>
		
		</div>
		
		
	);
}

export default Navigation;