import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import RazorPay from 'razorpay'
import crypto from 'node:crypto'

dotenv.config()
const app = express()
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())


const razorpayInstance = new RazorPay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})


app.get('/', (req, res) => {
    res.status(200).json('Codefusion upcoming')
})

app.get('/payment/order', async (req, res) => {
    try {
        const options = {
            amount: 10 * 100, // 10 Rs.
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex')
        }

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json('Order not created')
            }
            res.status(200).json(order)
        })
    }
    catch (err) {
        return res.status(500).json('Internal server error')
    }
})

app.post('/payment/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const paymentSuccessful = false

        const sign = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSign = crypto
            .createHmac('sha256', process.env.KEY_SECRET)
            .update(sign.toString())
            .digest('hex')

        if (razorpay_signature === expectedSign) {
            return res.status(200).json(!paymentSuccessful)
        }
        else {
            return res.status(400).json(paymentSuccessful)
        }
    }
    catch (err) {
        return res.status(500).json('Internal server error')
    }
})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server PORT : ${port}`)
}) 