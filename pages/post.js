import Header from '../components/Header';
import withMui from '../shared/MUI/withMUI';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import Link from 'next/link';
import 'isomorphic-fetch';

const Post = ({ title, content }) => (
	<div>
		<Header />
		<Card>
			<CardHeader title={title} />
			<CardText>
				<div dangerouslySetInnerHTML={{ __html: content }} />
				<RaisedButton fullwidth={true}>
					<Link href="/" as="/blog">
						{/*
							The author wraps this content with an `a` tag,
							but I don't think this is necessary
						*/}
						Go back to blog
					</Link>
				</RaisedButton>
			</CardText>
		</Card>
	</div>
);

Post.getInitialProps = async ({ query: { id } }) => {
	const response = await fetch(
		`${process.env.BLOGGER_URL}/${id}?key=${process.env.API_KEY}`
	);
	const data = await response.json();
	const { title, content } = data;

	return { title, content };
};

export default withMui(Post);
