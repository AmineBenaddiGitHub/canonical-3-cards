import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Card from "./components/Card";

const Section = styled.section`
  margin-top: 5rem;
`;

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(
      "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
    )
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((article) => {
          const image = article?.featured_media;
          const title = article?.title?.rendered;
          const link = article?.link;
          const author = article?._embedded?.author?.[0]?.name;
          const authorLink = article?._embedded?.author?.[0]?.link;
          const date = article?.date;
          let type = "Post";
          let category = "";
          // Check taxonomy
          article?._embedded?.["wp:term"]?.forEach((e) => {
            if (
              e?.[0]?.taxonomy === "category" &&
              e?.[0]?.name === "Articles"
            ) {
              type = "Article";
            }
            if (e?.[0]?.taxonomy === "post_tag") {
              category = e?.[0]?.name;
            }
          });
          setPosts((state) => [
            ...state,
            {
              image,
              title,
              link,
              author,
              authorLink,
              date,
              type,
              category,
            },
          ]);
        });
      });
  }, []);
  return (
    <Section>
      <div className="row u-vertically-center">
        {posts.map((e) => (
          <div className="col-4" key={uuid()}>
            <Card
              title={e.title}
              image={e.image}
              link={e.link}
              author={e.author}
              authorLink={e.authorLink}
              date={e.date}
              type={e.type}
              category={e.category}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

export default App;
