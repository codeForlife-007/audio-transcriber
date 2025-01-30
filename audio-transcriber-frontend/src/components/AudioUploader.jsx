import { useState } from "react";
import axios from 'axios';

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            // API call
            const response = await axios.post('http://localhost:8080/api/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setTranscription(response.data.response);
        } catch (error) {
            console.error("Error transcribing audio", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Audio to Text Transcriber</h1>
            <div className="file-input">
                <input type="file" accept="audio/*" onChange={handleFileChange}/>
            </div>
            <button className="upload-button" onClick={handleUpload}>Upload and Transcribe</button>
            <div className="transcription-result">
                <h2>Transcription Result</h2>
                <p>
                    {loading && <h3>loading...</h3>}
                    {transcription}
                </p>
            </div>
        </div>
    );
}

export default AudioUploader;