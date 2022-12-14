const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

// 1) Middleware
app.use(morgan('dev'))

app.use(express.json());

app.use((req, res, next) =>{
    console.log("Hello from the middleware");
    next();
});

app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString()
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// 2) Route handlers
const getAllTours = (req, res)=>{   // Callback function here is called route handler
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

const getTour = (req,res) =>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    if(id < tours.length)
    {
        res.status(200).json({
            status : "success",
            data:{
                tour
            }
        })
    }
    else
    {
    res.status(404).json({
        status: "fail",
        message: "Invalid ID"
    })
    }
}

const createTour = (req, res)=>{
    const newId = tours[tours.length - 1].id  + 1;
    const newTour = Object.assign({id: newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err =>{
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    }) 
}

const updateTour = (req,res) =>{
    if(req.params.id * 1 > tours.length)
    {
       return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    
    res.status(200).json({
        status: "success",
        data: {
            tour:'<Updated tour here...>'
        }
    })
}

const deleteTour = (req,res) =>{
    if(req.params.id * 1 > tours.length)
    {
       return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    
    res.status(204).json({
        status: "success",
        data: null
    })
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// 3) Routes
app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour)

app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

// 4) Start the server
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})