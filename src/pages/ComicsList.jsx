import styled from "styled-components";
import AppBanner from '../components/AppBanner'
import { useEffect, useState } from "react";
import UseMarvelService from "../services/Marvel";
import ErrorMessage from "../components/erorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";
import { Link } from "react-router-dom";
import '../style/buttonsStyle.css';
import { Helmet, HelmetProvider } from "react-helmet-async";


const Container = styled.main`
	margin-top: 50px;
	position: relative;
`;

const Wrapper = styled.div`
	margin-top: 45px;
`;

const ListItems = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 225px);
	justify-content: space-between;
	row-gap: 55px;
`;

const ItemList = styled.li`
	transition: 0.3s transform;
	&:hover {
		transform: translateY(-5px);
	}
`;

// const Link = styled.a``;

const ImageItem = styled.img`
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
	width: 225px;
	height: 345px;
`;

const NameItem = styled.div`
	margin-top: 10px;
	font-weight: bold;
	font-size: 14px;
	line-height: 18px;
`;

const PriceItem = styled.div`
	margin-top: 5px;
	font-weight: bold;
	font-size: 14px;
	line-height: 18px;
	color: rgba(0, 0, 0, 0.6);
	text-transform: uppercase;
`;

const Button = styled.button``;


const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(0);

	const { process, setProcess, getAllComics } = UseMarvelService();

	const onComicsRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllComics(offset)
			.then(onComicsLoaded)
			.then(() => setProcess('complited'))
	}

	useEffect(() => {
		onComicsRequest(offset, true)
	}, [])

	const onComicsLoaded = (newComicsList) => {
		setComicsList(comicsList => [...comicsList, ...newComicsList]);
		setNewItemsLoading(false);
		setOffset(offset => offset + 8);
	}


	const getContent = (comicsList, process, newItemsLoading) => {
		switch (process) {
			case 'waiting':
				return <Spinner />;
			case 'loading':
				return !newItemsLoading  ? <Spinner /> : <ComicsItemList comicsListApi={comicsList} />;
			case 'complited':
				return <ComicsItemList comicsListApi={comicsList} />;
			case 'error':
				return <ErrorMessage />
			default:
				throw new Error('Unexpected process state');
		}
	}

	return (
		<HelmetProvider>
			<Container>
				<Helmet>
					<meta name="description" content="Marvel with list of our comics" />
					<title>Comics list </title>
				</Helmet>
				<AppBanner />
				<Wrapper>
					{getContent(comicsList, process, newItemsLoading)}
					<Button onClick={() => onComicsRequest(offset)}
						disabled={newItemsLoading}
						className="button button_long">load more</Button>
				</Wrapper>
			</Container>
		</HelmetProvider>
	)
}

const ComicsItemList = (props) => {

	const comicsItem = props.comicsListApi.map((item, key) => {

		return (
			<ItemList key={key}>
				{/* <Link href='#'> */}
				<Link to={`/comics/${item.id}`}>
					<ImageItem src={item.thumbnail} alt={item.thumbnail} />
					<NameItem>{item.title}</NameItem>
					<PriceItem>{item.praces}</PriceItem>
				</Link>
				{/* </Link> */}
			</ItemList >
		)
	})

	return (
		<ListItems>

			{comicsItem}

		</ListItems>
	)
}

export default ComicsList
