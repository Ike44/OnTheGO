let autocompleteService = null;

export function initGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
        autocompleteService = new window.google.maps.places.AutocompleteService();
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
                    description: prediction.description
                })).slice(0, 5);

                resolve(suggestions);
            }
        );
    });
}