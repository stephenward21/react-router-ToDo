var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'ToDo'
});

connection.connect();


router.get('/getStudents', function(req, res, next) {
	connection.query('SELECT * FROM students', (error, results)=>{
		if (error) throw error;
		res.json(results);
	});
  // res.json({
  // 	students: [
  // 			"Marissa",
  // 			"Merilee",
  // 			"Chris",
  // 			"Stephen",
  // 			"Chand",
 	// 		"Shane"
  // 	]

  // })
});


router.post('/addStudent', (req,res)=>{
	var studentToAdd = req.body.name
	connection.query('INSERT INTO students (name) VALUES (?)', [studentToAdd], (error, results)=>{
		if (error) throw error;
		connection.query('SELECT * FROM students', (error2, results2)=>{
			if (error2) throw error2;
			res.json(results2);
		})		
		// res.json(msg: 'test')
	});
})

module.exports = router;
