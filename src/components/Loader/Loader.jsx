export const Loader = ({ style }) => {
  return (
    <>
      <div className={`flex items-center justify-center h-screen ${style}`}>
        <div
          className="w-12 h-12 rounded-full animate-spin
                    border-x-4 border-solid border-green-500 border-t-transparent"
        ></div>
      </div>
    </>
  );
};
