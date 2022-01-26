import { Component } from "react/cjs/react.production.min"
import ErrorMessage from "../erorMessage/ErrorMessage"


class ErrorBaundaries extends Component {

	state = {
		error: false
	}

	componentDidCatch(error, info) {
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />
		}
		return this.props.children
	}

}

ErrorBaundaries.propTypes = {

}

export default ErrorBaundaries
