import UseHttpHook from "../hooks/http.hook";

const UseMarvelService = () => {
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=e8c5f8def490db0b697b771366654398';
	const _baseOffsetChar = 210;

	const { process, request, clearError, setProcess } = UseHttpHook();

	const getCharacterByName = async (name) => {
		const res= await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(item => _transformCharacter(item))
	};


	const getAllCharacters = async (offset = _baseOffsetChar) => {
		
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(item => _transformCharacter(item))
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
		return res.data.results.map(item => _transformComics(item))
	}

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
		return _transformComics(res.data.results[0]);
	}

	const _transformCharacter = (char) => {

		return {
			name: char.name,
			description: char.description ? `${char.description.slice(0, 210)}...` : `There is no description for this character`,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items,
		}
	};

	const _transformComics = (comics) => {
		return{
			id: comics.id,
			title: comics.title,
			description: comics.description || `There is no description for this character`,
			pageCount: comics.pageCount ? `${comics.pageCount} page` : 'No information about the number of pages',
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
			languege: comics.textObjects.languege || 'en-us',
			prices: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
		}
	}

	return { process, getAllCharacters, getCharacter, clearError, setProcess, getAllComics, getComics, getCharacterByName}

}

export default UseMarvelService;