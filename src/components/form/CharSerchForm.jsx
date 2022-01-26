import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import styled from 'styled-components'
import UseMarvelService from '../../services/Marvel';
import ErrorMessage from '../erorMessage/ErrorMessage';
import {Link} from 'react-router-dom';
import '../../style/buttonsStyle.css';

const Container = styled.div`
	padding: 25px;
	margin-top: 30px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
	position: relative;
	z-index: 5;
	background-color: #fff;
`;

const Label = styled.label`
	display: block;
	font-weight: bold;
	font-size: 18px;
	line-height: 24px;
	color: #000
`
const Wrapper = styled.div`
	margin-top: 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const Input = styled.input`
	padding: 0 10px;
	width: 250px;
	height: 38px;
	border: none;
	background: #FFFFFF;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-size: 14px;
`
const ErrorCritical = styled.div`
	margin-top: 25px;
`
const ErrorMas = styled.div`
	margin-top: 25px;
	font-weight: bold;
	font-size: 18px;
	line-height: 24px;
	color: #9F0013;
`
const CharSuccess = styled.div`
	font-weight: bold;
	font-size: 18px;
	line-height: 24px;
	color: #03710E;
`

const Button = styled.button``;

const CharSerchForm = () => {

	const [charID, setCharID] = useState(null);

	const { error, getCharacterByName, setProcess } = UseMarvelService();

	const onCharLoaded = (charID) => {
		setCharID(charID)
	}

	const onCharUpdate = (name) => {
		getCharacterByName(name)
			.then(onCharLoaded)
			.then(() => setProcess('complited'))
	}

	const errorMesage = error ? <ErrorCritical><ErrorMessage /></ErrorCritical> : null;
	const result = !charID ? null
		: charID.length > 0 ?
			<Wrapper>
				<CharSuccess>There is! Visit {charID[0].name} page?</CharSuccess>
				<Link to={`/characters/${charID[0].id}`} className='link' >To go</Link>
			</Wrapper>
			: <ErrorMas> The character was not found. Check the name and try again</ErrorMas>

	return (
		<Container>
			<Formik
				initialValues={{
					charName: ''
				}}
				validationSchema={Yup.object({
					charName: Yup.string().required('This field is required'),
				})}
				onSubmit={({ charName }) => onCharUpdate(charName)}
			>
				<Form >
					<Label htmlFor="charName">Or find a character by name:</Label>
					<Wrapper>
						<Field
							id="charName"
							name='charName'
							type='text'
							placeholder="Enter name"
							as={Input}
						/>
						<Button type='submit' className='button button_red' >Find</Button>
					</Wrapper>
					<FormikErrorMessage component={ErrorMas} name='charName'></FormikErrorMessage>
				</Form>

			</Formik>
			{result}
			{errorMesage}
		</Container>
	)
}

export default CharSerchForm
