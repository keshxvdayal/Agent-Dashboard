import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [loggedInUser] = useState("Admin");
    const [agents, setAgents] = useState([]);
    const [agentInfo, setAgentInfo] = useState([]);
    const [ setDistributedTasks] = useState([]);
    const navigate = useNavigate();

    const fetchDistributedTasks = async () => {
        try {
            const response = await axios.get("https://backend-api-sooty-theta.vercel.app/tasks/distributed");
            setDistributedTasks(response.data.tasks || []);
        } catch (error) {
            console.error("Error fetching distributed tasks:", error);
        }
    };

    const fetchAgents = async () => {
        try {
            const response = await axios.get("https://backend-api-sooty-theta.vercel.app/upload/all");
            setAgents(response.data.agents || []);
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    const Agents = async () => {
        try {
            const agentInfo = await axios.get("https://backend-api-sooty-theta.vercel.app/agent/all");
            setAgentInfo(agentInfo.data.agents || []);
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    useEffect(() => {
        fetchDistributedTasks();
        fetchAgents();
        Agents();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        alert("User Logged out");
        setTimeout(() => navigate("/login"), 1000);
    };

    const handleAddAgent = async () => {
        navigate("/agent/add");
        await fetchAgents();
        await fetchDistributedTasks();
    };

    const handleUploadCSV = async () => {
        navigate("/agent/upload");
        await fetchAgents();
        await fetchDistributedTasks();
    };

    return (
        <div className="home-container">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <h2>Dashboard</h2>
                <button onClick={handleAddAgent} className="sidebar-btn">➕ Add Agent</button>
                <button onClick={handleUploadCSV} className="sidebar-btn">📤 Upload CSV</button>
                <button onClick={handleLogout} className="sidebar-btn logout-btn">🚪 Logout</button>
            </div>
            {/* Main Content */}
            <div className="dashboard">
                <h1 className="welcome-text">Welcome, {loggedInUser}</h1>
                <div className="agentCards-container">
                    {agentInfo.map((agent) => (
                        <div key={agent._id} className="agent-card-main">
                            <div className="agent-details">
                                <h2 className="agent-name">Agent: {agent.name}</h2>
                                <h3 className="agent-id">Agent ID: {agent._id}</h3>
                                <p className="agent-email">Email: {agent.email}</p>
                                <p className="agent-phone">Phone: {agent.mobile}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Agent List */}
                <div className="cards-container">
                    {agents.map((agent) => (
                        <div key={agent._id} className="agent-card">
                            <div className="agent-details">
                            <h2 className="agent-name">Agent: {agent.agentName}</h2>
                                <h3 className="agent-id">Agent ID: {agent._id}</h3>
                                <p className="agent-email">Email: {agent.agentEmail}</p>
                                <p className="agent-phone">Phone: {agent.agentPhone}</p>
                            </div>
                            {/* Tasks Table */}
                            <table className="task-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Task Name</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agent.tasks.map((task, index) => (
                                        <tr key={task._id}>
                                            <td>{index + 1}</td>
                                            <td>{task.firstName}</td>
                                            <td>{task.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./style.css";

// function Home() {
//     const [loggedInUser, setLoggedInUser] = useState("Admin");
//     const [agents, setAgents] = useState([]);
//     const [distributedTasks, setDistributedTasks] = useState([]);
//     const navigate = useNavigate();

    // const fetchDistributedTasks = async () => {
    //     try {
    //         const response = await axios.get("https://backend-api-sooty-theta.vercel.app/tasks/distributed");
    //         setDistributedTasks(response.data.tasks || []);
    //     } catch (error) {
    //         console.error("Error fetching distributed tasks:", error);
    //     }
    // };

    // const fetchAgents = async () => {
    //     try {
    //         const response = await axios.get("https://backend-api-sooty-theta.vercel.app/agent/all");
    //         setAgents(response.data.agents || []);
    //     } catch (error) {
    //         console.error("Error fetching agents:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchDistributedTasks();
    //     fetchAgents();
    // }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("loggedInUser");
    //     alert("User Logged out");
    //     setTimeout(() => navigate("/login"), 1000);
    // };

    // const handleAddAgent = async () => {
    //     navigate("/agent/add");
    //     await fetchAgents();
    //     await fetchDistributedTasks();
    // };

    // const handleUploadCSV = async () => {
    //     navigate("/agent/upload");
    //     await fetchAgents();
    //     await fetchDistributedTasks();
    // };

//     return (
//         <div className="home-container">
//             {/* Sidebar Navigation */}
//             <div className="sidebar">
//                 <h2>Dashboard</h2>
//                 <button onClick={handleAddAgent} className="sidebar-btn">➕ Add Agent</button>
//                 <button onClick={handleUploadCSV} className="sidebar-btn">📤 Upload CSV</button>
//                 <button onClick={handleLogout} className="sidebar-btn logout-btn">🚪 Logout</button>
//             </div>
//             {/* Main Content */}
//             <div className="dashboard">
//                 <h1 className="welcome-text">Welcome, {loggedInUser}</h1>
//                 <div className="Agents">
//                     <h2 className="agent-name">Total Agents</h2>
//                     <div className="agent-card">
//                         <h3 className="agent-id">{agents.length}</h3>
//                     </div>
//                 </div>
//                 {/* Agent List */}
                // <div className="cards-container">
                // {agents.map((agent) => (
                //         <div key={agent._id} className="agent-card">
                //             <div className="agent-details">
                //                 <h2 className="agent-name">Agent: {agent.name}</h2>
                //                 <h3 className="agent-id">Agent ID: {agent._id}</h3>
                //                 <p className="agent-email">Email: {agent.email}</p>
                //                 <p className="agent-phone">Phone: {agent.mobile}</p>
                //             </div>
                //             {/* Tasks Table */}
                //             <table className="task-table">
                //                 <thead>
                //                     <tr>
                //                         <th>#</th>
                //                         <th>Task Name</th>
                //                         <th>Phone</th>
                //                     </tr>
                //                 </thead>
                //                 <tbody>
                //                 {agent.tasks.map((task, index) => (
                //                         <tr key={task._id}>
                //                             <td>{index + 1}</td>
                //                             <td>{task.firstName}</td>
                //                             <td>{task.phone}</td>
                //                         </tr>
                //                     ))}
                //                 </tbody>
                //             </table>
                //         </div>
                //     ))}
                // </div>
//             </div>
//         </div>
//     );
// }

// export default Home;