import { twMerge } from "tailwind-merge";

function Box({ className, children }) {
  return (
    <div
      className={twMerge('bg-neutral-900 rounded-lg h-fit w-full', className)}
    >
      {children}
    </div>
  );
}

export default Box;
