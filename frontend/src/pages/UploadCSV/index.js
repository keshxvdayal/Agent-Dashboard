import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import axios from 'axios';

function UploadCSV() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const fileExt = selectedFile.name.split('.').pop().toLowerCase();
            if (!['csv', 'xls', 'xlsx'].includes(fileExt)) {
                alert('Only CSV, XLS, and XLSX files are allowed!');
                setFile(null);
                e.target.value = '';
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://backend-api-sooty-theta.vercel.app/upload/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            handleSuccess(response.data.message);
            navigate('/agents');
        } catch (error) {
            handleError(error.response?.data?.message || 'Upload failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">Upload CSV</label>
                    <input type="file" name="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default UploadCSV;
