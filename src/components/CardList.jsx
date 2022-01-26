
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components"
import UseMarvelService from "../services/Marvel";
import ErrorMessage from "./erorMessage/ErrorMessage";
import Spinner from "./spinner/Spinner";
import '../style/buttonsStyle.css'

const Container = styled.div`
	
`;

const ListItems = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 200px);
	column-gap: 25px;
	row-gap: 30px;
`;

const ListItem = styled.li`
	width: 200px;
	height: 318px;
	background-color: #232222;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
	padding: 15px;
	cursor: pointer;
	transition: 0.3s transform;

	&:focus{
		box-shadow: 0 5px 20px #9F0013;
		transform: translateY(-8px);
	}
   &.char__item-enter {
      opacity: 0;
   }
	&.char__itemchar__item-enter-active {
      opacity: 1;
      transition: opacity 500ms ease-in;
   }
   &.char__item-exit {
      opacity: 1;
   }
   &.char__item-exit-active {
      opacity: 0;
      transition: opacity 500ms ease-in;
   }

`;

const Image = styled.img`
	width: 200px;
	height: 200px;
	object-fit: ${props => props.src === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "unset" : "cover"};
	transform: translate(-15px, -15px);
`;

const ItemName = styled.div`
	font-weight: bold;
	font-size: 22px;
	line-height: 29px;
	text-transform: uppercase;
	color: #fff;
`;

const Button = styled.button``;

const CardList = (props) => {

	const [charList, setCharList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(210);

	const { process, getAllCharacters, setProcess } = UseMarvelService();

	const onCharRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllCharacters(offset)
			.then(onCharLoaded)
			.then(() => setProcess('complited'))
	};

	useEffect(() => {
		onCharRequest(offset, true);
	}, []);

	const onCharLoaded = (newCharList) => {
		setCharList(charList => [...charList, ...newCharList]);
		setNewItemsLoading(false);
		setOffset(offset => offset + 9)
	};



	const getContent = (charList, process, newItemsLoading) => {
		switch (process) {
			case 'waiting':
				return <Spinner />;
			case 'loading':
				return !newItemsLoading ? <Spinner /> : <CardsListItem charListApi={charList} />;
			case 'complited':
				return <CardsListItem charListApi={charList} charId={props.onCharId} />;
			case 'error':
				return <ErrorMessage />
			default:
				throw new Error('Unexpected process state');
		}
	}

	return (
		<Container>
			{getContent(charList, process, newItemsLoading)}
			<Button className="button button_long" onClick={() => onCharRequest(offset)} disabled={newItemsLoading}>load more</Button>
		</Container>
	)
}

const CardsListItem = (props) => {
	const items = props.charListApi.map((item) => {
		return (
			<CSSTransition key={item.id} timeout={500} classNames='char__item'>
				<ListItem key={item.id} onFocus={() => props.charId(item.id)} tabIndex={0}>
					<Image src={item.thumbnail} alt={item.thumbnail} />
					<ItemName>{item.name}</ItemName>
				</ListItem>
			</CSSTransition>
		)
	})

	
	return (
		<ListItems >
			<TransitionGroup component={null}>
				{items}
			</TransitionGroup>
		</ListItems>
	)
}

export default CardList
