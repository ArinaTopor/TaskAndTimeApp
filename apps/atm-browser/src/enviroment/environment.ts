type FireConfig = {
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };
    production: boolean;
};

export const environment: FireConfig = {
    firebase: {
        apiKey: 'AIzaSyAgAlk3tyWHmm2J0eXaGAGlyJlbPvtFD9Q',
        authDomain: 'timeandtaskapp.firebaseapp.com',
        databaseURL: 'https://timeandtaskapp-default-rtdb.firebaseio.com',
        projectId: 'timeandtaskapp',
        storageBucket: 'timeandtaskapp.appspot.com',
        messagingSenderId: '958256097591',
        appId: '1:958256097591:web:2e7391740a7db1ea2d12b2',
    },
    production: false,
};
