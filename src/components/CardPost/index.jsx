import Image from "next/image";
import { Avatar } from "../Avatar";

export const CardPost = ({ post }) => {
  return (
    <article className="card-post">
      <header>
        <figure>
          <Avatar
            src={`Capa do post de titulo ${post.cover}`}
            alt={post.title}
            width={438}
            height={133}
          />
        </figure>
      </header>
      <section>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </section>
      <footer>
        <Avatar src={post.author.avatar} alt={post.author.name} />
      </footer>
    </article>
  );
};
