import { useEffect } from 'react';

export default function useExternalScripts({ url }) {
    useEffect(() => {
        const script = document.createElement("script");
        
        script.src = url;
        script.async = true;
        script.defer = true;

        document.head.appendChild(script);
        
        window.initMap = () => {};

        return () => {
            document.head.removeChild(script);
        };
    }, [url]);
};