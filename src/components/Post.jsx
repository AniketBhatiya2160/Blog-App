import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../store/user/userSlice";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const cardStyle = {
  backgroundColor: "black",
  width: "50%",
  alignItems: "auto",
  justifyContent: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  margin: "20px",
  padding: "40px",
};

const titleStyle = {
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
};

const bodyStyle = {
  color: "white",
  fontSize: "16px",
};

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

export function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user.data.posts);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 10;
  // const navigate = useNavigation();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading posts...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>Wait...</div>;
  }

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const handlePostClick = (post) => {
    setSelectedPost(post);
    navigate(`/detail/${post.id}`);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };
  return (
    <div>
      <Grid container spacing={4}>
        {currentPosts.map((post) => (
          <Grid item xs={6} key={post.id} onClick={() => handlePostClick(post)}>
            <Card style={cardStyle}>
              <CardContent>
                {/* <Typography variant="h5" style={titleStyle}>
                  {post.id}
                </Typography> */}
                <Typography variant="h5" style={titleStyle}>
                  {post.title}
                </Typography>
                <Typography variant="body2" style={bodyStyle}>
                  {post.body.slice(0, post.body.slice(0, 225).lastIndexOf(" "))}
                  ...
                </Typography>
              </CardContent>
              {/* <Button
                onClick={() => handlePostClick(post)}
                color="primary"
                variant="contained"
              >
                <ViewInArIcon />
               
              </Button> */}
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={paginationStyle}>
        <Pagination
          count={Math.ceil(posts.length / postsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </div>
      <Dialog
        open={!!selectedPost}
        onClose={handleCloseDialog}
        aria-labelledby="post-dialog-title"
      >
        <DialogTitle id="post-dialog-title">{selectedPost?.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedPost?.body}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
