import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultDp from '../assets/dp.png';
import placeholderImage from '../assets/create-profile.svg';

const UserListContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const UserCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImage = styled.div`
  width: 100px; /* Increased size */
  height: 100px; /* Increased size */
  background: url(${props => props.image || defaultDp}) no-repeat center center;
  background-size: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserInfo = styled.div`
  flex-grow: 1;
`;

const Button = styled.button`
  padding: 12px 20px; /* Increased padding */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem; /* Increased font size */
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoUsersMessage = styled.div`
  text-align: center;
  margin-top: 50px;

  img {
    max-width: 600px; /* Adjusted size */
    height: auto;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.5rem;
    color: #333;
  }
`;

const AddUserButton = styled(Button)`
  display: block;
  margin: 20px auto; /* Center horizontally */
  font-size: 1.2rem; /* Increased font size */
  padding: 15px 25px; /* Increased padding */
`;

const UserList = ({ users, setUsers }) => {
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, [setUsers]);

    const handleDelete = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    return (
        <UserListContainer>
            <AddUserButton>
                <Link to="/add-user" style={{ color: '#fff', textDecoration: 'none' }}>
                    Add New User
                </Link>
            </AddUserButton>
            {users.length === 0 ? (
                <NoUsersMessage>
                    <p>No profiles found. Create your profile now!</p>
                    <img src={placeholderImage} alt="Create your profile" />
                </NoUsersMessage>
            ) : (
                users.map(user => (
                    <UserCard key={user.email}>
                        <ProfileImage image={user.profileImage} />
                        <UserInfo>
                            <h2>{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Specialization: {user.specialization}</p>
                        </UserInfo>
                        <div>
                            <Link to={`/user/${encodeURIComponent(user.email)}`}>
                                <Button>View Profile</Button>
                            </Link>
                            <Button onClick={() => handleDelete(user.email)}>Delete Profile</Button>
                        </div>
                    </UserCard>
                ))
            )}
        </UserListContainer>
    );
};

export default UserList;
