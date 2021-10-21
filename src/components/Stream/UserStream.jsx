import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGetStream } from '../../hooks/stream';

const Stream = styled.div`
	width: 300px;
	height: 300px;
	border: 1px solid black;
	position: relative;
`;

const Video = styled.video`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Button = styled.button`
	width: 100%;
	height: auto;
	background-color: skyblue;
	outline: none;
	cursor: pointer;
`;

const ButtonWrap = styled.div`
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
`;

export default function UserStream() {
	const { loading, stream } = useGetStream({ audio: true, video: true });
	const videoRef = useRef(null);

	const handleVideoToggle = () => {
		if (stream) {
			stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
		}
	};

	useEffect(() => {
		if (!loading) {
			videoRef.current.srcObject = stream;
		}
	}, [loading, stream]);

	return (
		<Stream>
			<Video ref={videoRef} autoPlay />

			<ButtonWrap>
				<Button onClick={handleVideoToggle}>Video Toggle</Button>
			</ButtonWrap>
		</Stream>
	);
}
