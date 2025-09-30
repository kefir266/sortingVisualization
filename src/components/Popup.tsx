export default function Popup({
  isOpen,
  title,
  closePopup,
  children,
}: {
  isOpen: boolean;
  title: string;
  closePopup: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {isOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-xl border-2 border-gray-300 bg-white p-6 shadow-lg">
            <div className="inline-block font-bold">{title}</div>
            <div
              className="absolute top-0 right-0 float-right mt-3 mr-4 inline-block cursor-pointer font-bold"
              aria-label="Close popup"
              role="button"
              tabIndex={0}
              onClick={closePopup}
            >
              X
            </div>
            <div>{children}</div>
            <button
              onClick={closePopup}
              className="mt-4 rounded-xl border-1 bg-gray-100 px-4 py-2 font-bold shadow-xl hover:bg-gray-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
