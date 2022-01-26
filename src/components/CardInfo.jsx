import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonLink } from './RandomInfo';
import UseMarvelService from "../services/Marvel";
import ErrorMessage from "./erorMessage/ErrorMessage";
import Spinner from "./spinner/Spinner";
import Skeleton from './Skeleton';
import { Link } from "react-router-dom";

const Container = styled.div`
	padding: 25px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	position: relative;
	z-index: 5;
	background-color: #fff;
`;

const ItemCards = styled.ul`
	display: grid;
	grid-template-columns: 150px auto;
	column-gap: 25px;
`;

const Image = styled.img`
	width: 150px;
	height: 150px;
	object-fit: ${props => props.src === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "unset" : "cover"};
`;

const ItemInfo = styled.div``;

const ItemName = styled.div`
	font-weight: bold;
	font-size: 22px;
	line-height: 26px;
	text-transform: uppercase;
	
`;

const BlockButtons = styled.div`
 margin-top: 35px;
`;

const Desc = styled.div`
	margin-top: 15px;
	font-size: 14px;
	line-height: 18px;
`;

const CharComics = styled.div`
	font-weight: bold;
	font-size: 18px;
	line-height: 24px;
	margin-top: 10px;
`;

const CharComicsList = styled.ul`
	margin-top: 10px;
`;

const CharComicsItem = styled.li`
	width: 100%;
	padding: 0px 10px;
	line-height: 25px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	margin-top: 10px;
`;


const CardInfo = (props) => {


	const [char, setChar] = useState();

	const { process, getCharacter, setProcess } = UseMarvelService();

	const updateChar = () => {
		if (!props.charIdFo) {
			return;
		}
		getCharacter(props.charIdFo)
			.then(onCharLoaded)
			.then(() => setProcess('complited'))
	}

	useEffect(() => {
		updateChar();
	}, [props.charIdFo])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const getContent = (char, process) => {
		switch (process) {
			case 'waiting':
				return <Skeleton />
			case 'loading':
				return <Spinner />;
			case 'complited':
				return <CharInfo charApi={char} />;
			case 'error':
				return <ErrorMessage />
			default:
				throw new Error('Unexpected process state');
		}
	}

	return (
		<Container>
			{getContent(char, process)}
		</Container>
	)
}

const CharInfo = ({ charApi}) => {

	const { name, description, thumbnail, homepage, wiki, comics, } = charApi

	return (
		<>
			<ItemCards>
				<Image src={thumbnail} alt={name} />
				<ItemInfo>
					<ItemName>{name}</ItemName>
					<BlockButtons>
						<ButtonLink bottom href={homepage}>Homepage</ButtonLink>
						<ButtonLink second href={wiki}>Wiki</ButtonLink>
					</BlockButtons>
				</ItemInfo>
			</ItemCards>
			<Desc>{description}</Desc>
			<CharComics>Comics:</CharComics>
			<CharComicsList>
				{/* проверка на имеющиеся комиксы */}
				{comics.length > 0 ? null : "В данный момент комиксов нет"}

				{comics.slice(0, 12).map((item, index) => {
					return (
						
						<CharComicsItem key={index}>
							<Link to={`/comics/${item.resourceURI.substring(43)}`}>
								{item.name}
							</Link>
						</CharComicsItem>
					)
					
				})}
			</CharComicsList>
		</>
	)
}



export default CardInfo
