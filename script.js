document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const campName = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const medicalAttention = document.getElementById('medicalAttention').checked;
    const lackWater = document.getElementById('lackWater').checked;
    const lackClothes = document.getElementById('lackClothes').checked;

    // Get existing camps from localStorage
    const camps = JSON.parse(localStorage.getItem('camps')) || [];
    
    // Add new camp
    camps.push({ 
        name: campName, 
        location: location,
        adults: adults,
        children: children,
        medicalAttention: medicalAttention,
        lackWater: lackWater,
        lackClothes: lackClothes
    });
    
    // Save back to localStorage
    localStorage.setItem('camps', JSON.stringify(camps));

    // Reset the form
    document.getElementById('uploadForm').reset();

    // Call function to display camps
    displayCamps();
});

function displayCamps() {
    const campsContainer = document.getElementById('campsContainer');
    campsContainer.innerHTML = ''; // Clear existing camps

    // Retrieve camps from localStorage
    const camps = JSON.parse(localStorage.getItem('camps')) || [];

    // Display each camp
    camps.forEach((camp) => {
        const campBox = document.createElement('div');
        campBox.className = 'camp-box';

        // Change background and text color based on medical attention
        if (camp.medicalAttention) {
            campBox.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; // Light red background
            campBox.style.borderColor = 'red'; // Red border
            campBox.style.color = 'black'; // Red text
        } else {
            campBox.style.backgroundColor = '#ffffff'; // Default background color
            campBox.style.borderColor = '#007bff'; // Default blue border
            campBox.style.color = 'black'; // Default text color
        }

        // Create an anchor tag that links to Google
        const campLink = document.createElement('a');
        const sanitizedCampName = camp.name.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
        campLink.href = `${sanitizedCampName}.html`;
        campLink.target = '_blank'; // Open in a new tab
        campLink.style.textDecoration = 'none'; // Remove underline
        campLink.style.color = 'inherit'; // Use inherited text color

        // Update innerHTML to include new information
        campLink.innerHTML = `
            <div class="camp-name">${camp.name}</div>
            <div class="camp-number">${camp.number}</div>
            <div class="camp-description">Location: ${camp.location}</div>
            <div>Adults: ${camp.adults}</div>
            <div>Children: ${camp.children}</div>
            <div>Needs Medical Attention: ${camp.medicalAttention ? 'Yes' : 'No'}</div>
            <div>Lacks Drinking Water: ${camp.lackWater ? 'Yes' : 'No'}</div>
            <div>Lacks Clothes and Sanitary Items: ${camp.lackClothes ? 'Yes' : 'No'}</div>
        `;
        
        campBox.appendChild(campLink);
        campsContainer.appendChild(campBox);
    });

    if (camps.length === 0) {
        campsContainer.innerHTML = '<p class="text-center">No camps available.</p>';
    }
}

// Call displayCamps on initial load to show any existing camps
displayCamps();


