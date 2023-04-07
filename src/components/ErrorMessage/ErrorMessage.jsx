export const ErrorMessage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-96">
        <div role="alert" className="border border-red-500 rounded">
          <div className="bg-slate-800 text-red-500 font-bold rounded-t px-4 py-2">
            There was an error!!
          </div>
          <div className=" bg-slate-700 px-4 py-3 text-slate-100">
            <p>Something not ideal might be happening.</p>
          </div>
        </div>
      </div>
    </>
  );
};
