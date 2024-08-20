import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function Title(props: Props) {
  return (
    <div
      className={`inline-block font-semibold text-24 relative pl-12 h-fit-content
      before:content-[''] before:w-6 before:h-full before:bg-secondary-800 before:absolute
      before:left-[0px]
      before:rounded-12
      `}
    >
      {props.children}
    </div>
  );
}
