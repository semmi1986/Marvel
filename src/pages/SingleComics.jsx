
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'
import UseMarvelService from '../services/Marvel';
import ErrorMessage from "../components/erorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";


const Container = styled.div``;


const SinglePage = ({ Component, dataType }) => {

	const {id} = useParams(); // id aus URL 
	const [data, setData] = useState(null)

	const { process, setProcess, getComics, getCharacter } = UseMarvelService();

	const updateComics = () => {

		switch (dataType) {
			case 'comics':
				getComics(id)
					.then(onComicsLoading)
					.then(() => setProcess('complited'))
				break;
				case 'characters':
					getCharacter(id)
					.then(onComicsLoading)
					.then(() => setProcess('complited'))
				break;

			default:
				break;
		}
	}

	useEffect(() => {
		updateComics();
	}, [id])

	const onComicsLoading = (data) => {
		setData(data)
	}

	const getContent = (data, process) => {
		switch (process) {
			case 'waiting':
			case 'loading':
				return <Spinner />;
			case 'complited':
				return <Component data={data} id={id} />;
			case 'error':
				return <ErrorMessage />
			default:
				throw new Error('Unexpected process state');
		}
	}


	return (
		<Container>
			{getContent(data, process)}
		</Container>
	)
}



export default SinglePage
