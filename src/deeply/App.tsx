import './App.css';

const getMobileOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
};

const goToAppOrFallback = (appUri: string, fallbackUrl: string) => {
    setTimeout(function () {
        window.location.href = fallbackUrl;
        //this is a fallback if the app is not installed. Could direct to an app store or a website telling user how to get app
    }, 100);
    window.location.href = appUri;
};

const goToInstagramProfile = (instagramProfile: string) => {
    const navigatorType = getMobileOperatingSystem();
    if (navigatorType === "Android") {
        goToAppOrFallback(`intent://www.instagram.com/${instagramProfile}#Intent;package=com.instagram.android;scheme=https;end`, `https://www.instagram.com/${instagramProfile}/`);
    } else {
        goToAppOrFallback(`instagram://user?username=${instagramProfile}`, `https://www.instagram.com/${instagramProfile}/`);
    }
};

function App() {
    const { pathname } = window.location;
    const parts = pathname.split('/');

    let failsafe = <>Invalid url</>;

    if (parts.length >= 4) {
        const [, service, type, query] = parts;
        if (service === "instagram" && type === "profile" && query.length > 0) {
            goToInstagramProfile(query);

            // eslint-disable-next-line
            failsafe = <a href="#" onClick={() => { goToInstagramProfile(query) }}>Click here if your browser does not automatically redirect you</a>;
        }
    }

    return (
        <div className="App">
            Redirecting...
            <br />
            {failsafe}
        </div>
    );
}

export default App;
