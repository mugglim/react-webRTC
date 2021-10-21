import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useGetStream } from '../../hooks/stream';
import { SocketContext } from '../../context/socket';
import Video from './Video';

const Stream = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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

const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export default function UserStream() {
	const { socket, pc } = useContext(SocketContext);
	const { loading, stream } = useGetStream({ audio: true, video: true });
	const [peerStream, setPeerStream] = useState(false);

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
			setPeerStream(peerStream);
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
			if (pc.getSenders().length === 0) {
				stream.getTracks().forEach(track => pc.addTrack(track, stream));
			}
			socket.emit('join_room');
		}
	}, [loading, stream]);

	return (
		<Stream>
			<h2>나의 비디오</h2>
			<Row>
				{stream && (
					<>
						<Video stream={stream} />
						<ButtonWrap>
							<Button onClick={handleVideoToggle}>Video Toggle</Button>
						</ButtonWrap>
					</>
				)}
			</Row>
			<h2>Peer의 비디오</h2>
			<Row>{peerStream && <Video stream={peerStream} />}</Row>
		</Stream>
	);
}
