import styled from "styled-components"
import error from './error.gif'

const Image = styled.img`
	display: block;
	width: 250px;
	height: 250px;
	object-fit: contain;
	margin: 0 auto;
`;



const ErrorMessage = () => {
	return (
		<Image src={error} alt="Error"/>
	)
}

export default ErrorMessage
