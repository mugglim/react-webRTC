import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGetStream } from '../../hooks/stream';

const Stream = styled.div`
	width: 400px;
	height: 400px;
	border: 1px solid black;
`;

const Video = styled.video`
	width: 100%;
	height: 100%;
`;

export default function UserStream() {
	const stream = useGetStream({ audio: true, video: true });
	const videoRef = useRef(null);

	useEffect(() => {
		if (stream) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<Stream>
			<Video ref={videoRef} autoPlay />
		</Stream>
	);
}
