import React, { useEffect, useState } from 'react'
import { firestore } from 'config/Firebase'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite'
import emailjs from '@emailjs/browser'
import moment from 'moment'

export default function RefreshData() {
    const [isLoading, setIsLoading] = useState(false)
    
    const gettingData = async () => {
        setIsLoading(true)
        const querySnapshot = await getDocs(collection(firestore, "Members"));
        querySnapshot.forEach((doc) => {
            refreshData(doc.data())
        })
        setIsLoading(false)
    }

    const refreshData = async (get) => {
        const date = get.dateModified;
        var monthly_fee = get.member_fee;
        var total_fee = get.totalFee;

        const firstMonth = moment(date).add(1, "month").format('YYYY-MM-DD,h:mm:ss a');
        const secondMonth = moment(date).add(2, "month").format('YYYY-MM-DD,h:mm:ss a');
        const current = moment().format('YYYY-MM-DD,h:mm:ss a')

        if (firstMonth <= current && secondMonth >= current) {
            total_fee += monthly_fee

            let updateData = {
                dateModified: firstMonth,
                totalFee: total_fee
            }


            var templateParams = {
                to_email: get.email,
                to_name: get.member_name,
                amount: total_fee,
                dateModified: firstMonth,
                membership_number: get.membership_no,
            };

            try {
                const washingtonRef = doc(firestore, "Members", get.membership_no);
                await updateDoc(washingtonRef, updateData, { merge: true })
                    .then(() => {
                        emailjs.send('service_uzwkgvi', 'template_b9wubwb', templateParams, 'iQXrp97WHDlkX_RHy')
                            .then((response) => {
                                setIsLoading(false)
                                window.toastify("Date Updated SuccessFully", "success")
                            }, (error) => {
                                window.toastify(error.message, "error")
                            });
                    })

            } catch (error) {
                window.toastify(error.message, "error")
                setIsLoading(false)
            }

        }

    }



    return (
        <div className="row row-cols-1 row-cols-md-2 pb-4">
            <div className="col">
                <h6 style={{ textAlign: "justify" }}>Please press this button daily to update member's fee after one month and this will also send notification to member.</h6>
            </div>
            <div className="col text-center text-md-end mt-3 mt-md-0">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAC3t7fLy8vIyMi6urq1tbW8vLyysrI+Pj7g4ODMzMzm5ubj4+Pv7+9eXl40NDRWVlampqb5+fmFhYVvb28nJycvLy+Li4tpaWk7OztjY2N/f3/z8/MbGxvW1taamppMTEzLYhRGAAACgElEQVR4nO3d21JaQRBG4Y0aw0FQRIgmMcL7v2RMNCkRmBxqprpm9fquvei/pmf3sKGcYZAkSZIkSZIkSZIkSf9nMb6e3EyWt/PoQhpZ3Y1+WS+ii2lhuhm9MYsup77paN9ZdEG1rT69Szj6GF1SZffvA9JWcXUYEBbx7FjC0Yfosip6OJqQtBcnxxOCGvXgSYqL+PlUQkyjfjmZkLKK49MJIREfCwkhEb+WIiL24uM3/Co+lRIyIl4UIyIOcOf8iOVVTNCoiIjlRkUMjXJExComaNQEERPsxQSrmD4i4nTjAS66vBoSREwwNDzARZdXQ4KIDo3o8mpIH9Gh0Yf0jYqI6AEuurwaEjRqgoge4KLLqyFBRIdGdHk1JGjUBBEdGtHl1ZA+IqJRHRrR5dVQjngZXV4N6Q9wiFVM0KgJHjezYsT9uTjfLou/Qe7Sm0a9WkcX08bl3y12z14btbxh+3bxs0Wjq2jq6jkhdA++enh+ikbX0Nh82EaX0Nh22EWX0Nhu2Pz5j7q2GaIraC7BGu6iS2hsl+BZyp+H/DNNgnMp/7NFgs+HCT7jJ3hP06t/edfWJfz7Uvw7b/z3FvjvnvAtin/I4L/Hx/8WA9+i+ID437XhVxAfED8mkh/VACuID+iY6B0+oGOid/gWxQfE70H8/1TAtyg+oEe13uED4seER7Xe4QMmHxP4gIAWxQd0TPQOH9CjWu/wLYoP6FGtd/j7nvh3duHvXePfnce//5B/hyX/HlL+XbL8+4D5dzrz7+Xm360+3NMDDquDpyloD76Yslfwh+neP3iYRZfTwurud771IrqYRhbj68nNZHk7jy5EkiRJkiRJkiRJkqQA3wFABCtCO91OvAAAAABJRU5ErkJggg==" width="40px" className='arrow-animation' alt="" />
                <button className='btn btn-info px-5 text-white ms-2' onClick={gettingData} disabled={isLoading}>
                    {isLoading
                        ? <div>
                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                            <div className="spinner-grow spinner-grow-sm text-light mx-2" role="status"></div>
                            <div className="spinner-grow spinner-grow-sm text-light" role="status"></div>
                        </div>
                        : "Refresh"
                    }
                </button>
            </div>
        </div>
    )
}
