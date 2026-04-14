import { useAuth } from '../providers/AuthProvider';

export const useUploadService = () => {
  const { apiFetch } = useAuth();

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiFetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let message = 'Upload failed';
      try {
        const payload = await response.json();
        if (payload?.message) {
          message = payload.message;
        }
      } catch {
        // ignore parse errors
      }
      throw new Error(message);
    }

    const result = await response.json();
    return result.url;
  };

  return { uploadFile };
};
