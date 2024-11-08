// import React, { useState, useEffect } from 'react';
// import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Button } from '@chakra-ui/react';
// import { CheckIcon } from '@chakra-ui/icons';

// const MyPlanner = () => {
//     const [trips, setTrips] = useState([]);
//     const [completedTrips, setCompletedTrips] = useState([]);
//     const [tripDetails, setTripDetails] = useState({
//         title: '',
//         country: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//         activities: [{ name: '', notes: '' }]
//     });
//     const [viewIndex, setViewIndex] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isCompletedTrip, setIsCompletedTrip] = useState(false);
//     const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//     const [countries] = useState([
//         "Australia", "Brazil", "Canada", "France", "Germany", "Italy", "Japan", "Mexico", "Spain", "United Kingdom"
//     ]);


//     useEffect(() => {
//         const storedTrips = localStorage.getItem('trips');
//         const storedCompletedTrips = localStorage.getItem('completedTrips');
//         if (storedTrips) {
//             setTrips(JSON.parse(storedTrips));
//             if (storedCompletedTrips) setCompletedTrips(JSON.parse(storedCompletedTrips));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('trips', JSON.stringify(trips));
//         localStorage.setItem('completedTrips', JSON.stringify(completedTrips));
//     }, [trips, completedTrips]);

//     const handleAddActivity = () => {
//         setTripDetails(prev => ({
//             ...prev,
//             activities: [...prev.activities, { name: '', notes: '' }]
//         }));
//     };

//     const handleRemoveActivity = (index) => {
//         setTripDetails(prev => ({
//             ...prev,
//             activities: prev.activities.filter((_, i) => i !== index)
//         }));
//     };

//     const handleActivityChange = (index, field, value) => {
//         setTripDetails(prev => {
//             const updatedActivities = [...prev.activities];
//             updatedActivities[index][field] = value;
//             return { ...prev, activities: updatedActivities };
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (viewIndex === null) {
//             setTrips([...trips, tripDetails]);
//         } else {
//             const updatedTrips = trips.map((trip, i) => (i === viewIndex ? tripDetails : trip));
//             setTrips(updatedTrips);
//             setViewIndex(null);
//         }
//         setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
//         setIsModalOpen(false);
//     };

//     const handleViewTrip = (index, isCompleted = false) => {
//         const selectedTrip = isCompleted ? completedTrips[index] : trips[index];
//         setTripDetails(selectedTrip);
//         setViewIndex(index);
//         setIsModalOpen(true);
//         setIsCompletedTrip(isCompleted);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setViewIndex(null);
//         setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
//     };

//     const handleToggleTripStatus = () => {
//         if (isCompletedTrip) {
//             const updatedCompletedTrips = completedTrips.filter((_, i) => i !== viewIndex);
//             setCompletedTrips(updatedCompletedTrips);
//             setTrips([...trips, tripDetails]);
//         } else {
//             const updatedTrips = trips.filter((_, i) => i !== viewIndex);
//             setTrips(updatedTrips);
//             setCompletedTrips([...completedTrips, tripDetails]);
//         }
//         setIsCompletedTrip(!isCompletedTrip);
//         setIsModalOpen(false);
//     };

//     const handleOpenNewTripModal = () => {
//         setIsModalOpen(true);
//         setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
//     };

//     const handleDelete = () => {
//         if (viewIndex !== null) {
//             if (isCompletedTrip) {
//                 setCompletedTrips(completedTrips.filter((_, i) => i !== viewIndex));
//             } else {
//                 setTrips(trips.filter((_, i) => i !== viewIndex));
//             }
//         }
//         setViewIndex(null);
//         setTripDetails({ title: '', country: '', location: '', startDate: '', endDate: '', activities: [{ name: '', notes: '' }] });
//         setIsModalOpen(false);
//     };

//     const handleOpenEditPopup = () => { 
//         setIsEditPopupOpen(true); 
//         setTripDetails(tripDetails);
//     }; 

//     const handleCloseEditPopup = () => { 
//         setIsEditPopupOpen(false); 

//     };

//     const handleEditSubmit = (e) => {
//         e.preventDefault();
//         const updatedTrips = trips.map((trip, i) => (i === viewIndex ? tripDetails : trip));
//         setTrips(updatedTrips);
//         setIsEditPopupOpen(false);

//     }; 

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.header}>Planner</h1>

