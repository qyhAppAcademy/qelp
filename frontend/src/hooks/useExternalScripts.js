import { useEffect } from 'react';

export default function useExternalScripts({ url }) {
    useEffect(() => {
        const body = document.querySelector("body");

        const script = document.createElement("script");
        script.src = url;
        script.defer = true;

        body.appendChild(script);

        return () => {
            body.removeChild(script);
        };
    }, [url]);
};