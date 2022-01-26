import { useCallback, useState } from "react"


const UseHttpHook = () => {
	const [process, setProcess] = useState('waiting');

	const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

		setProcess('loading');

		try {
			const reaponse = await fetch(url, { method, body, headers });

			if (!reaponse.ok) {
				throw new Error(`Could not fetch ${url}, status: ${reaponse.status}`);
			}

			const data = await reaponse.json();
			return data
		} catch (e) {
			setProcess('error');
			throw e;

		}
	}, []);



	const clearError = useCallback(() => {
		setProcess('loading');

	}, [])

	return { process, request, clearError, setProcess }

}

export default UseHttpHook
