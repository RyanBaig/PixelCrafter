import streamlit as st
import requests
from io import BytesIO

st.title("PixelCrafter by Ryan")
prompt = st.text_area("Prompt:", height=200)


if st.button("Generate Pixel Art"):
    with st.spinner():
        api_url = "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl"
        token = st.secrets["TOKENS"]["PC_TOKEN"]

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
            st.error(f"""
            Failed to generate image. Please try again.
            
            LOGGING:
            Response Text: {str(response.text)}
            Response Status Code: {str(response.status_code)}
            Token: {str(token[0:9])}
            """)