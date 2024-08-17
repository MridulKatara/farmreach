import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

// Import your images
import defaultDp from '../assets/dp.png';
import defaultBanner from '../assets/banner.png'; // Import default banner image

const EditProfileContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
  text-align: center;
`;

const Banner = styled.div`
  background: url(${props => props.banner || defaultBanner}) no-repeat center center;
  background-size: cover;
  height: 250px; /* Adjust height as needed */
  border-radius: 8px;
  margin-bottom: -60px; 
`;

const ProfileImage = styled.div`
  width: 150px; /* Increased size */
  height: 150px; /* Increased size */
  background: url(${props => props.image || defaultDp}) no-repeat center center;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #fff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Enhanced shadow */
`;

const Button = styled.button`
  padding: 12px 24px; /* Increased padding for larger buttons */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1rem; /* Increased font size */
  transition: background-color 0.3s ease; /* Smooth transition effect */

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  input {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    max-width: 500px; /* Set a max width for inputs */
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  button[type="button"] {
    padding: 12px 24px; /* Larger button size */
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #218838;
    }
  }
`;

const EditProfile = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        profileImage: '',
        bannerImage: '',
        description: '',
        languages: '',
        education: '',
        specialization: '',
        socialMediaLinks: {
            facebook: '',
            twitter: ''
        }
    });

    useEffect(() => {
        const decodedEmail = decodeURIComponent(email);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === decodedEmail);
        if (foundUser) {
            setUser(foundUser);
        }
    }, [email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSave = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map(u => u.email === user.email ? user : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        navigate(`/user/${encodeURIComponent(user.email)}`);
    };

    return (
        <EditProfileContainer>
            <Banner banner={user.bannerImage} />
            <ProfileImage image={user.profileImage} />
            <h1>Edit Profile</h1>
            <FormContainer>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="description"
                    value={user.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="languages"
                    value={user.languages}
                    onChange={handleChange}
                    placeholder="Languages"
                />
                <input
                    type="text"
                    name="education"
                    value={user.education}
                    onChange={handleChange}
                    placeholder="Education"
                />
                <input
                    type="text"
                    name="specialization"
                    value={user.specialization}
                    onChange={handleChange}
                    placeholder="Specialization"
                />
                <input
                    type="text"
                    name="socialMediaLinks.facebook"
                    value={user.socialMediaLinks.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                />
                <input
                    type="text"
                    name="socialMediaLinks.twitter"
                    value={user.socialMediaLinks.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                />
                <button type="button" onClick={handleSave}>Save</button>
            </FormContainer>
            <Link to="/">
                <BackButton>Back to User List</BackButton>
            </Link>
        </EditProfileContainer>
    );
};

export default EditProfile;
