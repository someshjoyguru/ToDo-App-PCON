import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";
import "../App.css";
import "../styles/Login.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const [quotes, setQuotes]=useState([]);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);

      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
    
    axios.get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.user.name);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });

      fetch("https://type.fit/api/quotes")
      .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          const index=Math.floor(Math.random() * data.length);
          let author = data[index].author;
          author=author.includes(', ') ? author.split(', ')[0] : author;
          setQuotes([data[index].text,author]);
        })
        .catch(error => console.error("Error fetching quotes:", error));
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const Quote = ({ text, author }) => {
    return (
      <div className="quote">
        <blockquote>
          <p>{text}</p>
          <footer>- {author}</footer>
        </blockquote>
      </div>
    );
  };
  quotes

  return (
    <div className="container">
      <h1 className="heading"> Hello, {username}</h1>
      {/* <h6 className="subheading"> Let's Crack It</h6> */}
      <Quote text={quotes[0]} author={quotes[1]}/>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Task Name"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 text-white"
        >
          Add Task
        </button>
      </form>

      {tasks.map((i) => (
        <TodoItem
          title={i.title}
          description={i.description}
          isCompleted={i.isCompleted}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          createdAt={i.createdAt}
          id={i._id}
          key={i._id}
        />
        
      ))}
    </div>
  );
};

export default Home;
