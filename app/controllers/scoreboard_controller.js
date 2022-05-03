const { Op } = require("sequelize");
const {HourlyScoreboard} = require('../../models/index');
const HttpStatus = require('http-status-codes');
const ValidationContract = require('../services/Validator');

exports.addScoreboardDataByStation =  async(req, res) =>
{	

	try{
		
		let contract = new ValidationContract();
		contract.isRequired(req.body.station_id, 'Station Id is required!');
		contract.isRequired(req.body.business_date, 'Date is required!');
		contract.isRequired(req.body.time, 'Time is required!');
		contract.isRequired(req.body.actual, 'Actual Count is required!');
		contract.isRequired(req.body.target, 'Taret is required!');
		
		if (!contract.isValid()) {
			return res.status(HttpStatus.CONFLICT).send(contract.errors());
		}

		let data = {...req.body}

		console.log(data)

		let sc = await HourlyScoreboard.create(data);

		res.status(HttpStatus.CREATED).send({
			message: `Congratulations, successfully created record!`,
			status: HttpStatus.CREATED,
			result: sc
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

exports.getAllScoreboardDataByStationId =  async(req, res) =>
{
	let station_id = req.params.station_id;
	let scoreboards = await HourlyScoreboard.findAll({
		where: {station_id:station_id},
		order: ['id']
	});

	res.status(HttpStatus.OK).send({
		message: `success!`,
		status: HttpStatus.OK,
		result: scoreboards
	});

}

exports.updateScoreboard =  async(req, res) =>
{	
	let id = req.params.id;
	const scoreboard = await HourlyScoreboard.findOne({ where: { id: id } });

	if(scoreboard){
		let updatedSc = await HourlyScoreboard.update({...req.body},{where: {id:id}});
		res.status(HttpStatus.OK).send({
			message: `successfully updated!`,
			status: HttpStatus.OK,
			result: updatedSc
		});
	}
	
	else {
		return res.status(HttpStatus.BAD_REQUEST).send({
			message: `BAD REQUEST. Couldn't find scoreboard information by Id ${id}`,
			status: HttpStatus.BAD_REQUEST,
			result: {}
		});
	}
}

exports.deleteScoreboardById =  async(req, res) =>
{
	let id = req.params.id;
	const sc = await HourlyScoreboard.findOne({ where: { id: id } });

	if(sc) {
		await HourlyScoreboard.destroy({ where: { id: id } });
		return res.status(HttpStatus.OK).send({
			message: `successfully deleted!`,
			status: HttpStatus.OK,
			result: sc
		});
	}
	else {
		return res.status(HttpStatus.BAD_REQUEST).send({
			message: `BAD REQUEST. Couldn't find scoreboard information by Id ${id}`,
			status: HttpStatus.BAD_REQUEST,
			result: {}
		});
	} 
}

