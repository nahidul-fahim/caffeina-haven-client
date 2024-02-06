import { useRef } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";

const bgImg = "https://i.ibb.co/FWDxTW1/restaurant.jpg";
// array
const selectPerson = [
    "1 person", "2 people", "3 people", "4 people", "5 people",
    "6 people", "7 people", "8 people", "9 people", "10 people",
    "11 people", "12 people", "13 people", "14 people", "15 people",
    "16 people", "17 people", "18 people", "19 people", "20 people"
];

const selectTime = [
    "10.00 am", "11.00 am", "12.00 pm", "1.00 pm", "2.00 pm",
    "3.00 pm", "4.00 pm", "5.00 pm", "6.00 pm", "7.00 pm",
    "8.00 pm", "9.00 pm", "10.00 pm"
]


const FindATable = () => {

    // hooks
    const axiosPublic = useAxiosPublic();
    const reservationForm = useRef(null);
    const successToast = useSuccessToast;
    const failedToast = useFailedToast();


    // today's date
    const todayDate = new Date().toISOString().split("T")[0];


    // handle Reservation post
    const handleNewReservation = e => {
        e.preventDefault();
        const form = e.target;
        const reserverName = form.reserverName.value;
        const reserverEmail = form.reserverEmail.value;
        const reserverPhone = form.reserverPhone.value;
        const totalPerson = form.totalPerson.value;
        const reserveTime = form.reserveTime.value;
        const reserveDate = form.reserveDate.value;
        const specialRequest = form.specialRequest.value;
        const reservedOn = todayDate;

        const newReservationInfo = { reserverName, reserverEmail, reserverPhone, totalPerson, reserveTime, reserveDate, specialRequest, reservedOn }


        //send the data to database
        axiosPublic.post("/reservationPostApi", newReservationInfo)
            .then(res => {
                if (res.data.insertedId) {
                    successToast("Reservation successful!");
                    reservationForm.current.reset();
                }
            })
            // db post error
            .catch(err => failedToast(err.code))
    }




    return (
        <div className="mx-auto">
            {/* page heading section */}
            <div
                className="h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000a6, #000000a6), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Reserve A Table</h1>
            </div>

            {/* page content section */}
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">


                {/* new item adding form */}
                <form onSubmit={handleNewReservation} ref={reservationForm}
                    className="w-full flex flex-col justify-center items-center p-8 lg:p-14 gap-7 font-body font-light">

                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8 lg:gap-14">
                        {/* your name */}
                        <input required type="text" name="reserverName" id="reserverName" placeholder="Your name" className="w-full md:w-1/3 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                        {/* your email */}
                        <input required type="email" name="reserverEmail" id="reserverEmail" placeholder="Your email" className="w-full md:w-1/3 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                        {/* your phone */}
                        <input required type="tel" name="reserverPhone" id="reserverPhone" placeholder="Your phone" className="w-full md:w-1/3 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
                    </div>


                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8 lg:gap-14">

                        {/* select total person */}
                        <select required name="totalPerson" id="totalPerson" defaultValue={""} className="w-full md:w-1/3 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-[#a2abb1] appearance-none">
                            {
                                selectPerson.map((person, index) =>
                                    <option key={index} value={person} className="capitalize">{person}</option>)
                            }
                        </select>

                        {/* select time */}
                        <select required name="reserveTime" id="reserveTime" defaultValue={""} className="w-full md:w-1/3 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-[#a2abb1] appearance-none">
                            {
                                selectTime.map((time, index) =>
                                    <option key={index} value={time} className="capitalize">{time}</option>)
                            }
                        </select>

                        {/* date pick */}
                        <input required type="date" name="reserveDate" id="reserveDate" min={todayDate} className="w-full text-[#a2abb1]  md:w-1/3 bg-[#46464600] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white" />

                    </div>

                    {/* item description */}
                    <textarea name="specialRequest" id="specialRequest" placeholder="Special request" maxLength={55} className="w-full bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />


                    {/* submit button */}
                    <input type="submit" value="Confirm Reservation" className="w-full bg-second text-white px-5 py-2 hover:bg-third duration-500 cursor-pointer font-medium" />
                </form>

            </div>

        </div>
    );
};

export default FindATable;