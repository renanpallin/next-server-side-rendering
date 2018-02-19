import Header from '../components/Header';
import withMui from '../shared/MUI/withMUI';

import 'isomorphic-fetch';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const Index = ({ posts }) => (
	<div>
		<Header />
		{posts.map(p => (
			<Card key={p.id}>
				<CardHeader title={p.title} />
				<CardText>
					<RaisedButton label="Click to view posts!" fullWidth={true} primary={true}/>
				</CardText>
			</Card>
		))}
	</div>
);

Index.getInitialProps = async () => {
	const response = await fetch(
		`${process.env.BLOGGER_URL}?key=${process.env.API_KEY}`
	);
	const data = await response.json();
	return {
		posts: data.items,
	};
};

export default withMui(Index);
