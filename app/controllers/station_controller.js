const { Op } = require("sequelize");
const {Station} = require('../../models/index');
const HttpStatus = require('http-status-codes');
const ValidationContract = require('../services/validator');

exports.addStation =  async(req, res) =>
{	

	try{
		
		let contract = new ValidationContract();
		contract.isRequired(req.body.name, 'Station Name is required!');
		contract.isRequired(req.body.state, 'State is required!');
		contract.isRequired(req.body.description, 'Description is required!');
		
		if (!contract.isValid()) {
			return res.status(HttpStatus.CONFLICT).send(contract.errors());
		}

		let data = {...req.body}

		console.log(data)

		let station = await Station.create(data);

		res.status(HttpStatus.CREATED).send({
			message: `Congratulations, successfully created station!`,
			status: HttpStatus.CREATED,
			result: station
		});
	}
	catch(e){
		//console.log(e)
		res.status(HttpStatus.BAD_REQUEST).send({
			message: `Error Creating station`,
			status: HttpStatus.BAD_REQUEST,
			result: e
		});
	}
}

exports.getAllStations =  async(req, res) =>
{
	let stations = await Station.findAll();

	res.status(HttpStatus.OK).send({
		message: `success!`,
		status: HttpStatus.OK,
		result: stations
	});

}

exports.updateStation =  async(req, res) =>
{	
	let id = req.params.id;
	const station = await Station.findOne({ where: { id: id } });

	if(station){
		let updatedStation = await Station.update({...req.body},{where: {id:id}});
		res.status(HttpStatus.OK).send({
			message: `successfully updated!`,
			status: HttpStatus.OK,
			result: updatedStation
		});
	}
	
	else {
		return res.status(HttpStatus.BAD_REQUEST).send({
			message: `BAD REQUEST. Couldn't find station information by Id ${id}`,
			status: HttpStatus.BAD_REQUEST,
			result: {}
		});
	}
}

exports.deleteStationById =  async(req, res) =>
{
	let id = req.params.id;
	const station = await Station.findOne({ where: { id: id } });

	if(station) {
		await Station.destroy({ where: { id: id } });
		return res.status(HttpStatus.OK).send({
			message: `successfully deleted!`,
			status: HttpStatus.OK,
			result: station
		});
	}
	else {
		return res.status(HttpStatus.BAD_REQUEST).send({
			message: `BAD REQUEST. Couldn't find station information by Id ${id}`,
			status: HttpStatus.BAD_REQUEST,
			result: {}
		});
	} 
}

