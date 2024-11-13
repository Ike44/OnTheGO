import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Button, Image } from '@chakra-ui/react';
import { CheckIcon, TimeIcon, AddIcon } from '@chakra-ui/icons';


const MyPlanner = () => {

    const [trips, setTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);
    const [tripDetails, setTripDetails] = useState({
        title: '',
        country: '',
        location: '',
        startDate: '',
        endDate: '',
        activities: [{ name: '', notes: '' }]
    });
    const [viewIndex, setViewIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompletedTrip, setIsCompletedTrip] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('plannedTrips');

    const imageHeight = 350; // Image Height


    useEffect(() => {
        const storedTrips = localStorage.getItem('trips');
        const storedCompletedTrips = localStorage.getItem('completedTrips');
        if (storedTrips) {
            setTrips(JSON.parse(storedTrips));
            if (storedCompletedTrips) setCompletedTrips(JSON.parse(storedCompletedTrips));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('trips', JSON.stringify(trips));
        localStorage.setItem('completedTrips', JSON.stringify(completedTrips));
    }, [trips, completedTrips]);

    const handleAddActivity = () => {
        setTripDetails(prev => ({
            ...prev,
            activities: [...prev.activities, { name: '', notes: '' }]
        }));
    };

    const handleRemoveActivity = (index) => {
        setTripDetails(prev => ({
            ...prev,
            activities: prev.activities.filter((_, i) => i !== index)
        }));
    };

    const handleActivityChange = (index, field, value) => {
        setTripDetails(prev => {
            const updatedActivities = [...prev.activities];
            updatedActivities[index][field] = value;
            return { ...prev, activities: updatedActivities };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (viewIndex === null) {
            setTrips([...trips, tripDetails]);
        } else {
            const updatedTrips = trips.map((trip, i) => (i === viewIndex ? tripDetails : trip));
            setTrips(updatedTrips);
            setViewIndex(null);
        }
        setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
        setIsModalOpen(false);
    };

    const handleViewTrip = (index, isCompleted = false) => {
        const selectedTrip = isCompleted ? completedTrips[index] : trips[index];
        setTripDetails(selectedTrip);
        setViewIndex(index);
        setIsModalOpen(true);
        setIsCompletedTrip(isCompleted);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setViewIndex(null);
        setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
    };

    const handleToggleTripStatus = () => {
        if (isCompletedTrip) {
            const updatedCompletedTrips = completedTrips.filter((_, i) => i !== viewIndex);
            setCompletedTrips(updatedCompletedTrips);
            setTrips([...trips, tripDetails]);
        } else {
            const updatedTrips = trips.filter((_, i) => i !== viewIndex);
            setTrips(updatedTrips);
            setCompletedTrips([...completedTrips, tripDetails]);
        }
        setIsCompletedTrip(!isCompletedTrip);
        setIsModalOpen(false);
    };

    const handleOpenNewTripModal = () => {
        setIsModalOpen(true);
        setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
    };

    const handleDelete = () => {
        if (viewIndex !== null) {
            if (isCompletedTrip) {
                setCompletedTrips(completedTrips.filter((_, i) => i !== viewIndex));
            } else {
                setTrips(trips.filter((_, i) => i !== viewIndex));
            }
        }
        setViewIndex(null);
        setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
        setIsModalOpen(false);
    };

    const handleOpenEditPopup = () => { 
        setIsEditPopupOpen(true); 
        setTripDetails(trips[viewIndex]);
    }; 

    const handleCloseEditPopup = () => { 
        setIsEditPopupOpen(false); 
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedTrips = trips.map((trip, i) => (i === viewIndex ? tripDetails : trip));
        setTrips(updatedTrips);
        setIsEditPopupOpen(false);
    };

    return (
        <div style={styles.mainContainer}>
            <div style={styles.sidebarContainer}>
        <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>My Planner</h3>
        <ul>
    <li onClick={() => setActiveTab('plannedTrips')} style={activeTab === 'plannedTrips' ? styles.activeTab : {}}>
        <TimeIcon style={{ marginRight: '8px' }} /> {/* Added icon */}
        Planned Trips
    </li>
    <li onClick={() => setActiveTab('completedTrips')} style={activeTab === 'completedTrips' ? styles.activeTab : {}}>
        <CheckIcon style={{ marginRight: '8px' }} /> {/* Added icon */}
        Completed Trips
    </li>
    <li onClick={() => { setActiveTab('createNewTrip'); handleOpenNewTripModal(); }} 
        style={activeTab === 'createNewTrip' ? styles.activeTab : {}}>
        <AddIcon style={{ marginRight: '8px' }} /> {/* Added icon */}
        Create New Trip
    </li>
  </ul>
</div>

            <div style={styles.content}>
                {activeTab === 'plannedTrips' && (
                    <div style={styles.listContainer}>
                    <h2 style={{ 
                        fontWeight: 700, fontSize: '40px', 
                        color: 'black',
                        textShadow: '4px 1px 2px grey' }}>Planned Trips</h2>
                        {trips.length === 0 ? (
                            <p>No trips planned.</p>
                        ) : (
                            trips.map((trip, index) => (
                                <p key={index} style={styles.tripName} onClick={() => handleViewTrip(index)}>
                                    {trip.country}
                                </p>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'completedTrips' && (
                    <div style={styles.listContainer}>
                        <h2 style={{ 
                            fontWeight: 700, 
                            fontSize: '40px', color: 'black', textShadow: '4px 1px 2px grey' }}>Completed Trips</h2>
                        {completedTrips.length === 0 ? (
                            <p>No trips completed.</p>
                        ) : (
                            completedTrips.map((trip, index) => (
                                <p key={index} style={styles.tripName} onClick={() => handleViewTrip(index, true)}>
                                    {trip.country}
                                </p>
                            ))
                        )}
                    </div>
                )}
            </div>
            </div>

            <div className="mainContent" style={styles.mainContent}>
            {/* Image should be placed above the footer */}
            <Box w="100%" display="flex" justifyContent="center" style={{ position: 'relative', marginBottom: '10px' }}>
                <Image 
                    src="/planner.jpg" 
                    alt="Planner Image" 
                    width="80%"
                    height={`${imageHeight}px`}
                    objectFit="cover"
                    style={{ marginLeft: 'auto', marginRight: '0', marginTop: '-350px', opacity: 0.8, }} 
                />
            </Box>
        </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
                <ModalOverlay bg="blackAlpha.800" />
                <ModalContent maxW="600px" p={5}>
                    <ModalCloseButton />
                    <ModalBody>
                        {viewIndex !== null ? (
                            <Box position="relative">
                                <CheckIcon
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        color: isCompletedTrip ? 'green' : 'grey',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleToggleTripStatus}
                                />
                                <h2 style={styles.tripViewHeader}>Trip View</h2>
                                <p><strong>Title:</strong> {tripDetails.title}</p>
                                <p><strong>Country:</strong> {tripDetails.country}</p>
                                <p><strong>Location:</strong> {tripDetails.location}</p>
                                <p><strong>Dates:</strong> {tripDetails.startDate} - {tripDetails.endDate}</p>
                                {tripDetails.activities.map((activity, i) => (
                                    <div key={i}>
                                        <p><strong>Activity:</strong> {activity.name}</p>
                                        <p><strong>Notes:</strong> {activity.notes}</p>
                                    </div>
                                ))}
                                <div style={styles.buttonContainer}>
                                    <button onClick={handleOpenEditPopup} style={styles.editButton}>Edit</button>
                                    <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
                                </div>
                            </Box>
                        ) : (
                            <form onSubmit={handleSubmit} style={styles.form}>
                                {/* Form fields */}
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={tripDetails.title}
                                    onChange={(e) => setTripDetails({ ...tripDetails, title: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={tripDetails.country}
                                    onChange={(e) => setTripDetails({ ...tripDetails, country: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={tripDetails.location}
                                    onChange={(e) => setTripDetails({ ...tripDetails, location: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <input
        type="date"
        placeholder="Start Date"
        value={tripDetails.startDate}
        onChange={(e) => setTripDetails({ ...tripDetails, startDate: e.target.value })}
        required
        style={styles.input}
    />
    <input
        type="date"
        placeholder="End Date"
        value={tripDetails.endDate}
        onChange={(e) => setTripDetails({ ...tripDetails, endDate: e.target.value })}
        required
        style={styles.input}
    />

    <h4>Activities</h4>
    {tripDetails.activities.map((activity, index) => (
        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', width: '100%' }}>
            <input
                type="text"
                placeholder="Activity Name"
                value={activity.name}
                onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                style={styles.input}
            />
            <textarea
                placeholder="Notes"
                value={activity.notes}
                onChange={(e) => handleActivityChange(index, 'notes', e.target.value)}
                style={styles.input}
            />
            {tripDetails.activities.length > 1 && (
                <button type="button" onClick={() => handleRemoveActivity(index)} style={styles.removeButton}>
                    Remove
                </button>
            )}
        </div>
    ))}
    <button type="button" onClick={handleAddActivity} style={styles.addButton}>
        Add Activity
    </button>

                                {/* ... */}
                                <Button type="submit">Save Trip</Button>
                            </form>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            {isEditPopupOpen && (
    <Modal isOpen={isEditPopupOpen} onClose={handleCloseEditPopup} isCentered>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent maxW="600px" p={5}>
            <ModalCloseButton />
            <ModalBody>
                <h2 style={styles.tripViewHeader}>Edit Trip</h2>
                <form onSubmit={handleEditSubmit} style={styles.form}>
                    {/* Add the same fields as the trip form for editing */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={tripDetails.title}
                        onChange={(e) => setTripDetails({ ...tripDetails, title: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={tripDetails.country}
                        onChange={(e) => setTripDetails({ ...tripDetails, country: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={tripDetails.location}
                        onChange={(e) => setTripDetails({ ...tripDetails, location: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <input
                        type="date"
                        placeholder="Start Date"
                        value={tripDetails.startDate}
                        onChange={(e) => setTripDetails({ ...tripDetails, startDate: e.target.value })}
                        required
                        style={styles.input}
                    />
                    <input
                        type="date"
                        placeholder="End Date"
                        value={tripDetails.endDate}
                        onChange={(e) => setTripDetails({ ...tripDetails, endDate: e.target.value })}
                        required
                        style={styles.input}
                    />

                    <h4>Activities</h4>
                    {tripDetails.activities.map((activity, index) => (
                        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                            <input
                                type="text"
                                placeholder="Activity Name"
                                value={activity.name}
                                onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                                style={styles.input}
                            />
                            <textarea
                                placeholder="Notes"
                                value={activity.notes}
                                onChange={(e) => handleActivityChange(index, 'notes', e.target.value)}
                                style={styles.input}
                            />
                            {tripDetails.activities.length > 1 && (
                                <button type="button" onClick={() => handleRemoveActivity(index)} style={styles.removeButton}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddActivity} style={styles.addButton}>
                        Add Activity
                    </button>

                    <Button type="submit">Update Trip</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

// CSS styles
const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    sidebarContainer: {
        display: 'flex',
        flexDirection: 'row', 
        width: '100%',
    },
    sidebar: {
        marginTop:'70px', 
        width: '20%',
        minWidth: '200px', 
        background: 'rgba(179, 179, 179, 0.8)',
        padding: '10px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        textAlign: 'center',
        minHeight: 'calc(100vh - 70px)',
        overflowY: 'auto', 
    },
    sidebarTitle: {
        fontSize: '18px',
        marginBottom: '15px',
    },
    activeTab: {
        background: '#e0e0e0',
        padding: '8px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    content: {
        marginTop:'70px', 
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
    },
    listContainer: {
        marginBottom: '20px',
    },
    tripName: {
        cursor: 'pointer',
        padding: '5px 0',
        fontSize: '30px',
    },
    // newTripButton: {
    //     // background: '#4caf50',
    //     color: 'white',
    //     padding: '8px',
    //     textAlign: 'center',
    //     cursor: 'pointer',
    //     marginTop: '10px',
    // },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 0',
        padding: '8px',
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    editButton: {
        background: '#2196F3',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        cursor: 'pointer',
    },
    deleteButton: {
        background: '#f44336',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        cursor: 'pointer',
    },
    tripViewHeader: {
        textAlign: 'center',
        fontSize: '28px', 
        fontWeight: 'bold',
         marginBottom: '12px'
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default MyPlanner;
