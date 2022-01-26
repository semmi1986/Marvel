import { lazy, Suspense } from "react";
import styled from "styled-components";
import Header from "./pages/Header";
import Spinner from "./components/spinner/Spinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Container = styled.div`
	width: 1100px;
	margin: 0 auto;
	padding: 50px 0 50px 0;
	position: relative;
`;

const MainList = lazy(() => import('./pages/MainList'));
const ComicsList = lazy(() => import('./pages/ComicsList'));
const SingleComics = lazy(() => import('./pages/SingleComics'));
const SingleComic = lazy(() => import('./components/form/SingleComic'));
const SingleCharacter = lazy(() => import('./components/form/SingleCharacter'));

const App = () => {
	return (
		<BrowserRouter>
			<Container>
				<Header />
				<Suspense fallback={<Spinner />} >
					<Routes>
						<Route path='/' element={<MainList />} />
						<Route path='/comics' element={<ComicsList />} />
						<Route path='/comics/:id' element={<SingleComics Component={SingleComic} dataType='comics'/>}/> 
						<Route path='/characters/:id' element={<SingleComics Component={SingleCharacter} dataType='characters'/>}/> 
					</Routes>
				</Suspense>
			</Container>
		</BrowserRouter>
	)
}

export default App;