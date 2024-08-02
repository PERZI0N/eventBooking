import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="absolute w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-lg">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
