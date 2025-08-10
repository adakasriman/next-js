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
import { useCreatePropertyMutation } from '@/features/properties/propertiesApi';
import toast from "react-hot-toast";

export default function BulkUploadModal() {
  const [createProperty] = useCreatePropertyMutation();
  const [isOpen, setIsOpen] = useState(false);
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

      const result: any = await createProperty(formData);
      if (result.data) {
        setFile(null);
        toast.success("Excel submitted successfully");
        handleDialogClose();

        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError('Failed to upload file.');
      }
    } catch (error: any) {
      setError('Error uploading file.');
    }
  };

  const handleDialogClose = () => {
    setFile(null);
    setError?.('');
    setIsOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        handleDialogClose();
      }
    }}>
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
