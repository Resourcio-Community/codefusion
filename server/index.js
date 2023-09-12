import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import RazorPay from 'razorpay'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())


const razorpayInstance = new RazorPay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})


app.get('/', (req, res) => {
    res.status(200).json('Codefusion upcoming')
})

app.post('/pay', async (req, res) => {
    try {
        razorpayInstance.orders.create({
            amount: 10 * 100,
            currency: 'INR'
        }, (err, order) => {
            if (err) {
                console.error(err)
                return res.status(500).json(err)
            }
            res.status(200).json(order)
        })
    }
    catch (err) {
        console.log(err)
    }
})



const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server PORT : ${port}`)
}) 