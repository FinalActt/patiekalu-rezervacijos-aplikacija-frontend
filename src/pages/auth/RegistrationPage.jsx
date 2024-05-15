import React, { useState } from 'react';
import UserService from '../../service/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        role: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService
            console.log(formData);
            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                email: '',
                username: '', // Reset username field
                password: '',
                role: 'USER', // Reset role field to 'ADMIN'
            });
            alert('User registered successfully');
            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Username:</label> {/* Changed label to 'Username' */}
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} required /> {/* Changed name to 'username' */}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;