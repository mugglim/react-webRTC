import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video`
	width: 250px;
	height: 250px;
	object-fit: cover;
	border: 3px solid red;
`;

export default function Video({ stream }) {
	const videoRef = useRef(null);

	useEffect(() => {
		videoRef.current.srcObject = stream;
	}, []);

	return <StyledVideo ref={videoRef} autoPlay />;
}
