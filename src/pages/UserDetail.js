import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import image from '../assets/banner.png'; 
import defaultDp from '../assets/dp.png';

const UserDetailContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
  text-align: center;
`;

const Banner = styled.div`
  background: url(${props => props.banner || image}) no-repeat center center;
  background-size: cover;
  height: 200px;
  border-radius: 8px;

  z-index: -1;
`;

const ProfileImage = styled.div`
  margin-top: -80px; /* Adjust as needed */
  border-radius: 50%;
  width: 170px; /* Increased size */
  height: 170px; /* Increased size */
  background: url(${props => props.image || defaultDp}) no-repeat center center;
  background-size: cover;
  border: 6px solid #fff; /* Increased border size */
  box-shadow: 0 4px 6px rgba(0,0,0,0.2); /* Increased shadow for a more pronounced effect */
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 20px 20px 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const UserDetail = () => {
    const { email } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const decodedEmail = decodeURIComponent(email);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === decodedEmail);
        setUser(foundUser);
    }, [email]);

    if (!user) return <div>Loading...</div>;

    return (
        <UserDetailContainer>
            <Banner banner={user.bannerImage} />
            <ProfileImage image={user.profileImage} />
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Description: {user.description}</p>
            <p>Languages: {user.languages}</p>
            <p>Education: {user.education}</p>
            <p>Specialization: {user.specialization}</p>
            <p>Facebook: <a href={user.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></p>
            <p>Twitter: <a href={user.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></p>
            <Link to="/user-list">
                <BackButton>Back to User List</BackButton>
            </Link>
            <Link to={`/edit/${encodeURIComponent(user.email)}`}>
                <Button>Edit Profile</Button>
            </Link>
        </UserDetailContainer>
    );
};

export default UserDetail;
