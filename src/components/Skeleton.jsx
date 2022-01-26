import React from 'react'
import styled, { keyframes } from 'styled-components'


const Container = styled.div``;

const Title = styled.p``;

const Wrapper = styled.div``;

const pulse = keyframes`
 0% {
        opacity: 1
    }
    50% {
        opacity: .4
    }
    100% {
        opacity: 1
    }
`

const Header = styled.div`
	animation: ${pulse} 1.5s ease-in-out .5s infinite;
	display: grid;
	grid-template-columns: 40px auto;
	column-gap: 10px;
	align-items: center;
`;

const Circle = styled.div`
	animation: ${pulse} 1.5s ease-in-out .5s infinite;
	width: 40px;
	height: 40px;
	background-color: #C4C4C4;
	border-radius: 100%;
`;

const MiniBlock = styled.div`
	animation: ${pulse} 1.5s ease-in-out .5s infinite;
	width: 100%;
	height: 16px;
	background-color: #C4C4C4;
`;

const Block = styled.div`
	animation: ${pulse} 1.5s ease-in-out .5s infinite;
	height: 35px;
	width: 100%;
	background-color: #C4C4C4;
	margin-top: 15px;
`;






const Skeleton = () => {
	return (
		<Container>
		<Title>Please select a character to see information</Title>
			<Wrapper>
				<Header>
					<Circle></Circle>
					<MiniBlock></MiniBlock>
				</Header>
				<Block></Block>
				<Block></Block>
				<Block></Block>
			</Wrapper>
		</Container>
	)
}

export default Skeleton
