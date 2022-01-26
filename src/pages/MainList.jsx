
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import CardInfo from '../components/CardInfo';
import CardList from '../components/CardList';
import ErrorBaundaries from '../components/errorBoundaries/ErrorBaundaries';
import RandomInfo from '../components/RandomInfo';
import baner from '../resources/img/baner.png'
import CharSerchForm from '../components/form/CharSerchForm';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Container = styled.main`
	margin-top: 50px;
	position: relative;
`;

const Wrepper = styled.div`
	margin-top: 50px;
	display: grid;
	grid-template-columns: 650px 425px;
	column-gap: 25px;
	align-items: start;
`;

const Image = styled.img`
	position: absolute;
	right: -174px;
	bottom: -70px;
	z-index: -1;
`;

const MainList = (props) => {

	const [charId, setCharId] = useState(null)

	const onCharId = (id) => {
		setCharId(id);
	}

	return (
		<HelmetProvider>
			<Container>
				<Helmet>
					<meta name="description" content="Marvel information portal" />
					<title>Marvel information </title>
				</Helmet>
				<ErrorBaundaries>
					<RandomInfo />
				</ErrorBaundaries>
				<Wrepper>
					<ErrorBaundaries>
						<CardList onCharId={onCharId} />
					</ErrorBaundaries>
					<div>
						<ErrorBaundaries>
							<CardInfo charIdFo={charId} />
						</ErrorBaundaries>
						<ErrorBaundaries>
							<CharSerchForm />
						</ErrorBaundaries>
					</div>

				</Wrepper>
				<Image src={baner} />
			</Container>
		</HelmetProvider>
	)

}

export default MainList
