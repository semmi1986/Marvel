import React from 'react'
import styled from 'styled-components'
import Avengers from '../resources/img/Avengers.png'
import Avengers_logo from '../resources/img/Avengers_logo.png'

const Container = styled.div`
	width: 100%;
	background-color: #232222;
	height: 100px;
	padding: 0 25px 0 45px;
	display: grid;
	grid-template-columns: 152px auto 133px;
	margin-top: 50px;
`;
const Image = styled.img``;
const Text = styled.div`
	font-weight: bold;
	font-size: 24px;
	line-height: 32px;
	color: #FFFFFF;
	padding-left: 83px;
	padding-top: 18px;
`;
const ImgLogo = styled.img``;

const AppBanner = () => {
	return (
		<Container>
			<Image src={Avengers} />
			<Text>
				New comics every week!<br />
				Stay tuned
			</Text>
			<ImgLogo src={Avengers_logo} alt="Avengers logo"/>

		</Container>
	)
}

export default AppBanner
