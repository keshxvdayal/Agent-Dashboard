import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState("Admin");
    const [agents, setAgents] = useState([]);
    const [distributedTasks, setDistributedTasks] = useState([]);
    const navigate = useNavigate();

    const fetchDistributedTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3001/tasks/distributed");
            setDistributedTasks(response.data.tasks || []);
        } catch (error) {
            console.error("Error fetching distributed tasks:", error);
        }
    };

    const fetchAgents = async () => {
        try {
            const response = await axios.get("http://localhost:3001/upload/all");
            setAgents(response.data.agents || []);
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    useEffect(() => {
        fetchDistributedTasks();
        fetchAgents();
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
                {/* Agent List */}
                <div className="cards-container">
                    {agents.map((agent) => (
                        <div key={agent._id} className="agent-card">
                            <div className="agent-details">
                                <h2 className="agent-name">Agent: {agent.name}</h2>
                                <h3 className="agent-id">Agent ID: {agent.agentId}</h3>
                                <p className="agent-email">Email: {agent.email}</p>
                                <p className="agent-phone">Phone: {agent.phone}</p>
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
                                        <tr key={task._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
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