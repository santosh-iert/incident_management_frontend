import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IncidentManagement = () => {
    const [incidents, setIncidents] = useState([]);
    const [newIncident, setNewIncident] = useState({
        entity_type: 'ENTERPRISE',
        details: '',
        priority: 'MEDIUM',
        status: 'OPEN'
    });

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        try {
            const response = await axios.get('/api/incidents/');
            setIncidents(response.data);
        } catch (error) {
            console.error('Failed to fetch incidents', error);
        }
    };

    const createIncident = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/incidents/', newIncident);
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
            await axios.patch(`/api/incidents/${incidentId}/`, updatedData);
            fetchIncidents();
        } catch (error) {
            console.error('Failed to update incident', error);
        }
    };

    const searchIncident = async (incidentId) => {
        try {
            const response = await axios.get(`/api/incidents/search_by_id/?incident_id=${incidentId}`);
            setIncidents([response.data]);
        } catch (error) {
            console.error('Failed to search incident', error);
        }
    };

    return (
        <div>
            <h2>Create New Incident</h2>
            <form onSubmit={createIncident}>
                <select 
                    name="entity_type" 
                    value={newIncident.entity_type}
                    onChange={(e) => setNewIncident({...newIncident, entity_type: e.target.value})}
                >
                    <option value="ENTERPRISE">Enterprise</option>
                    <option value="GOVERNMENT">Government</option>
                </select>

                <textarea 
                    name="details" 
                    value={newIncident.details}
                    onChange={(e) => setNewIncident({...newIncident, details: e.target.value})}
                    placeholder="Incident Details"
                    required
                />

                <select 
                    name="priority"
                    value={newIncident.priority}
                    onChange={(e) => setNewIncident({...newIncident, priority: e.target.value})}
                >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>

                <button type="submit">Create Incident</button>
            </form>

            <h2>Your Incidents</h2>
            {incidents.map(incident => (
                <div key={incident.incident_id}>
                    <p>Incident ID: {incident.incident_id}</p>
                    <p>Details: {incident.details}</p>
                    <p>Priority: {incident.priority}</p>
                    <p>Status: {incident.status}</p>
                    {incident.status !== 'CLOSED' && (
                        <button onClick={() => updateIncident(incident.incident_id, { status: 'CLOSED' })}>
                            Close Incident
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default IncidentManagement;