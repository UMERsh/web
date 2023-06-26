import React, { useState } from 'react'
import moment from 'moment'
import { firestore, storage } from 'config/Firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore/lite'

const initialState = {
    member_name: "",
    father_name: "",
    phone_no: "",
    membership_no: "",
    member_fee: 0,
    martial_status: "",
    cnic_no: "",
    date_of_birth: "",
    email: "",
    postal_address: "",
    address: "",
}

export default function Form() {
    const [state, setState] = useState(initialState)
    const [profileImage, setProfileImage] = useState({})
    const [progress, setProgress] = useState(0)
    const [imageURL, setImageURL] = useState("")
    const [imageLoading, setImageLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    //   useEffect(() => {
    //   }, [])



    const handleChange = e => {
        const { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    // onchange funtion for image
    const handleImage = e => {
        let file = e.target.files[0]
        if (!file) {
            return window.toastify("File Not Found", "error")
        } else if (file && file.size > 10000000) {
            return window.toastify("Error! Your picture size is more than 10 MB", "error")
        } else {
            setProfileImage(file)
        }
    }

    // upload button function
    const handleUploadPic = () => {
        const fileExt = profileImage.name.split('.').pop();
        const imagesRef = ref(storage, `images/${window.getRandomId()}.${fileExt}`)
        const uploadTask = uploadBytesResumable(imagesRef, profileImage);
        setImageLoading(true)

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)

                if (progress === 100) {
                    setTimeout(() => {
                        setImageLoading(false)
                    }, 1000);
                }
            },
            (error) => {
                window.toastify(error.message, "error")
                setImageLoading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setImageURL(downloadURL)
                    })
            }
        );
    }

    // handleSubmit
    const handleSubmit = e => {
        e.preventDefault()
        let { member_name, father_name, phone_no, membership_no, member_fee, martial_status, cnic_no, date_of_birth, email, postal_address, address } = state;

        member_name = member_name.trim()
        father_name = father_name.trim()
        phone_no = phone_no.trim()
        membership_no = membership_no.trim()
        cnic_no = cnic_no.trim()
        email = email.trim()
        postal_address = postal_address.trim()
        address = address.trim()
        member_fee = Number(member_fee)

        let formData = {
            member_name, father_name, phone_no, membership_no, member_fee, martial_status, cnic_no, date_of_birth, email, postal_address, address,
            dateCreated: moment().format('YYYY-MM-DD,h:mm:ss a'),
            totalFee: member_fee,
            profile_pic: imageURL
        }

        if (profileImage.name === undefined && imageURL === "") {
            window.toastify("You did'nt choose any image", "warning")
            storeDataInFirestore(formData)
        } else if (profileImage.name !== undefined && imageURL === "") {
            return window.toastify("Please Upload Pic to Enter Data", "error")
        } else {
            storeDataInFirestore(formData)
        }

    }

    const storeDataInFirestore = async (data) => {
        setIsLoading(true)
        try {
            await setDoc(doc(firestore, "Members", data.membership_no), data, { merge: true })
                .then(() => {
                    setIsLoading(false)
                    window.toastify("Member Added Successfully", "success")
                })
        } catch (error) {
            window.toastify(error.message, "error")
            setIsLoading(false)
        }
        setState(initialState);
        setProfileImage({});
        setImageURL("")
    }

    //   const storeDataInFirestore = (get) => {
    //     const date = get.dateCreated;
    //     console.log(date);
    //     const nextDate = moment(date).add(1, "month").format('YYYY-MM-DD,h:mm:ss a')
    //     console.log(nextDate);

    //   }



    return (
        <>
            <div className="container my-5">
                <div className="row ">
                    <div className="col">
                        <div className="card rounded-4 shadow-lg border-0 pb-5 px-3 px-md-4">
                            {/* <h1 className='pt-3 pb-5'>Member's Form</h1> */}
                            <h1 className='pt-3 fw-bold pb-5 text-info'>Member's Form</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="row row-cols-1 row-cols-md-2">
                                    <div className="col">
                                        {/* name & father name */}
                                        <div className="row g-2 ">
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="member_name" className="form-label"> Member Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" required name='member_name' value={state.member_name} onChange={handleChange} id="member_name" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-3">
                                                    <label htmlFor="father_name" className="form-label">Father Name</label>
                                                    <input type="text" className="form-control" required name='father_name' value={state.father_name} onChange={handleChange} id="father_name" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Phone & Membership No */}
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="phone_no" className="form-label">Phone No <span className="text-danger">*</span></label>
                                                <div className='d-flex '>
                                                    <input type="number" className="form-control" required name='phone_no' value={state.phone_no} onChange={handleChange} id="phone_no" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row py-2 g-2 ">
                                            <div className="col ">
                                                <div className="mb-3">
                                                    <label htmlFor="membership_no" className="form-label"> Membership No. <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" required name='membership_no' value={state.membership_no} onChange={handleChange} id="membership_no" />
                                                </div>
                                            </div>
                                            <div className="col ">
                                                <div className="mb-3">
                                                    <label htmlFor="member_fee" className="form-label">Member's Fee <span className="text-danger">*</span></label>
                                                    <input type="number" className="form-control" required name='member_fee' value={state.member_fee} onChange={handleChange} id="member_fee" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* member's image */}
                                        <div className="row my-3">
                                            <div className="mb-2">
                                                <label htmlFor="member_pic" className="form-label">Member's Pic</label>
                                                <div className="input-group mb-3">
                                                    <input type="file" className='form-control' accept='image/*' onChange={handleImage} id="member_pic" />
                                                    <span className="btn btn-info text-white input-group-text" id="basic-addon2" onClick={handleUploadPic}>
                                                        {imageLoading === true
                                                            ? <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                                                            : "Upload"}
                                                    </span>
                                                </div>
                                                {imageLoading === true &&
                                                    <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ height: "8px" }}>
                                                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{ width: `${progress}%` }}></div>
                                                    </div>}

                                            </div>
                                        </div>

                                        {/* Martial status */}
                                        <div className="mb-3">
                                            <label htmlFor="martial_status" className="form-label">Marital Status <span className="text-danger">*</span></label> <br />
                                            <input type="radio" name="martial_status" required value="married" onChange={handleChange} id="married" />
                                            <label htmlFor="married">Married</label> <br />
                                            <input type="radio" name="martial_status" required value="unmarried" onChange={handleChange} id="unmarried" />
                                            <label htmlFor="unmarried">Unmarried</label>

                                        </div>
                                    </div>

                                    {/* it's second column */}
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="cnic_no" className="form-label">CNIC <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" required name='cnic_no' value={state.cnic_no} onChange={handleChange} id="cnic_no" />
                                        </div>
                                        {/* DOB */}
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="dob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                                <div className='d-flex '>
                                                    <input type="date" className="form-control" required name='date_of_birth' value={state.date_of_birth} onChange={handleChange} id="dob" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Email */}
                                        <div className="my-3">
                                            <label htmlFor="email" className="form-label ">Email Address <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" required name='email' value={state.email} onChange={handleChange} id="email" />
                                        </div>
                                        {/* Postal Address */}
                                        <div className="my-3">
                                            <label htmlFor="postal_address" className="form-label">Postal Address <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" required name='postal_address' value={state.postal_address} onChange={handleChange} id="postal_addrtess" />
                                        </div>
                                        {/* address */}
                                        <div className="my-3">
                                            <label htmlFor="address" className="form-label">Address <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" required name='address' value={state.address} onChange={handleChange} id="address" />
                                        </div>
                                    </div>
                                </div><hr />

                                <div className="row mt-4">
                                    <div className="col-8 col-md-3 offset-2 offset-md-9">
                                        <button className='btn btn-outline-info w-100' disabled={isLoading}>
                                            {isLoading === true
                                                ? <div>
                                                    <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                                                    <div className="spinner-grow spinner-grow-sm text-info mx-2" role="status"></div>
                                                    <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                                                </div>
                                                : "Submit"}
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
