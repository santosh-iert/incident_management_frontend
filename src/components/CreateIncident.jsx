import React, { useState } from 'react';
import axios from 'axios';

// Incident Creation Component
const CreateIncident = () => {
    const [formData, setFormData] = useState({ details: '', priority: 'Medium' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/incidents/create/', formData, {
                headers: { Authorization: `Token ${token}` },
            });
            setMessage('Incident created successfully!');
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
    };

    return (
        <div>
            <h2>Create Incident</h2>
            <form onSubmit={handleSubmit}>
                <textarea name="details" placeholder="Incident Details" onChange={handleChange}></textarea>
                <select name="priority" onChange={handleChange}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};


export default CreateIncident