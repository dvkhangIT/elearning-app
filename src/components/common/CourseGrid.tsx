import React from "react";

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 2xl:grid-cols-4 3xl:grid-cols-6 lg:gap-8 course-slider">
      {children}
    </div>
  );
};

export default CourseGrid;
