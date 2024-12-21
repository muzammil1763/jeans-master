// components/Toast.tsx
import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{ zIndex: 1000 }}
    >
      <button className="absolute top-2 right-2 text-white" onClick={onClose}>
        &times;
      </button>
      {message}
    </div>
  );
};

export default Toast;
