import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import postsabi from '../../contracts/posts.json'

const contractAddress = '0x36e4C7EE06DBa016D613dF6F9eeC0fD350639177'; 
const contractABI = postsabi; 

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

function Posts() {
  const [newCid, setNewCid] = useState('');
  const [posts, setPosts] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedPost, setSelectedPost] = useState(0);

  
 




  useEffect(() => {
    // Load existing posts
    async function loadPosts() {
      const currentEntry = await contract.currentEntry();
      const posts = [];

      for (let i = 1; i <= currentEntry; i++) {
        const post = await contract.getPost(i);
        posts.push(post);
      }

      setPosts(posts);
    }

    loadPosts();
  }, []);

  const createPost = async () => {
    try {
      const tx = await contract.createPost(newCid);
      await tx.wait();

      // Update the posts list
      const post = await contract.getPost(posts.length + 1);
      setPosts([...posts, post]);
      setNewCid('');
    } catch (error) {
      console.error(error);
    }
  };

  const respondToPost = async () => {
    try {
      const postId = selectedPost + 1; // Post IDs are 1-based
      const tx = await contract.respondToPost(postId, newCid);
      await tx.wait();

      // Update the responses list
      const response = await contract.getResponse(postId, responses.length + 1);
      setResponses([...responses, response]);
      setNewCid('');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostSelection = (postId) => {
    setSelectedPost(postId);
    // Load responses for the selected post
    async function loadResponses() {
      const postResponses = [];

      for (let i = 1; i <= posts[postId].responseCount; i++) {
        const response = await contract.getResponse(postId + 1, i); // Post IDs are 1-based
        postResponses.push(response);
      }

      setResponses(postResponses);
    }

    loadResponses();
  };

  return (
    <div>
      <h1>Posts</h1>
      

      <div>
      
        <input
          type="text"
          className='text-black'
          value={newCid}
          onChange={(e) => setNewCid(e.target.value)}
        />
        <button onClick={createPost}>Create Post</button>
      </div>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <p onClick={() => handlePostSelection(index)}>{post.cid}</p>
          </div>
        ))}
      </div>


      <h2>Responses</h2>
      <div>
        <input
          type="text"
          className='text-black'
          value={newCid}
          onChange={(e) => setNewCid(e.target.value)}
        />
        <button onClick={respondToPost}>Respond to Post</button>
      </div>
      <div>
        {responses.map((response, index) => (
          <div key={index}>
            <p>{response.cid}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
