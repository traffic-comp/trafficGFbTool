const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col  items-center justify-center h-[100%]">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Loader;
