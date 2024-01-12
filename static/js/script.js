async function generatePixelArt(prompt) {
    const url = "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl";
    const token = process.env.token
    const header = {
        Authorization: `Bearer ${token}`,    };
    const body = `pixel art, ${prompt}`;

    return new Promise(async (resolve, reject) => {
        try {
            // Send request to the server
            const response = await fetch(url, {
                method: "POST",
                body: body,
                headers: header,
            });

            // Handle binary data (JPEG image)
            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);

                const imgContainer = document.getElementById("pixelArtSection");
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                imgElement.id = "pixelArtImage";
                imgElement.alt = "Generated Pixel Art";
                
                imgContainer.appendChild(imgElement);
                resolve();
            } else {
                console.error("Failed to fetch image. Status:", response.status);
                reject("Failed to fetch image");
            }
        } catch (error) {
            console.error("Error:", error);
            reject(error);
        }
    });
}

// Example usage
const promptInput = document.getElementById("promptInput");
const generateButton = document.getElementById("generateButton");

generateButton.addEventListener("click", async () => {
    const imgContainer = document.getElementById("pixelArtSection");

    // Append the loading spinner
    imgContainer.innerHTML =
        '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

    const prompt = promptInput.value;

    try {
        // Use await to ensure the spinner is displayed while waiting for the image
        await generatePixelArt(prompt);
    } catch (error) {
        // Handle errors if needed
        console.error("Error:", error);
    } finally {
        // Remove the spinner after fetch or in case of an error
        const loadingSpinner = document.querySelector(".lds-ring");
        if (loadingSpinner) {
            imgContainer.removeChild(loadingSpinner);
        }
    }
});