//             <div style={styles.listContainer}>
//                 <h2>Planned Trips</h2>
//                 {trips.length === 0 ? (
//                     <p>No trips planned.</p>
//                 ) : (
//                     trips.map((trip, index) => (
//                         <p key={index} style={styles.tripName} onClick={() => handleViewTrip(index)}>
//                             {trip.country}
//                         </p>
//                     ))
//                 )}
//             </div>

//             <div style={styles.listContainerRight}>
//                 <h2>Completed Trips</h2>
//                 {completedTrips.length === 0 ? (
//                     <p>No trips completed.</p>
//                 ) : (
//                     completedTrips.map((trip, index) => (
//                         <p key={index} style={styles.tripName} onClick={() => handleViewTrip(index, true)}>
//                             {trip.country}
//                         </p>
//                     ))
//                 )}
//             </div>

//             <p>
//                 Click <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleOpenNewTripModal}>here</span> to plan a new trip.
//             </p>

//             {/* Your trips and completed trips content */}

//             {/* Add this new section for countries */}
//             <div style={styles.countriesSection}>
//                 <h2>Browse Popular Countries</h2>
//                 <div style={styles.countriesList}>
//                     {countries.map((country, index) => (
//                         <div key={index} style={styles.countryItem}>
//                             <p>{country}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Modal and other sections */}

//             <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
//                 <ModalOverlay bg="blackAlpha.800" />
//                 <ModalContent maxW="600px" p={5}>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         {viewIndex !== null ? (
//                             <Box position="relative">
//                                 <CheckIcon
//                                     style={{
//                                         position: 'absolute',
//                                         top: '10px',
//                                         right: '10px',
//                                         color: isCompletedTrip ? 'green' : 'grey',
//                                         cursor: 'pointer'
//                                     }}
//                                     onClick={handleToggleTripStatus}
//                                 />
//                                 <h2 style={styles.tripViewHeader}>Trip View</h2>
//                                 <p><strong>Title:</strong> {tripDetails.title}</p>
//                                 <p><strong>Country:</strong> {tripDetails.country}</p>
//                                 <p><strong>Location:</strong> {tripDetails.location}</p>
//                                 <p><strong>Dates:</strong> {tripDetails.startDate} - {tripDetails.endDate}</p>
//                                 {tripDetails.activities.map((activity, i) => (
//                                     <div key={i}>
//                                         <p><strong>Activity:</strong> {activity.name}</p>
//                                         <p><strong>Notes:</strong> {activity.notes}</p>
//                                     </div>
//                                 ))}
//                                 <div style={styles.buttonContainer}>
//                                     <button onClick={handleOpenEditPopup} style={styles.editButton}>Edit</button>
//                                     <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
//                                 </div>
//                             </Box>
//                         ) : (
//                             <form onSubmit={handleSubmit} style={styles.form}>
//                                 <input
//                                     type="text"
//                                     placeholder="Title"
//                                     value={tripDetails.title}
//                                     onChange={(e) => setTripDetails({ ...tripDetails, title: e.target.value })}
//                                     required
//                                     style={styles.input}
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Country"
//                                     value={tripDetails.country}
//                                     onChange={(e) => setTripDetails({ ...tripDetails, country: e.target.value })}
//                                     required
//                                     style={styles.input}
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Location"
//                                     value={tripDetails.location}
//                                     onChange={(e) => setTripDetails({ ...tripDetails, location: e.target.value })}
//                                     required
//                                     style={styles.input}
//                                 />
//                                 <input
//                                     type="date"
//                                     placeholder="Start Date"
//                                     value={tripDetails.startDate}
//                                     onChange={(e) => setTripDetails({ ...tripDetails, startDate: e.target.value })}
//                                     required
//                                     style={styles.input}
//                                 />
//                                 <input
//                                     type="date"
//                                     placeholder="End Date"
//                                     value={tripDetails.endDate}
//                                     onChange={(e) => setTripDetails({ ...tripDetails, endDate: e.target.value })}
//                                     required
//                                     style={styles.input}
//                                 />
//                                 <h3>Activities</h3>
//                                 {tripDetails.activities.map((activity, index) => (
//                                     <div key={index} style={styles.activityContainer}>
//                                         <input
//                                             type="text"
//                                             placeholder="Activity"
//                                             value={activity.name}
//                                             onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
//                                             required
//                                             style={styles.activityInput}
//                                         />
//                                         <input
//                                             type="text"
//                                             placeholder="Notes"
//                                             value={activity.notes}
//                                             onChange={(e) => handleActivityChange(index, 'notes', e.target.value)}
//                                             required
//                                             style={styles.activityInput}
//                                         />
//                                         <button type="button" onClick={() => handleRemoveActivity(index)} style={styles.removeButton}>Remove</button>
//                                     </div>
//                                 ))}
//                                 <button type="button" onClick={handleAddActivity} style={styles.addButton}>Add Activity</button>
//                                 <Button colorScheme="blue" type="submit" style={styles.submitButton}>Submit</Button>
//                             </form>
//                         )}
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>
       
