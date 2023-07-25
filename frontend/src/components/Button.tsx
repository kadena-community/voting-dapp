import {
  forwardRef,
  type PropsWithChildren,
  type ComponentPropsWithoutRef,
  type Ref,
} from "react";
import { clsx } from "clsx";

export const Button = forwardRef(
  (
    {
      children,
      ...props
    }: PropsWithChildren<ComponentPropsWithoutRef<"button">>,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed",
          props.className
        )}
      >
        {children}
      </button>
    );
  }
);
