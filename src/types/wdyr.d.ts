import React from 'react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    whyDidYouRender?: boolean | {
      logOnDifferentValues?: boolean;
      customName?: string;
      diffNameColor?: string;
      diffPathColor?: string;
      titleColor?: string;
    };
  }
}
