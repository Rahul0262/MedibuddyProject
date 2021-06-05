import asyncHandler from 'express-async-handler';
import AWS from 'aws-sdk';

const deleteImage = asyncHandler(async (req, res) => {
	AWS.config.update({
		accessKeyId: process.env.REACT_APP_ACCESSKEY,
		secretAccessKey: process.env.REACT_APP_SECRET,
		region: process.env.REACT_APP_REGION,
	});
	const s3 = new AWS.S3();
	console.log(req.params.id);
	var params = {
		Bucket: process.env.REACT_APP_BUCKET_NAME,
		Key: req.params.id,
	};
	s3.deleteObject(params, (err, data) => {
		if (err) {
			res.status(404).json({ message: 'Error in deletion of image' });
		} else {
			res.json(data);
		}
	});
});

const generatePreSignedUrl = asyncHandler(async (req, res) => {
	AWS.config.update({
		accessKeyId: process.env.REACT_APP_ACCESSKEY,
		secretAccessKey: process.env.REACT_APP_SECRET,
		region: process.env.REACT_APP_REGION,
	});
	const s3 = new AWS.S3();
	const params = {
		Bucket: process.env.REACT_APP_BUCKET_NAME,

		Fields: {
			key: req.body.filename,
		},
	};
	const data = await s3.createPresignedPost(params);

	if (data) {
		res.json(data);
	} else {
		res.status(404).json({ message: 'Error in URL generation' });
	}
	//Replace below if above code doesn't work
	// s3.createPresignedPost(params, (err, data) => {
	// 	if (err) {
	// 		console.error('Presigning post data encountered an error', err);
	// 	} else {
	// 		res.json(data);
	// 	}
	// });
});

export { generatePreSignedUrl, deleteImage };
