
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.header`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.h1`
	font-weight: bold;
	font-size: 28px;
	line-height: 33px;
	span{color: #9F0013}

`;

const TitleSpan = styled.span``;

const Nav = styled.nav``;

const Lists = styled.ul`
	display: flex;
	justify-content: center;
	font-weight: bold;
	font-size: 24px;
	line-height: 28px;
`;

const List = styled.li`
	margin: 0 5px;
	&:last-child{
		margin-right: 0px;
	}
	a:hover{
		color: rgba(159, 0, 19, 1);
	}
	a.active{ color: #9f0013}

`;

const Header = () => {

	return (
		<Container>
			<Title>
				<Link to='/'>
					<TitleSpan>Marvel</TitleSpan> information portal
				</Link>
			</Title>
			<Nav>
				<Lists>
					<List>
						<NavLink to='/'>Characters</NavLink>
					</List>
					/
					<List>
						<NavLink to='/comics'>Comics</NavLink>
					</List>
				</Lists>
			</Nav>
		</Container>
	)
}

export default Header
