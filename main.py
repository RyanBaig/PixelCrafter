import streamlit as st
import requests
from dotenv import load_dotenv
import os

# Setup
if not os.path.exists(os.path.join([os.path.abspath("."), ".env"])):
    os.makedirs(os.path.join([os.path.abspath("."), ".env"]))

from io import BytesIO

load_dotenv()

st.title("PixelCrafter by Ryan")
prompt = st.text_area("Prompt:", height=200)


if st.button("Generate Pixel Art"):
    api_url = "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl"
    token = os.getenv("PC_TOKEN")

    headers = {
        "Authorization": f"Bearer {token}"
    }

    body = f"pixel art, {prompt}"
    response = requests.post(api_url, headers=headers, data=body)

    # Check if request was successful
    if response.status_code == 200:
        # Convert binary data to image
        image_data = BytesIO(response.content)
        st.image(image_data, caption="Generated Pixel Art", use_column_width=True)
    else:
        st.error("Failed to generate image. Please try again: " + response.text + "And Status: " + str(response.status_code) + "token: " + token)