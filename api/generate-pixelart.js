import fetch from "node-fetch";

async function pixelArtAPI(req, res) {
  const url = "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl";
  const token = process.env.token;

  const header = {
    Authorization: `Bearer ${token}`,
    Accept: "image/jpg, image/jpeg",
  };
  const body = `pixel art, ${req.query.prompt}`;

  try {
    // Send request to the server
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: header,
    });

    // Handle binary data (JPEG image)
    if (response.ok) {
      const imgData = await response.text();
      res.json({
        data: imgData,
      });
    } else {
      res.json({
        "Failed to fetch image. Status": response.status,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({
      Error: "Internal Server Error",
    });
  }
}

export default pixelArtAPI;
