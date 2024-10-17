import React, { useState, useEffect } from 'react';

const MyPlanner = () => {
    // State to manage trips
    const [trips, setTrips] = useState([]);
    const [tripName, setTripName] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [activities, setActivities] = useState('');
    const [notes, setNotes] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    // Load trips from local storage when the component mounts
    useEffect(() => {
        const storedTrips = localStorage.getItem('trips');
        if (storedTrips) {
            setTrips(JSON.parse(storedTrips));
        }
    }, []);

    // Save trips to local storage whenever the trips state changes
    useEffect(() => {
        localStorage.setItem('trips', JSON.stringify(trips));
    }, [trips]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTrip = { tripName, tripDate, activities, notes };

        if (editIndex !== null) {
            const updatedTrips = trips.map((trip, index) => 
                index === editIndex ? newTrip : trip
            );
            setTrips(updatedTrips);
            setEditIndex(null);
        } else {
            setTrips([...trips, newTrip]);
        }

        // Reset form fields
        setTripName('');
        setTripDate('');
        setActivities('');
        setNotes('');
    };

    // Function to handle editing a trip
    const handleEdit = (index) => {
        setTripName(trips[index].tripName);
        setTripDate(trips[index].tripDate);
        setActivities(trips[index].activities);
        setNotes(trips[index].notes);
        setEditIndex(index);
    };

    // Function to handle deleting a trip
    const handleDelete = (index) => {
        const updatedTrips = trips.filter((_, i) => i !== index);
        setTrips(updatedTrips);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Trip Planner</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Trip Name"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Activities"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    style={styles.input}
                />
                <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>
                    {editIndex !== null ? 'Update Trip' : 'Add Trip'}
                </button>
            </form>

            <div style={styles.tripList}>
                <h2>Planned Trips</h2>
                {trips.length === 0 ? (
                    <p>No trips planned.</p>
                ) : (
                    trips.map((trip, index) => (
                        <div key={index} style={styles.tripItem}>
                            <h3>{trip.tripName}</h3>
                            <p><strong>Date:</strong> {trip.tripDate}</p>
                            <p><strong>Activities:</strong> {trip.activities}</p>
                            <p><strong>Notes:</strong> {trip.notes}</p>
                            <button onClick={() => handleEdit(index)} style={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    textarea: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        resize: 'vertical',
        minHeight: '100px',
    },
    button: {
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    tripList: {
        marginTop: '20px',
        textAlign: 'left',
    },
    tripItem: {
        border: '1px solid #ccc',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '5px',
    },
    editButton: {
        marginRight: '10px',
        backgroundColor: '#ffc107',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default MyPlanner;