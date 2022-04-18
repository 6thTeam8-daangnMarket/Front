import React from "react";
import { useSelector } from "react-redux";
import { Image, Grid, Text } from "../../elements/index";
import { useHistory } from "react-router-dom";

const Postlist = (props) => {
  const postlist = useSelector((state) => state.post.posts);

  return (
    <React.Fragment>
      <Grid>
        {postlist.map((p) => {
          return (
            <>
              <Image src="p.imageUrl"></Image>;<Text>{p.postTitle}</Text>;
              <Text>{p.price}</Text>;<Text>{p.createdAt}</Text>;
              <Text>{p.likeCount}</Text>;<Text>{p.postId}</Text>;
              <Text>{p.category}</Text>;
            </>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Postlist;
