import { useState, useEffect } from 'react';

const useGetStream = constraints => {
	const [stream, setStream] = useState(false);

	const getUserStream = async () => {
		try {
			const userStream = await navigator.mediaDevices.getUserMedia(constraints);
			setStream(userStream);
		} catch (err) {
			throw new Error(err);
		}
	};

	useEffect(() => {
		getUserStream();
	}, []);

	return stream;
};

export { useGetStream };
