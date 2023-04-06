export const ErrorDialog = ({ message }) => {
  return (
    <>
      <div className="flex items-center justify-start px-3 py-3 bg-gray-900 my-3 rounded-lg">
        <div className="text-sm">
          <span className="text-red-600 capitalize">{message}</span>
        </div>
      </div>
    </>
  );
};
