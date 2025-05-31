import React from 'react';

// Only include in development mode
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // Uncomment the line below to track all components (not just pure ones)
    // trackAllComponents: true,
    // Uncomment to exclude certain components from tracking
    // exclude: [/^(RCT|RN)/],
    // Uncomment to log more detailed information
    // logOnDifferentValues: true,
    // Uncomment to customize the output
    // onlyLogs: true,
    // titleColor: 'green',
    // diffNameColor: 'darkturquoise',
    // diffPathColor: 'hotpink',
  });
}
