import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ProfilePage(){
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div>
        <div> <img src={sessionUser.imageUrl}></img></div>
        {!(sessionUser.isBrand) && (
        <h1> {sessionUser.firstName} {sessionUser.lastName}</h1>
        )}

        {sessionUser.isBrand && (
            <h1> {sessionUser.brandName} </h1>
        )}
        <div>{sessionUser.username}</div>
        <div>{sessionUser.email}</div>

        {!(sessionUser.isBrand) && (
        <div>{sessionUser.about}</div>
        )}
        </div>
    )
}

export default ProfilePage