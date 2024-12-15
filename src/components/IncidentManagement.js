import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/IncidentManagement.css';
import { useNavigate } from 'react-router-dom';

const IncidentManagement = () => {
    const [incidents, setIncidents] = useState([]);
    const header = {
        'authorization': 'Token ' + localStorage.getItem('user_token'),
        'content-type': 'application/json',
    }
    const [newIncident, setNewIncident] = useState({
        details: '',
        priority: 'MEDIUM',
        status: 'OPEN'
    });
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/incident/list/', {headers: header});
            setIncidents(response.data.data);
        } catch (error) {
            console.error('Failed to fetch incidents', error);
        }
    };

    const createIncident = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/incident/create/', newIncident, {headers: header});
            fetchIncidents();
            setNewIncident({
                entity_type: 'ENTERPRISE',
                details: '',
                priority: 'MEDIUM',
                status: 'OPEN'
            });
        } catch (error) {
            console.error('Failed to create incident', error);
        }
    };

    const updateIncident = async (incidentId, updatedData) => {
        try {
            await axios.patch(`http://localhost:8000/incident/update/${incidentId}/`, updatedData, {headers: header});
            fetchIncidents();
        } catch (error) {
            console.error('Failed to update incident', error);
        }
    };

    const searchIncident = async () => {
        if (!searchId) {
            fetchIncidents();
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8000/incident/detail/${searchId}/`, {headers: header});
            setIncidents([response.data.data]);
        } catch (error) {
            console.error('Failed to search incident', error);
            // Optionally, reset to all incidents or show an error message
            fetchIncidents();
        }
    };

    const handleLogout = async () => {
        console.log("Header before logout:", header);
        try {
            const response = await axios.post(`http://localhost:8000/user/logout/`, {}, {headers: header});
            // navigate('/login');
            localStorage.clear()
            window.location.href ='/login'
        } catch (error) {
            console.error('Error in logout', error);
            // Optionally, reset to all incidents or show an error message
        }
    };

    return (
        <div className="incident-management-container">
            <header className="app-header">
                <h1>Incident Management System</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <div className="incident-form-container">
                <h2>Create New Incident</h2>
                <form onSubmit={createIncident} className="incident-form">
                    <textarea 
                        name="details" 
                        value={newIncident.details}
                        onChange={(e) => setNewIncident({...newIncident, details: e.target.value})}
                        placeholder="Incident Details"
                        required
                        className="incident-textarea"
                    />

                    <div className="form-row">
                        <select 
                            name="priority"
                            value={newIncident.priority}
                            onChange={(e) => setNewIncident({...newIncident, priority: e.target.value})}
                            className="priority-select"
                        >
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>
                        </select>

                        <button type="submit" className="create-btn">Create Incident</button>
                    </div>
                </form>
            </div>

            <div className="search-container">
                <input 
                    type="text" 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Search by Incident ID"
                    className="search-input"
                />
                <button onClick={searchIncident} className="search-btn">Search</button>
                <button onClick={fetchIncidents} className="reset-btn">Reset</button>
            </div>

            <div className="incidents-list">
                <h2>Your Incidents</h2>
                {incidents.map(incident => (
                    <div key={incident.incident_id} className="incident-card">
                        <div className="incident-details">
                            <p><strong>Incident ID:</strong> {incident.incident_id}</p>
                            <p><strong>Details:</strong> {incident.details}</p>
                            <p><strong>Priority:</strong> {incident.priority}</p>
                            <p><strong>Status:</strong> {incident.status}</p>
                        </div>
                        {incident.status !== 'CLOSED' && (
                            <button 
                                onClick={() => updateIncident(incident.incident_id, { status: 'CLOSED' })}
                                className="close-incident-btn"
                            >
                                Close Incident
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncidentManagement;