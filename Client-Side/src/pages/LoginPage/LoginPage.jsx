import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import useZustStates from '../../Store/useZustStates';

const LoginPage = () => {
    const axiosPublic = useAxiosPublic();
    const { user, isLoading, getUser } = useZustStates();
    // const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        try {
            const { data } = await axiosPublic.post("/api/login", {
                email: form.email.value,
                password: form.password.value,
            });

            if (data?.success) {
                // console.log(data);
                toast.success(data?.message, {
                    position: "top-right"
                })
                localStorage.setItem("access-token", data?.token);
                localStorage.setItem("isLoggedIn", true);
                getUser();
            }
        } catch (error) {
            // console.log();
            toast.error(error.response.data.message, {
                position: "top-right"
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className='mt-5'>
                <div className='flex flex-col gap-1 w-[25%] mx-auto'>
                    <input type="text" name="email" placeholder='Enter email' />
                    <input type="text" name="password" placeholder='Enter password' />
                    <button className='p-3 border' type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;