import Spinner from "./spinner/Spinner";
import styled from "styled-components"
import mjolnir from '../resources/img/mjolnir.png'
import { useEffect, useState } from "react";
import UseMarvelService from "../services/Marvel";
import ErrorMessage from "./erorMessage/ErrorMessage";



const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 50%);
	align-items: center;
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
`;

const Block = styled.div`
	padding: 40px 35px;
	display: grid;
	grid-template-columns: 180px auto;
	column-gap: 30px;
`;

const Avatar = styled.img`
	width: 180px;
	height: 180px;
	object-fit: ${props => props.src === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? "contain" : "cover"};
`;

const BlockInfo = styled.div`
	display: grid;
	grid-template-rows: minmax(29px, auto) 90px 38px;
	row-gap: 10px;
	padding-top: 3px;
`;

const Name = styled.p`
	font-weight: bold;
	font-size: 22px;
	line-height: 29px;
	text-transform: uppercase;
`;

const Desc = styled.p`
	font-size: 14px;
	line-height: 16px;
`;

const Static = styled.div`
	padding: 40px 35px;
	background-color: #232222;
	position: relative;
`;

const Title = styled.p`
	font-weight: bold;
	font-size: 24px;
	line-height: 32px;
	letter-spacing: -0.045em;
	color: #FFFFFF;
	&:nth-child(2) {
            margin-top: 33px;
            margin-bottom: 33px;
        }
	`;

export const BlockBtn = styled.div``;

export const ButtonLink = styled.a`
position: relative;
	min-width: 101px;
	margin-right: ${props => props.right && `30px`};
	margin-bottom: ${props => props.bottom && `10px`};

	color: #fff;
	text-align: center;
	text-transform: uppercase;
	font-size: 14px;
	transition: 0.3s transform;
	border: none;
	background-color: #${props => props.second ? `5C5C5C` : `9F0013`};
	cursor: pointer;
	padding: 11px 18px;
	 
	&:hover {
		transform: translateY(-5px);
		color: #fff;
	}

	&:before {
		content: '';
		position: absolute;
		top:0;
		left:0;
		border-top: 10px solid #FFFFFF;
		border-right: 10px solid transparent;
		transition: none;
	}

	&:after {
		content: '';
		position: absolute;
		bottom:0;
		right:0;
		border-bottom: 10px solid #FFFFFF;
		border-left: 10px solid transparent;
		transition: none;
	}
`;

const Button = styled.button`
`;

const Image = styled.img`
position: absolute;
	bottom: 14px;
	right: -37px;
`;

const RandomInfo = (props) => {

	const [char, setChar] = useState({});

	const {process, getCharacter, setProcess} = UseMarvelService();

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		getCharacter(id)
			.then(onCharLoaded)
			.then(() => setProcess('complited'))
	}
	useEffect(() => {
		updateChar();
	}, [])

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const getContent = (char, process) => {
		switch (process) {
			case 'waiting':
			case 'loading':
				return <Spinner />
			case 'complited':
				return <ViewChar charApi={char} />;
			case 'error':
				return <ErrorMessage />;
			default:
				throw new Error('Unexpected process state');
		}
	}

	return (
		<Container>
			{getContent(char, process)}
			<Static>
				<Title>Random character for today! <br />
					Do you want to get to know him better?
				</Title>
				<Title>Or choose another one</Title>
				<Button onClick={updateChar} className="button_black button_red ">TRY IT</Button>
				<Image src={mjolnir} alt="mjolnir" />
			</Static>
		</Container>
	)
}

const ViewChar = ({ charApi }) => {

	const { name, description, thumbnail, homepage, wiki } = charApi

	return (
		<Block>
			<Avatar src={thumbnail} alt="thor" />
			<BlockInfo>
				<Name>{name}</Name>
				<Desc>{description}</Desc>
				<BlockBtn>
					<ButtonLink right href={homepage} >Homepage</ButtonLink>
					<ButtonLink second href={wiki}>wiki</ButtonLink>
				</BlockBtn>
			</BlockInfo>
		</Block>
	)
}



export default RandomInfo
