const chatDisplay = document.querySelector('.chat-display');
const chatInputText = document.getElementById('chat-input-text');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
    const userMessage = chatInputText.value.trim();

    if (!userMessage) {
        return; // Prevent empty messages
    }

    // Create a message element for the user's input
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user-message');
    userMessageElement.textContent = userMessage;

    // Add the user message to the chat display
    chatDisplay.appendChild(userMessageElement);

    // Clear the input field
    chatInputText.value = '';

    // Scroll to the bottom of the chat display
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    // Simulate loading state by adding a temporary message
    const loadingMessageElement = document.createElement('div');
    loadingMessageElement.classList.add('chat-message', 'api-response');
    loadingMessageElement.textContent = 'Fetching data...';
    chatDisplay.appendChild(loadingMessageElement);

    try {
        // Replace with your actual API call and data processing logic
        const response = await fetch('https://porsm.free.beeceptor.com/', {
            // Add any necessary headers or options for your API call
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const apiResponseData = await response.json();

        // Create a message element for the API response
        const apiResponseElement = document.createElement('div');
        apiResponseElement.classList.add('chat-message', 'api-response');
        apiResponseElement.textContent = formatApiResponse(apiResponseData); // Adjust formatting as needed

        // Remove the loading message
        loadingMessageElement.remove();

        // Add the API response to the chat display
        chatDisplay.appendChild(apiResponseElement);

        // Scroll to the bottom again
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    } catch (error) {
        console.error('Error fetching data:', error);

        // Display an error message to the user
        const errorMessageElement = document.createElement('div');
        errorMessageElement.classList.add('chat-message', 'error-message');
        errorMessageElement.textContent = 'An error occurred while fetching data.';
        chatDisplay.appendChild(errorMessageElement);
    }
});

// Function to format the API response data (adjust as needed)
function formatApiResponse(data) {
    // Example:
    return `API response: ${JSON.stringify(data, null, 2)}`;
}
