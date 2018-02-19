import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Head from 'next/head';
import * as theme from './theme';

try {
	injectTapEventPlugin();
} catch(e) {
	console.log('Tap not injected', e);
}

const withMUI = CompoesedComponment => {
	return class HOC extends React.Component {
		static async getInitialProps(context) {
			const { req } = context;
			const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
			// const subProps = await CompoesedComponment.getInitialProps(context);

			return {
				// ...subProps,
				userAgent
			}
		}

		render() {
			const { userAgent } = this.props;
			const Lato = 'lato, sans-serif';
			const muiTheme = getMuiTheme({
				fontFamily: Lato,
				palette: {
					primary1Color: theme.PRIMARY_COLOR,
					primary2Color: theme.PRIMARY_COLOR_TWO,
					primary3Color: theme.PRIMARY_COLOR_THREE,
					accent1Color: theme.ACCENT_COLOR_ONE,
					accent2Color: theme.ACCENT_COLOR_TWO,
					accent3Color: theme.ACCENT_COLOR_THREE,
				},
				appBar: {
					height: 50,

				}
			}, {
				userAgent
			});

			return (
				<div>
					<Head>
						<title>Nextjs Blogger</title>
						<meta name="viewport" content="initial-scale=1.0, width=device-width" />
						<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
					</Head>
					<MuiThemeProvider muiTheme={muiTheme}>
						<CompoesedComponment {...this.props} />
					</MuiThemeProvider>
				</div>
			);
		}
	}
}

export default withMUI;