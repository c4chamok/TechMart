import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';

const SignUpPage = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const { data } = await axiosPublic.post("/api/register", {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
        });
        if(data) {
            console.log(data);
        }
        // console.log(form.name.value);
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className='mt-5'>
                <div className='flex flex-col gap-1 w-[25%] mx-auto'>
                    <input type="text" name="name" placeholder='Enter Name'/>
                    <input type="text" name="email" placeholder='Enter email'/>
                    <input type="text" name="password" placeholder='Enter password'/>
                    <button className='p-3 border' type='submit'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;