import axios from "axios"

const Home = () => {
    const makePayment = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/pay`)
            console.log(data)
        }
        catch (err) {
            console.error(err)
        }
    }


    return (
        <div className='payment'>
            <button onClick={makePayment}>
                Make Payment
            </button>
        </div>
    )
}

export default Home
