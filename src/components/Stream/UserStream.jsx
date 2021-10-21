import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGetStream } from '../../hooks/stream';

const Stream = styled.div`
	width: 300px;
	height: 300px;
	border: 1px solid black;
`;

const Video = styled.video`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export default function UserStream() {
	const { loading, stream } = useGetStream({ audio: true, video: true });
	const videoRef = useRef(null);

	useEffect(() => {
		if (!loading && stream) {
			videoRef.current.srcObject = stream;
		}
	}, [loading, stream]);

	return (
		<Stream>
			<Video ref={videoRef} autoPlay />
		</Stream>
	);
}
