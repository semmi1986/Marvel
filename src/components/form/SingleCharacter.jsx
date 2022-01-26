import React from 'react'
import {Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import AppBanner from '../AppBanner';

const Wrapper = styled.div`
	margin-top: 50px;
	display: grid;
	grid-template-columns: 293px 550px auto;
	column-gap: 50px;
	align-items: start;
`;

const Image = styled.img`
	width: 293px;
	height: 450px;
`;

const Info = styled.div``;

const Title = styled.h2`
	font-weight: bold;
	font-size: 22px;
	line-height: 29px;
`;

const Desc = styled.p`
	font-size: 18px;
	line-height: 24px;
	margin-top: 25px;
`;

const Link = styled.a`
	justify-self: end;
	 font-weight: bold;
	 font-size: 18px;
	 line-height: 24px;
	 cursor: pointer;
	 &:hover {
		 color: #9F0013;
		}
`;

const SingleCharacter = ({ data }) => {

	const { name, description, thumbnail } = data

	const history = useNavigate()

	const onBack = () => {
		history('/')
	}
	return (
		<HelmetProvider>
			<>
				<Helmet>
					<meta name="description" content={`${name} personag`} />
					<title>{name} </title>
				</Helmet>
				<AppBanner />
				<Wrapper>
					<Image src={thumbnail} alt={name} />
					<Info>
						<Title>{name}</Title>
						<Desc>{description}</Desc>
					</Info>
					<Link onClick={onBack}>Back to all</Link>
				</Wrapper>
			</>
		</HelmetProvider>
	)
}

export default SingleCharacter
