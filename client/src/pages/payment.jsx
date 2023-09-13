import axios from "axios"
import { useContext } from "react"
import { Context } from "../context/Context"

const Payment = () => {

    const { user } = useContext(Context)

    const initPayment = async (data) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: 'CodeFusion',
            order_id: data.id,
            handler: async (res) => {
                try {
                    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/payment/verify`, res)

                    if (data) {
                        // Store validated user to firebase
                        const { name, email, contact, college } = user
                        try {
                            const databaseURL = process.env.REACT_APP_DATABASE_URL
                            const path = 'users.json'

                            const response = await fetch(`${databaseURL}/${path}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: name.trim(),
                                    email: email,
                                    contact: contact,
                                    college: college.trim(),
                                    txnId: res.razorpay_payment_id
                                })
                            })

                            if (response.ok) {
                                console.log('Data successfully posted.')
                                location.href = '/'
                            }
                        }
                        catch (err) {
                            console.error(err)
                        }
                    }
                    else {
                        toast.error("Payment verification failed. Please try again later.");
                    }
                }
                catch (err) {
                    console.log(err)
                }
            },
            theme: {
                color: '#3399cc'
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }


    const createOrder = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/payment/order`)
            await initPayment(data)
        }
        catch (err) {
            console.error(err)
        }
    }


    return (
        <>
            <div className='payment'>
                <button onClick={createOrder}>
                    Make Payment
                </button>
            </div>
        </>
    )
}

export default Payment
