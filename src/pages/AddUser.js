import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AddUserContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddUser = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        description: '',
        languages: '',
        education: '',
        specialization: '',
        socialMediaLinks: { facebook: '', twitter: '' },
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userDetails);
        localStorage.setItem('users', JSON.stringify(users));
        navigate('/');
    };

    return (
        <AddUserContainer>
            <h1>Add New User</h1>
            <Form onSubmit={handleAddUser}>
                <Input
                    type="text"
                    placeholder="Name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    required
                />
                <Input
                    type="text"
                    placeholder="Description"
                    value={userDetails.description}
                    onChange={(e) => setUserDetails({ ...userDetails, description: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Languages"
                    value={userDetails.languages}
                    onChange={(e) => setUserDetails({ ...userDetails, languages: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Education"
                    value={userDetails.education}
                    onChange={(e) => setUserDetails({ ...userDetails, education: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Specialization"
                    value={userDetails.specialization}
                    onChange={(e) => setUserDetails({ ...userDetails, specialization: e.target.value })}
                />
                <Input
                    type="text"
                    placeholder="Facebook Link"
                    value={userDetails.socialMediaLinks.facebook}
                    onChange={(e) => setUserDetails({ ...userDetails, socialMediaLinks: { ...userDetails.socialMediaLinks, facebook: e.target.value } })}
                />
                <Input
                    type="text"
                    placeholder="Twitter Link"
                    value={userDetails.socialMediaLinks.twitter}
                    onChange={(e) => setUserDetails({ ...userDetails, socialMediaLinks: { ...userDetails.socialMediaLinks, twitter: e.target.value } })}
                />
                <Button type="submit">Save User</Button>
            </Form>
        </AddUserContainer>
    );
};

export default AddUser;
