import { useState, useEffect } from 'react';

const useGetStream = constraints => {
	const [stream, setStream] = useState(false);
	const [loading, setLoading] = useState(true);

	const getUserStream = async () => {
		try {
			const userStream = await navigator.mediaDevices.getUserMedia(constraints);
			setStream(userStream);
			setLoading(false);
		} catch (err) {
			throw new Error(err);
		}
	};

	useEffect(() => {
		getUserStream();
	}, []);

	return { stream, loading };
};

export { useGetStream };