//             {isEditPopupOpen && (
//     <Modal isOpen={isEditPopupOpen} onClose={handleCloseEditPopup} isCentered> 
//         <ModalOverlay bg="blackAlpha.600" /> 
//         <ModalContent maxW="400px" p={4}
//        position="absolute" left="900px" top="45px"> 
//             <ModalCloseButton onClick={handleCloseEditPopup} /> 
//             <ModalBody> 
//                 <h2>Edit Trip</h2>
//                 <form onSubmit={handleEditSubmit} style={styles.form}>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={tripDetails.title}
//                         onChange={(e) => setTripDetails({ ...tripDetails, title: e.target.value })}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Country"
//                         value={tripDetails.country}
//                         onChange={(e) => setTripDetails({ ...tripDetails, country: e.target.value })}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Location"
//                         value={tripDetails.location}
//                         onChange={(e) => setTripDetails({ ...tripDetails, location: e.target.value })}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="date"
//                         placeholder="Start Date"
//                         value={tripDetails.startDate}
//                         onChange={(e) => setTripDetails({ ...tripDetails, startDate: e.target.value })}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="date"
//                         placeholder="End Date"
//                         value={tripDetails.endDate}
//                         onChange={(e) => setTripDetails({ ...tripDetails, endDate: e.target.value })}
//                         required
//                         style={styles.input}
//                     />
//                     <h3>Activities</h3>
//                     {tripDetails.activities.map((activity, index) => (
//                         <div key={index} style={styles.activityContainer}>
//                             <input
//                                 type="text"
//                                 placeholder="Activity"
//                                 value={activity.name}
//                                 onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
//                                 required
//                                 style={styles.activityInput}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Notes"
//                                 value={activity.notes}
//                                 onChange={(e) => handleActivityChange(index, 'notes', e.target.value)}
//                                 required
//                                 style={styles.activityInput}
//                             />
//                             <button type="button" onClick={() => handleRemoveActivity(index)} style={styles.removeButton}>Remove</button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={handleAddActivity} style={styles.addButton}>Add Activity</button>
//                     <Button colorScheme="blue" type="submit" style={styles.submitButton}>Save Changes</Button>
//                 </form>
//             </ModalBody>
//         </ModalContent>
//     </Modal>
// )}
//         </div>
//     );
// };

