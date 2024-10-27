import { CloudUpload, Trash2 } from "lucide-react";
import React, {useState, useEffect} from "react";
import InputError from "./InputError";

const UploadImage = ({ value, handleImageChange, errorMessage, preview, setPreview }) => {
    
    const handleDelete = () => {
        setPreview(null); 
        handleImageChange({ target: { files: [] } });
    };
    return (
        <div className="relative w-32 h-32 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer flex-col">
            {preview ? (
                <div className="relative w-full h-full">
                    <img
                        src={preview}
                        alt="img"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            ) : (
                <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <CloudUpload size={36} className="text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
            )}
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
};

export default UploadImage;
