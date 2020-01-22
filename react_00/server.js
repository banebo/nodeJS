const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuid = require('uuid')
const util = require('util')

const port = 8000
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

var data = [
    {
        id: uuid.v4(),
        title: 'TITLE 1',
        desc: 'DESC 1'
    },
    {
        id: uuid.v4(),
        title: 'TITLE 2',
        desc: 'DESC 2'
    },
    {
        id: uuid.v4(),
        title: 'TITLE 3',
        desc: 'DESC 3'
    }
]

app.get('/api/data', (req, res) => {
    res.status(200).json(data)
})

app.get('/api/data/:id', (req, res) => {
    const id = req.params.id
    if (!id || id=='')
        return
    const doc = data.filter(el => el.id == id)
    res.status(200).json(doc)
})

app.post('/api/data', (req, res) => {
    const document = {
        title: req.body.title,
        desc: req.body.desc
    }
    if(!(document.title || document.desc) || 
       (document.title=="" && document.desc==""))
        return

    document.id = uuid.v4()

    data.push(document)
    res.json({
        msg: "document added",
        document
    })
})

app.put('/api/data', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const desc = req.body.desc

    if(!(title || desc || id) || (title=="" && desc=="" && id==""))
        res.status(500).json({error: "Can't save an empty doc"}).send()
    
    data.forEach(el => {
        if (el.id == id){
            el.title = title
            el.desc = desc
            res.status(200).json({msg: `Updated document id[${id}]`})
        }
    })
    res.send()
})

app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id
    if(!id || id=='')
        res.status(500).json({error: "Invalid id"})
    else{
        data = data.filter(el => el.id != id)
        res.status(200).json({msg: `Document deleted id: ${id}`})
    }
})

app.listen(port, () => {
    util.log(`Server started on port ${port}`)
})
