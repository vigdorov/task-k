class LocalStorageAPI {
    get(key) {
        return new Promise((resolve, reject) => {
            try {
                const {data} = JSON.parse(localStorage.getItem(key) || '{}');
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    post(key, data) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, JSON.stringify({data}));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(key) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(key);
                resolve();
            } catch (error) {
                reject();
            }
        });
    }
}

const localStorageApi = new LocalStorageAPI();

export default localStorageApi;