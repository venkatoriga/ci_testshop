// RedirectComponent.js
import React, { useEffect } from 'react';

const OrigaApps = ({ url }) => {
  useEffect(() => {
    const redirectUrl = () => {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        window.location.href = 'https://apps.apple.com/in/app/origa-market/id6476490074'; // Redirect to Apple App Store
      } else if (userAgent.includes('Android')) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.origa.serviceXL'; // Redirect to Google Play Store
      } else {
        console.error('Unsupported device');
      }
    };

    redirectUrl();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>If you are not redirected automatically, please click <a href={url}>here</a>.</p>
    </div>
  );
}

export default OrigaApps;

