import { AlertCircle, X } from "lucide-react";
import React from "react";

const AlertModal = ({ isOpen, onClose, title, message, type = "warning" }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: "text-red-400",
          title: "text-red-400",
          button: "bg-red-500/40 hover:bg-red-500/70",
        };
      case "info":
        return {
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
          icon: "text-gray-400",
          title: "text-gray-400",
          button: "bg-gray-500 hover:bg-gray-600",
        };
      default:
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          icon: "text-yellow-400",
          title: "text-yellow-400",
          button: "bg-yellow-500 hover:bg-yellow-600",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-9999 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
        <div className="bg-[#0D1922] w-full max-w-md rounded-xl border border-(--color-secondary)/50 overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <div className={`px-5 py-3.5 border-b ${styles.bg} ${styles.border}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${styles.bg} flex items-center justify-center`}
                >
                  <AlertCircle className={`w-6 h-6 ${styles.icon}`} />
                </div>
                <h2 className={`text-lg font-bold ${styles.title}`}>
                  {title || "Perhatian"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#c7c7c7]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Message */}
            <p className="text-[#c7c7c7] text-sm leading-relaxed">{message}</p>

            {/* Action Button */}
            <button
              onClick={onClose}
              className={`w-full mt-5 ${styles.button} text-white font-semibold py-3 rounded-lg transition-all duration-200`}
            >
              Mengerti
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal;
