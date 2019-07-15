import React, { Component } from "react";
import Post from "./Post";

import "./PostList.css";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Diego Fernandes",
          avatar:
            "https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://cdn.pastemagazine.com/www/articles/2019/02/08/avatar_viafox_main.jpeg"
            },
            content:
              "Conteúdo do comentário Conteúdo do comentárioConteúdo do comentário Conteúdo do comentário Conteúdo do comentário Conteúdo do comentário Conteúdo do comentário Conteúdo do comentário Conteúdo do comentário Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Diego Fernandes",
          avatar:
            "https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://cdn.pastemagazine.com/www/articles/2019/02/08/avatar_viafox_main.jpeg"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Diego Fernandes",
          avatar:
            "https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://cdn.pastemagazine.com/www/articles/2019/02/08/avatar_viafox_main.jpeg"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 4,
        author: {
          name: "Diego Fernandes",
          avatar:
            "https://i.kinja-img.com/gawker-media/image/upload/s--vSY-o42Q--/c_scale,f_auto,fl_progressive,q_80,w_800/ecq5rsk3n1nolujedskk.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://cdn.pastemagazine.com/www/articles/2019/02/08/avatar_viafox_main.jpeg"
            },
            content: "Conteúdo do comentário"
          }
        ]
      }
    ]
  };

  render() {
    return (
      <main>
        {this.state.posts.map(post => (
          <Post key={post.id} content={post} />
        ))}
      </main>
    );
  }
}

export default PostList;
