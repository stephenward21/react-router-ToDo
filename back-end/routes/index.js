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


function validateKey(key){
	console.log(key)
	return new Promise((resolve, reject)=>{
		connection.query('SELECT * FROM api_keys WHERE api_key="'+key+'"', (error, results)=>{
			console.log(results.length)
			if (error) throw error;
			if (results.length == 0){
				resolve(false);
			}else{
				resolve(true);
			}
		});
	});
}

router.get('/getTasks', function(req, res, next) {
	var isKeyValid = validateKey(req.query.api_key);
	isKeyValid.then((bool)=>{
		if(bool == true){
			connection.query('SELECT * FROM tasks', (error, results)=>{
				if (error) throw error;
				res.json(results);
			})

		}else{
			res.json({msg:"badKey"})
		}

	});

});
  // res.json({
  // 	students: [
  // 			"Marissa",
  // 			"Merilee",
  // 			"Chris",
  // 			"Stephen",
  // 			"Chad",
 	// 			"Shane"
  // 	]

  // })


router.get('/getTask/:id', (req,res)=>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (error, results)=>{
		if(results.length == 0){
			res.json({msg: "noResult"});
		}else{
			res.json(results[0]);
		}
	})
})

router.post('/completeTask',(req, res)=>{
	var targetId = req.body.targetId;
	connection.query('UPDATE tasks SET finished = NOT finished WHERE id=?',[targetId],(error, results, fields)=>{
		if(error) throw error;
		connection.query('SELECT * FROM tasks',(error2, results2, fields2)=>{
			res.json(results2)
		});		
	})
});

router.post('/deleteTask', (req,res)=>{
	connection.query('DELETE FROM tasks WHERE id = '+req.body.taskId,(error, results)=>{
		if(error) throw error;
		res.json({
			msg: "success"
		})
	})
})

router.post('/readTask' , (req,res) =>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (error, results)=>{
		if(results.length == 0){
			res.json({msg: "noResult"});
		}else{
			res.json(results[0]);
		}
	});
});


router.post('/addTask', (req,res)=>{
	var taskToAdd = req.body.taskName
	var dateToAdd = req.body.taskDate
	var infoToAdd = req.body.taskInfo 
	console.log(req.body.name);
	connection.query('INSERT INTO tasks (taskName, taskDate, taskInfo ) VALUES (?, ?, ?)', [taskToAdd, dateToAdd, infoToAdd], (error, results)=>{
		if (error) throw error;
		connection.query('SELECT * FROM tasks', (error2, results2)=>{
			if (error2) throw error2;
			res.json(results2);
		})		
		// res.json(msg: 'test')
	});
})

module.exports = router;
