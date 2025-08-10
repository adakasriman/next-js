'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useCreateUserMutation } from '@/features/users/usersApi';

export default function BulkUploadModal() {
    const [createUser] = useCreateUserMutation();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setMessage('');
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setFile(null);
      return;
    }

    const validExtensions = ['xlsx', 'xls', 'csv'];
    const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!fileExt || !validExtensions.includes(fileExt)) {
      setError('Invalid file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res: any = await createUser(formData);
      if (res.error) {
        setError(res.error.data.message || 'Failed to upload file.');
      }
    } catch (error: any) {
      setError(error.response.data.message || 'Error uploading file.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bulk Upload</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-semibold">
          Bulk Upload Properties
        </DialogTitle>
        <DialogDescription className="mb-4">
          Upload an Excel (.xlsx, .xls) or CSV (.csv) file to bulk import properties.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full"
          />
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  );
}
