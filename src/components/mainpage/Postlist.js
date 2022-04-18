import React from "react";
import { useSelector } from "react-redux";
import { Image, Grid, Text } from "../../elements/index";
import { useHistory } from "react-router-dom";

const Postlist = (props) => {
  const post_list = useSelector((state) => state.post.post_list);
  console.log("post_list",post_list);
  return (
    <React.Fragment>
      <Grid>
        {post_list.map((p) => {
          return (
            <div key={p.postId}>
              <Image src="p.imageUrl"></Image>;<Text>{p.postTitle}</Text>;
              <Text>{p.price}</Text>;<Text>{p.createdAt}</Text>;
              <Text>{p.likeCount}</Text>;<Text>{p.postId}</Text>;
              <Text>{p.category}</Text>;
            </div>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Postlist;
