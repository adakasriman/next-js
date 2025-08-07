// src/lib/api/uploadExcel.ts
import axios from 'axios';

export const uploadExcelFile = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Upload failed');
  }
};
