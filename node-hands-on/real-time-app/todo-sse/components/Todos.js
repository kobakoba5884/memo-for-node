import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
// import fetch from "isomorphic-fetch";
// import 'eventsource/lib/eventsource-polyfill'
import { endpoint } from "../constants.js";

const pages = {
  index: {
    title: "all todos",
    fetchQuery: "",
  },
  active: {
    title: "uncompleted todos",
    fetchQuery: "?completed=false",
  },
  completed: {
    title: "completed todos",
    fetchQuery: "?completed=true",
  },
};

const pageLinks = Object.keys(pages).map((page, index) => (
  <Link
    href={`/${page === "index" ? "" : page}`}
    key={index}
    style={{ marginRight: 10 }}
  >
    {pages[page].title}
  </Link>
));

const Todos = (props) => {
  const { title, completed } = pages[props.page];
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // fetch(`${endpoint}${fetchQuery}`).then(async (res) =>
    //   res.ok ? setTodos(await res.json()) : alert(await res.text())
    // );

    const eventSource = new EventSource(`${endpoint}/events`)
    eventSource.addEventListener('message', e => {
      const todos = JSON.parse(e.data)

      setTodos(
        typeof completed === 'undefined' 
        ? todos
        : todos.filter(todo => todo.completed === completed)
      )
    })

    eventSource.addEventListener('error', e => {
      console.log('sse error ', e)
    })

    return () => eventSource.close()
  }, [props.page]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      <ul>
        {todos.map(({ id, title, completed }) => (
          <li key={id}>
            <span style={completed ? { textDecoration: "line-through" } : {}}>
              {title}
            </span>
          </li>
        ))}
      </ul>

      <div>{pageLinks}</div>
    </>
  );
};

export default Todos;
