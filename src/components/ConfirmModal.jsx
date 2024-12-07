export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={onClose} variant="outline">
              Yo'q
            </Button>
            <Button onClick={onConfirm} variant="destructive">
              Ha
            </Button>
          </div>
        </div>
      </div>
    );
  };
  