import React from "react";

const Confirmation = () => {
  return (
    <div className="h-[100vh] bg-primary text-fourth gap-10 flex flex-col justify-center items-center">
      <h1 className="font-bold text-[3rem]">CONGRATULATIONS</h1>
      <p>Your booking has been confirmed</p>
      <button className="bg-third p-2 rounded-full hover:bg-second hover:text-white transition-colors duration-300">
        <a href="/">Back to Homepage</a>
      </button>
    </div>
  );
};

export default Confirmation;
