import React from "react";
import PostStatus from "./common/PostUpdate";

export default function HomeComponent({ currentUser }) {
  return (
    <div className="bg-[#f3f2ef] min-h-screen flex justify-center py-6 px-4 font-['Inter']">
      <PostStatus currentUser={currentUser} />
    </div>
  );
}
