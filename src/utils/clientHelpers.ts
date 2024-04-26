export async function fetchData<T>(url: string, init?: RequestInit) : Promise<{data: T, failed: false} | {data: string, failed: true}>{
    return fetch(new URL(url, process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'), init)
        .then(res => Promise.all([res.json(), Promise.resolve(res.status)]))
        .then(([data, status]) => {
            if (status === 200)
                return {data, failed: false};

            console.log('Error while fetching', status, data);

            throw new Error(data.error);
        })
        .catch(err => {

            if (err.message && typeof(err.message) === 'string')
                return {data: err.message, failed: true};

            return {data: 'Došlo je do pogreške', failed: true};
        })
}