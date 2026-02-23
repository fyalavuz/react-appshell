import React from "react";

export const motion = new Proxy({}, {
  get: (_, tag: string) => {
    return React.forwardRef((props: any, ref: any) => {
      const { initial, animate, exit, transition, layoutId, whileHover, whileTap, ...rest } = props;
      return React.createElement(tag, { ...rest, ref });
    });
  },
});

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