// const styles = {
//     container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', marginTop: '60px' },
//     header: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' },
//     listContainer: { width: '25%', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', alignSelf: 'flex-start' },
//     listContainerRight: { width: '25%', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', alignSelf: 'flex-end', marginTop: '-77px' },
//     viewContainer: { width: '50%', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' },
//     form: {display: 'flex', flexDirection: 'column', gap: '10px'},
//     input: { padding: '10px', border: '1px solid #ccc', borderRadius: '5px' },
//     textarea: { padding: '10px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '50px' },
//     addButton: { background: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
//     removeButton: { background: '#dc3545', color: '#fff', padding: '5px', borderRadius: '5px', cursor: 'pointer' },
//     submitButton: { background: '#007bff', color: '#fff', padding: '10px', borderRadius: '5px', cursor: 'pointer' },
//     tripName: { cursor: 'pointer', margin: '5px 0', textDecoration: 'underline' },
//     activityContainer: { display: 'flex', gap: '10px', alignItems: 'center' },
//     editButton: { backgroundColor: '#ffc107', padding: '5px 10px', borderRadius: '5px' },
//     deleteButton: { backgroundColor: '#dc3545', padding: '5px 10px', borderRadius: '5px' },
//     tripViewHeader: { textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' },
//     buttonContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' },
//     countriesSection: { width: '100%', padding: '20px', marginTop: '20px', textAlign: 'center', backgroundColor: 'white', borderRadius: '5px' },
//     countriesList: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' },
//     countryItem: { padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', width: '200px' },
// };

// export default MyPlanner;











// import React from 'react';
// import { FaHome, FaChartBar, FaBox, FaUsers } from 'react-icons/fa';

// const Sidebar = () => {
//     return (
//         <>
//             <style>{`
//                 body {
//                     margin: 0;
//                     font-family: 'Arial', sans-serif;
//                 }

//                 .sidebar {
//                     width: 250px;
//                     height: 100vh;
//                     background-color: #f8f9fa;
//                     border-right: 1px solid #ddd;
//                     padding: 20px;
//                 }

//                 .sidebar-header {
//                     display: flex;
//                     align-items: center;
//                     margin-bottom: 20px;
//                 }

//                 .logo {
//                     background-color: #000;
//                     color: #fff;
//                     padding: 10px;
//                     border-radius: 50%;
//                     font-weight: bold;
//                     margin-right: 10px;
//                 }

//                 .title {
//                     font-size: 1.2em;
//                     font-weight: bold;
//                 }

//                 .menu {
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .menu-item {
//                     display: flex;
//                     align-items: center;
//                     padding: 10px;
//                     border-radius: 8px;
//                     color: #333;
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                 }

//                 .menu-item:hover {
//                     background-color: #e0e0e0;
//                 }

//                 .menu-item.active {
//                     background-color: #007bff;
//                     color: #fff;
//                 }

//                 .menu-item .icon {
//                     margin-right: 10px;
//                 }
//             `}</style>
            
//             <div className="sidebar">
//                 <div className="sidebar-header">
//                     <span className="logo">B</span>
//                     <span className="title">Sidebar</span>
//                 </div>
//                 <div className="menu">
//                     <div className="menu-item active">
//                         <FaHome className="icon" />
//                         <span>Home</span>
//                     </div>
//                     <div className="menu-item">
//                         <FaChartBar className="icon" />
//                         <span>Dashboard</span>
//                     </div>
//                     <div className="menu-item">
//                         <FaBox className="icon" />
//                         <span>Orders</span>
//                     </div>
//                     <div className="menu-item">
//                         <FaBox className="icon" />
//                         <span>Products</span>
//                     </div>
//                     <div className="menu-item">
//                         <FaUsers className="icon" />
//                         <span>Customers</span>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Sidebar;












import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Box, Button } from '@chakra-ui/react';
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
                        <h2 style={{ fontWeight: 700, fontSize: '3xl', color: 'black', textShadow: '4px 1px 2px grey' }}>Planned Trips</h2>
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
                        <h2 style={{ fontWeight: 700, fontSize: '3xl', color: 'black', textShadow: '4px 1px 2px grey' }}>Completed Trips</h2>
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
        height: '100vh',
    },
    sidebar: {
        marginTop:'70px', 
        width: '20%',
        background: 'rgba(179, 179, 179, 0.8)',
        padding: '10px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        textAlign: 'center',
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
    },
    listContainer: {
        marginBottom: '20px',
    },
    tripName: {
        cursor: 'pointer',
        padding: '5px 0',
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
    }
};

export default MyPlanner;
