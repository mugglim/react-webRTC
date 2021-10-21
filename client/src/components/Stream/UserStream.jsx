import React, { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useGetStream } from '../../hooks/stream';
import { SocketContext } from '../../context/socket';

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
	border: 3px solid red;
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
	const { socket, pc } = useContext(SocketContext);
	const { loading, stream } = useGetStream({ audio: true, video: true });
	const myVideoRef = useRef(null);
	const peermyVideoRef = useRef(null);

	// Video Toggle
	const handleVideoToggle = () => {
		if (stream) {
			stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
		}
	};

	// RTC Service Logic
	const sendOffer = async () => {
		try {
			const offer = await pc.createOffer();
			await pc.setLocalDescription(offer);
			socket.emit('offer', offer);
		} catch (err) {
			console.log(err);
		}
	};

	const receiveOffer = async offer => {
		try {
			await pc.setRemoteDescription(offer);
			const answer = await pc.createAnswer();
			await pc.setLocalDescription(answer);
			socket.emit('answer', answer);
		} catch (err) {
			console.log(err);
		}
	};

	const receiveAnswer = async answer => {
		try {
			await pc.setRemoteDescription(answer);
		} catch (err) {
			console.log(err);
		}
	};

	const handleIce = data => {
		try {
			socket.emit('ice', data.candidate);
		} catch (err) {
			console.log(err);
		}
	};

	const addIce = ice => {
		try {
			pc.addIceCandidate(ice);
		} catch (err) {
			console.log(err);
		}
	};

	const handleStream = mediaStreamEvent => {
		if (mediaStreamEvent) {
			const peerStream = mediaStreamEvent.stream;
			peermyVideoRef.current.srcObject = peerStream;
		}
	};

	// RTC Socket Service Logic..
	pc.onaddstream = handleStream;
	pc.onicecandidate = handleIce;

	socket.on('peer_join', sendOffer);
	socket.on('offer', receiveOffer);
	socket.on('answer', receiveAnswer);
	socket.on('ice', addIce);

	useEffect(() => {
		if (!loading && stream) {
			myVideoRef.current.srcObject = stream;
			stream.getTracks().forEach(track => pc.addTrack(track, stream));
			socket.emit('join_room');
		}
	}, [loading, stream]);

	return (
		<Stream>
			<Video ref={myVideoRef} autoPlay />
			<Video ref={peermyVideoRef} autoPlay />
			<ButtonWrap>
				<Button onClick={handleVideoToggle}>Video Toggle</Button>
			</ButtonWrap>
		</Stream>
	);
}
