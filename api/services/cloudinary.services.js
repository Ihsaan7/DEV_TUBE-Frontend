import apiClient from "../axios.config";

// Get upload signature from backend
export const getUploadSignature = async () => {
  try {
    const response = await apiClient.get("/cloudinary/upload-signature");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Upload file directly to Cloudinary
export const uploadToCloudinary = async (file, resourceType = "auto", onProgress) => {
  try {
    // Get signature from backend
    const signatureData = await getUploadSignature();
    
    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", signatureData.timestamp);
    formData.append("signature", signatureData.signature);
    formData.append("api_key", signatureData.apiKey);
    formData.append("upload_preset", "devtube_uploads");

    // Upload directly to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/${resourceType}/upload`;
    
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};
