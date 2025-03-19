import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';

function AddAgent() {
    const [agentInfo, setAgentInfo] = useState({ name: '', email: '', mobile: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgentInfo({ ...agentInfo, [name]: value });
    };

    const handleAddAgent = async (e) => {
        e.preventDefault();
        const { name, email, mobile } = agentInfo;
    
        if (!name || !email || !mobile) {
            return handleError('All fields are required');
        }
    
        try {
            const url = `https://backend-api-sooty-theta.vercel.app/agent/add`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agentInfo)
            });
    
            const result = await response.json();
            const { success, message, error } = result;
    
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || 'Failed to add agent';
                handleError(details);
            } else {
                handleError(message);
            }
    
            console.log(result);
        } catch (err) {
            handleError('Error adding agent');
        }
    };
    

    return (
        <div className='container-main'>
            <h1>Add Agent</h1>
            <form onSubmit={handleAddAgent}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter agent name...'
                        value={agentInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter agent email...'
                        value={agentInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='mobile'
                        placeholder='Enter agent mobile number...'
                        value={agentInfo.mobile}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter agent password...'
                        value={agentInfo.password}
                    />
                </div>
                <button type='submit'>Add Agent</button>
            </form>
        </div>
    );
}

export default AddAgent;