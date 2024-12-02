import React from 'react';

let autocompleteService = null;
let placesService = null;

async function fetchApiKey() {
    try {
        const response = await fetch('http://localhost:3001/api/google-api-key');
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error('Error fetching API key:', error);
        throw new Error('Failed to fetch API key');
    }
}

async function fetchClientId() {
    try {
        const response = await fetch('http://localhost:3001/api/google-client-id');
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error('Error fetching Google Client Id:', error);
        throw new Error('Failed to fetch Google Client Id');
    }
}

export async function initGoogleAuth() {
    try {
        const clientId = await fetchClientId();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (!window.google) {
                    reject(new Error('Google Identity Services failed to load'));
                    return;
                }
                resolve(window.google);
            };
            script.onerror = (error) => reject(error);
            document.head.appendChild(script);
        });
    } catch (error) {
        console.error('Error initializing Google Auth:', error);
        throw error;
    }
}

export async function handleGoogleSignIn() {
    try {
        const clientId = await fetchClientId();

        return new Promise((resolve, reject) => {
            if (!window.google) {
                reject(new Error('Google Identity Services not initialized'));
                return;
            }

            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: 'email profile',
                callback: async (response) => {
                    if (response.error) {
                        reject(response);
                        return;
                    }

                    try {
                        // Get user info from Google's userinfo endpoint
                        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: {
                                'Authorization': `Bearer ${response.access_token}`
                            }
                        });

                        if (!userInfoResponse.ok) {
                            throw new Error('Failed to get user info');
                        }

                        const userData = await userInfoResponse.json();

                        // Store in session storage
                        const userDataToStore = {
                            id: userData.sub,
                            name: userData.name,
                            email: userData.email,
                            imageUrl: userData.picture,
                            verified: true
                        };

                        sessionStorage.setItem('googleUser', JSON.stringify(userDataToStore));
                        resolve(userDataToStore);
                    } catch (error) {
                        reject(error);
                    }
                },
            });

            client.requestAccessToken();
        });
    } catch (error) {
        console.error('Error during Google Sign In:', error);
        throw error;
    }
}

export function getGoogleUserData() {
    try {
        const userData = sessionStorage.getItem('googleUser');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting Google user data:', error);
        return null;
    }
}

export function signOut() {
    return new Promise((resolve) => {
        sessionStorage.removeItem('googleUser');
        if (window.google?.accounts?.oauth2) {
            window.google.accounts.id.disableAutoSelect();
            resolve();
        } else {
            resolve();
        }
    });
}

export async function initGoogleMapsAPI() {
    const apiKey = await fetchApiKey();
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
        autocompleteService = new window.google.maps.places.AutocompleteService();
        placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
    };
    document.head.appendChild(script);
}

export function getPlaceSuggestions(query) {
    return new Promise((resolve, reject) => {
        if (!autocompleteService) {
            reject(new Error('Google Maps API not loaded'));
            return;
        }

        autocompleteService.getPlacePredictions(
            { input: query, types: [] },
            (predictions, status) => {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                    reject(new Error('Failed to fetch suggestions'));
                    return;
                }
                const suggestions = predictions.map(prediction => ({
                    description: prediction.description,
                    place_id: prediction.place_id
                })).slice(0, 5);

                resolve(suggestions);
            }
        );
    });
}

export function getPlaceDetails(placeId) {
    return new Promise((resolve, reject) => {
        if (!placesService) {
            reject(new Error('Google Maps API not loaded'));
            return;
        }

        placesService.getDetails({ placeId }, (place, status) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                reject(new Error('Failed to fetch place details'));
                return;
            }
            resolve(place);
        });
    });
}
