import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
			<div style={{ 'background-color': '#e9e9f0' }}>
				<Container>
					<Row>
						<Col className='text-center py-3'>Copyright &copy; test</Col>
					</Row>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
